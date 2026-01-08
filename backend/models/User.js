const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'dark'
    },
    algorithmPreferences: {
      type: Map,
      of: String,
      default: {}
    }
  },
  profile: {
    bio: {
      type: String,
      default: ''
    },
    avatar: {
      type: String,
      default: ''
    },
    location: {
      type: String,
      default: ''
    },
    website: {
      type: String,
      default: ''
    },
    skills: [{
      type: String
    }]
  },
  stats: {
    algorithmsViewed: {
      type: Number,
      default: 0
    },
    algorithmsPracticed: {
      type: Number,
      default: 0
    },
    totalTimeSpent: {
      type: Number, // in minutes
      default: 0
    },
    favoriteAlgorithms: [{
      type: String
    }]
  }
});

// Create index for email
UserSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;
