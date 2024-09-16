import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import api from '../config/api';
import { Link } from 'react-router-dom';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(6);
  const { id } = useParams();  // Get the user ID from the URL params

  useEffect(() => {
    const fetchInstructorCourses = async () => {
      try {
        const res = await api.get(`/courses/instructor/${id}`);
        console.log(res.data);
        setCourses(res.data);
      } catch (error) {
        console.error('Error fetching instructor courses:', error.message);
      }
    };

    fetchInstructorCourses(); // Fetch courses for the instructor with the ID from the params
  }, [id]);

  // Pagination Logic
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Posted Courses</h1>
      {courses.length === 0 ? (
        <p>You have not posted any courses yet.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentCourses.map((course) => (
              <div
                key={course._id}
                className="border rounded-lg shadow-lg p-4 hover:shadow-xl transition-all duration-300 bg-white"
              >
                <div className="mb-4">
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
                </div>
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
              onClick={handlePrevPage}
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

export default MyCourses;
