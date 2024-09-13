const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Import routes
const authRoutes = require('./routes/authRoutes');
//const courseRoutes = require('./routes/courseRoutes');

// Initialize dotenv to load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

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
    console.log(`Server running on port ${PORT}`);
});
