import express, { json } from 'express';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";

// Import routes
import authRoutes from './routes/auth.routes.js';
import courseRoutes from './routes/course.routes.js';
import chatGPTRoute from './routes/chatGPT.routes.js';

import connectToMongoDB from "./db/connectToMongoDB.js";
// Initialize dotenv to load environment variables
config();

// Initialize Express app
const app = express();

// Middleware
app.use(json()); // Parse JSON bodies
app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true, // Allow cookies to be sent
  })); // Enable Cross-Origin Resource Sharing
  app.use(cookieParser()); // For parsing cookies


// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/courses', courseRoutes); // Course management routes
app.use('/api/chatgpt', chatGPTRoute); // for chat gpt section routes

// Error handling middleware 
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
