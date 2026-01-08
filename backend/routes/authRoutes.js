const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

// Validation middleware
const validateSignup = [
  body('name').notEmpty().withMessage('Name is required').trim(),
  body('email').isEmail().withMessage('Please enter a valid email').normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/\d/)
    .withMessage('Password must contain at least one number')
];

const validateLogin = [
  body('email').isEmail().withMessage('Please enter a valid email').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required')
];

// Signup Route
router.post('/signup', validateSignup, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    console.log('Signup request for:', email);

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ 
        error: 'User already exists with this email' 
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    // Create JWT token
    const payload = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || 'fallback_jwt_secret',
      { expiresIn: '7d' }
    );

    // Update last login
    user.lastLogin = Date.now();
    await user.save();

    res.json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    
    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({ 
        error: 'Email already registered' 
      });
    }
    
    res.status(500).json({ 
      error: 'Server error during signup',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Login Route
router.post('/login', validateLogin, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    console.log('Login request for:', email);

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ 
        error: 'Invalid email or password' 
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        error: 'Invalid email or password' 
      });
    }

    // Update last login
    user.lastLogin = Date.now();
    await user.save();

    // Create JWT token
    const payload = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || 'fallback_jwt_secret',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        preferences: user.preferences,
        profile: user.profile,
        stats: user.stats,
        lastLogin: user.lastLogin
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      error: 'Server error during login',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get current user (protected route)
router.get('/me', async (req, res) => {
  try {
    // Get token from header
    const token = req.header('x-auth-token');
    
    if (!token) {
      return res.status(401).json({ error: 'No authentication token' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_jwt_secret');
    
    // Find user
    const user = await User.findById(decoded.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      success: true,
      user
    });

  } catch (error) {
    console.error('Get user error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    
    res.status(500).json({ 
      error: 'Server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Update user profile
router.put('/profile', async (req, res) => {
  try {
    const token = req.header('x-auth-token');
    
    if (!token) {
      return res.status(401).json({ error: 'No authentication token' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_jwt_secret');
    
    const updates = req.body;
    
    // Remove restricted fields
    delete updates.password;
    delete updates.email;
    delete updates._id;
    
    // Update user
    const user = await User.findByIdAndUpdate(
      decoded.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
      success: true,
      message: 'Profile updated successfully',
      user
    });
    
  } catch (error) {
    console.error('Update profile error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    res.status(500).json({ 
      error: 'Server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Update user preferences
router.put('/preferences', async (req, res) => {
  try {
    const token = req.header('x-auth-token');
    
    if (!token) {
      return res.status(401).json({ error: 'No authentication token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_jwt_secret');
    
    const { preferences } = req.body;
    
    if (!preferences) {
      return res.status(400).json({ error: 'Preferences are required' });
    }
    
    const user = await User.findByIdAndUpdate(
      decoded.user.id,
      { $set: { preferences } },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
      success: true,
      message: 'Preferences updated successfully',
      user
    });
    
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user stats
router.put('/stats', async (req, res) => {
  try {
    const token = req.header('x-auth-token');
    
    if (!token) {
      return res.status(401).json({ error: 'No authentication token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_jwt_secret');
    
    const { stats } = req.body;
    
    const user = await User.findByIdAndUpdate(
      decoded.user.id,
      { $set: { stats } },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
      success: true,
      message: 'Stats updated successfully',
      user
    });
    
  } catch (error) {
    console.error('Update stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  res.json({ 
    success: true,
    message: 'Logged out successfully' 
  });
});

// Test route
router.get('/test', (req, res) => {
  res.json({ 
    message: 'Auth API is working!',
    endpoints: [
      'POST /signup',
      'POST /login',
      'GET /me',
      'PUT /profile',
      'PUT /preferences',
      'PUT /stats',
      'POST /logout'
    ]
  });
});

module.exports = router;