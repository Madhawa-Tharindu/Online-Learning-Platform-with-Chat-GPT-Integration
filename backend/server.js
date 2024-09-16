import express, { json } from 'express';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from 'url';

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
  origin: 'https://learning-platform-with-chat-gpt.netlify.app', // Adjust this URL
  credentials: true,
}));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/courses', courseRoutes); // Course management routes
app.use('/api/chatgpt', chatGPTRoute); // for chat gpt section routes

// Error handling middleware 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Emulate __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
  });
}

// Connect to MongoDB
connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));