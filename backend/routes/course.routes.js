import express from 'express';
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  enrollCourse,
  unenrollCourse,
  getEnrolledCoursesById,
  getStudentsByCourseID,
  getCoursesByInstructor, 
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

// Route to get all courses by instructor ID
router.get('/instructor/:instructorId', protect, authorize('instructor'), getCoursesByInstructor);

// Enroll in a course (students only)
router.post('/enroll/:id', protect, authorize('student'), enrollCourse);

// Unenroll from a course (students only)
router.post('/unenroll/:id', protect, authorize('student'), unenrollCourse); // Add this route

router.get('/enrolled/:studentId', protect, getEnrolledCoursesById);

router.get('/students/:id', protect, authorize('instructor'), getStudentsByCourseID)

export default router;
