import express from "express";
import { login, logout, signup, getProfile, updateProfile, deleteAccount } from "../controllers/auth.controller.js";
import { protect, authorize, isStudent } from '../middleware/protectRoute.js'; // Ensure this middleware is used to protect routes


const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);


// Get logged-in user's profile (Protected route)
router.get('/profile/:id', protect, getProfile);
// Route to update profile (available for any logged-in user)
router.patch('/update-profile/:id', protect, authorize('student', 'instructor'), updateProfile);

// Route to delete account (only for students)
router.delete('/delete-profile/:id', protect, isStudent, deleteAccount);


export default router;