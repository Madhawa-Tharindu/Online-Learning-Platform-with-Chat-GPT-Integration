import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

// Protect routes - Middleware to check if the user is authenticated
export const protect = async (req, res, next) => {
    let token;

    // Check if the token exists in the authorization header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Extract token from Bearer token
            token = req.headers.authorization.split(' ')[1];

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find the user by ID and attach to the request object
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
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
