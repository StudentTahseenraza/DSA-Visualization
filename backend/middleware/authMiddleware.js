const jwt = require('jsonwebtoken');

// Get JWT secret from environment
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ 
      error: 'No authentication token, authorization denied' 
    });
  }

  // Check if JWT secret is configured
  if (!JWT_SECRET) {
    console.error('JWT_SECRET is not configured');
    return res.status(500).json({ 
      error: 'Server configuration error' 
    });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: 'Token has expired. Please log in again.' 
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        error: 'Invalid token' 
      });
    }
    
    res.status(401).json({ 
      error: 'Token validation failed' 
    });
  }
};