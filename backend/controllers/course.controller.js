import Course from '../models/course.model.js';

// Create a new course
export const createCourse = async (req, res) => {
  const { title, description, instructor, price, duration, category, content } = req.body;

  try {
    const newCourse = new Course({
      title,
      description,
      instructor: req.user._id, // assuming the instructor is logged in
      price,
      duration,
      category,
      content,
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    console.log('Error in creating course', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor', 'username');
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get a single course
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'username');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update a course
export const updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete a course
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Enroll in a course
export const enrollCourse = async (req, res) => {
  const courseId = req.params.id;
  const userId = req.user._id;

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    if (course.studentsEnrolled.includes(userId)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    course.studentsEnrolled.push(userId);
    await course.save();

    res.status(200).json({ message: 'Enrolled successfully' });
  } catch (error) {
    console.log('Error enrolling in course:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Get the list of courses a student is enrolled in
export const getEnrolledCoursesById = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    const courses = await Course.find({ studentsEnrolled: studentId });
    
    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: 'No enrolled courses found' });
    }

    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
