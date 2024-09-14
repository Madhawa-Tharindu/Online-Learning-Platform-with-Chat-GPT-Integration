import { useState, useEffect, useContext  } from 'react';
import api from '../config/api';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get('/courses');
        setCourses(res.data);
      } catch (error) {
        console.error('Error fetching courses:', error.message);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    if (user) {
      console.log('Logged in user role:', user.role); // Log user role for debugging
    } else {
      console.log('No user is logged in.');
    }
  }, [user]); // Run this effect when `user` changes

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-6">Available Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course._id} className="border rounded p-4 shadow">
            <h2 className="text-xl font-bold mb-2">{course.title}</h2>
            <p className="mb-2">{course.description}</p>
            <p className="mb-2"><strong>Category:</strong> {course.category}</p>
            <p className="mb-2"><strong>Price:</strong> ${course.price}</p>
            <p className="mb-2"><strong>Duration:</strong> {course.duration} hours</p>
            <Link to={`/courses/${course._id}`} className="text-blue-600">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
