import { useState, useEffect, useContext } from 'react';
import axios from 'axios'; // Use axios for API requests
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const EnrolledCourses = () => {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage

        if (!token) {
          console.error('No token found.');
          setLoading(false);
          return;
        }

        // Check if the user exists and has an ID
        if (!user || !user._id) {
          console.error('User ID is missing.');
          setLoading(false);
          return;
        }

        const res = await axios.get(`http://localhost:5000/api/courses/enrolled/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the request header
          },
        });
        
        setCourses(res.data); // Set the enrolled courses
      } catch (error) {
        console.error('Error fetching enrolled courses:', error.message);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    if (user) {
      fetchEnrolledCourses();
    }
  }, [user]);

  if (loading) {
    return <p>Loading courses...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-6">My Enrolled Courses</h1>
      {courses.length === 0 ? (
        <p>You have not enrolled in any courses yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course._id} className="border rounded p-4 shadow">
              <h2 className="text-xl font-bold mb-2">{course.title}</h2>
              <p className="mb-2">{course.description}</p>
              <p className="mb-2">
                <strong>Category:</strong> {course.category}
              </p>
              <p className="mb-2">
                <strong>Price:</strong> ${course.price}
              </p>
              <p className="mb-2">
                <strong>Duration:</strong> {course.duration} hours
              </p>
              <Link to={`/courses/${course._id}`} className="text-blue-600">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
