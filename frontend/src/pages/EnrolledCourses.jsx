import { useState, useEffect, useContext } from 'react';
//import axios from 'axios';
import api from '../config/api'; 
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const EnrolledCourses = () => {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [coursesPerPage] = useState(6); // Display 6 courses per page
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          console.error('No token found.');
          setLoading(false);
          return;
        }

        if (!user || !user._id) {
          console.error('User ID is missing.');
          setLoading(false);
          return;
        }

        const res = await api.get(`/courses/enrolled/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCourses(res.data);
      } catch (error) {
        console.error('Error fetching enrolled courses:', error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchEnrolledCourses();
    }
  }, [user]);

  // Pagination logic
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
  
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  // Navigate to the next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Navigate to the previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (loading) {
    return <p>Loading courses...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Enrolled Courses</h1>
      {courses.length === 0 ? (
        <p>You have not enrolled in any courses yet.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentCourses.map((course) => (
              <div
                key={course._id}
                className="border rounded-lg shadow-lg p-4 hover:shadow-xl transition-all duration-300 bg-white"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h2>
                <p className="text-gray-600 mb-2">{course.description}</p>
                <p className="text-sm text-gray-500">
                  <strong>Category:</strong> {course.category}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Price:</strong> ${course.price}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Duration:</strong> {course.duration} hours
                </p>
                <Link
                  to={`/courses/${course._id}`}
                  className="block text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:from-indigo-600 hover:to-purple-600 transition duration-200"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>

          {/* Pagination */}
         <div className="flex justify-center mt-[3rem] mb-[6rem]">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`mr-4 px-4 py-2 border rounded-lg min-w-[6rem] ${
                currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border rounded-lg min-w-[6rem] ${
                currentPage === totalPages ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EnrolledCourses;


