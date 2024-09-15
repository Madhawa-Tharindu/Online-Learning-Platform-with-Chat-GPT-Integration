import express from "express";
import { login, logout, signup, getProfile } from "../controllers/auth.controller.js";
import { protect } from '../middleware/protectRoute.js'; // Ensure this middleware is used to protect routes


const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

// Get logged-in user's profile (Protected route)
router.get('/profile', protect, getProfile);

// Protected route to get the current user profile
// router.get('/profile', protect, (req, res) => {
//     res.json({ user: req.user });
//   });

router.post("/logout", logout);


export default router;