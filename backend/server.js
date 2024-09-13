import express, { json } from 'express';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';

// Import routes
import authRoutes from './routes/auth.routes.js';
//const courseRoutes = require('./routes/courseRoutes');


import connectToMongoDB from "./db/connectToMongoDB.js";
// Initialize dotenv to load environment variables
config();

// Initialize Express app
const app = express();

// Middleware
app.use(json()); // Parse JSON bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
//app.use('/api/courses', courseRoutes); // Course management routes

// Error handling middleware (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Server listening on port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});
