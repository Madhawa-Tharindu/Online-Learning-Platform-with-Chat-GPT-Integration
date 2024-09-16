import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

// Protect routes - Middleware to check if the user is authenticated
export const protect = async (req, res, next) => {
  let token;

  // Check if the token exists in the authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract token from Bearer token
      token = req.headers.authorization.split(' ')[1];
      console.log('Token received:', token); // Debug log

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded token:', decoded); // Debug log

      // Find the user by ID and attach to the request object
      req.user = await User.findById(decoded.id).select('-password');
      console.log('User found:', req.user); // Debug log

      if (!req.user) {
        return res.status(404).json({ message: 'User not found' });
      }

      next();
    } catch (error) {
      console.error('Token verification error:', error); // Debug log

      // Handle expired token error
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'jwt expired' });
      }
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Authorize roles - Middleware to check if the user has the correct role
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'User role not authorized' });
    }
    next();
  };
};

// Refresh token route - Middleware to generate a new access token
export const refreshToken = async (req, res) => {
  const { token: refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token provided' });
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH);
    console.log('Decoded refresh token:', decoded); // Debug log

    // Generate a new access token
    const newAccessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    res.json({ token: newAccessToken });
  } catch (error) {
    console.error('Refresh token verification error:', error); // Debug log
    return res.status(403).json({ message: 'Invalid or expired refresh token' });
  }
};

// Middleware to check if the user is a student
export const isStudent = (req, res, next) => {
  if (req.user.role !== 'student') {
    return res.status(403).json({ message: 'Only students can perform this action' });
  }
  next();
};


