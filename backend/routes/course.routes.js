import express from 'express';
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from '../controllers/course.controller.js';

import { protect, authorize } from '../middleware/protectRoute.js'; // Assuming you're using JWT authentication middleware

const router = express.Router();

// Create a new course (instructors only)
router.post('/create-course', protect, authorize('instructor'), createCourse);

// Get all courses
router.get('/', getAllCourses);

// Get a specific course
router.get('/:id', getCourseById);

// Update a course
router.put('/update-course/:id', protect, authorize('instructor'), updateCourse);

// Delete a course
router.delete('/delete-course/:id', protect, authorize('instructor'), deleteCourse);

export default router;
