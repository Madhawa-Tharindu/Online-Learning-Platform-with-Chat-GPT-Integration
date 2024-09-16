import { useState, useEffect, useContext } from 'react';
import api from '../config/api';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ImageSection from '../components/ImageSection';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [showSuggestedCourses, setShowSuggestedCourses] = useState(false);
  const [suggestedCourses, setSuggestedCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Add current page state
  const [coursesPerPage] = useState(6); // Set courses per page
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get('/courses');
        setCourses(res.data);
        setFilteredCourses(res.data); // Initialize filtered courses with all courses
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
  }, [user]);

  const handleSearch = async (query) => {
    try {
      const res = await api.post('/chatgpt/suggest-courses', { prompt: query });
      const suggested = res.data.suggestions;
      if (suggested.length > 0) {
        setSuggestedCourses(suggested);
        setFilteredCourses(suggested); // Filter courses based on suggestions
        setShowSuggestedCourses(true); // Show suggested courses
      } else {
        setShowSuggestedCourses(false);
        setFilteredCourses(courses); // Reset to all courses if no suggestions
      }
    } catch (error) {
      console.error('Error during search:', error.message);
    }
  };

  const handleCloseSuggestions = () => {
    setShowSuggestedCourses(false);
    setSuggestedCourses([]); // Clear suggested courses
    setFilteredCourses(courses); // Reset to all courses
  };

  // Pagination Logic
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

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
    <>
      <ImageSection onSearch={handleSearch} />
      <div className="container mx-auto p-4">
        {showSuggestedCourses && suggestedCourses.length > 0 && (
          <div className="mb-6 p-4 bg-gray-100 border rounded relative">
            <h2 className="text-2xl font-bold mb-4">Suggested Courses</h2>
            <button
              onClick={handleCloseSuggestions}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              &times;
            </button>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {suggestedCourses.map((course) => (
                <div
                  key={course._id}
                  className="border rounded-lg shadow-lg p-4 hover:shadow-xl transition-all duration-300 bg-white"
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {course.title}
                    </h3>
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
          </div>
        )}

        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Available Courses</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentCourses.map((course) => (
              <div
                key={course._id}
                className="border rounded-lg shadow-lg p-4 hover:shadow-xl transition-all duration-300 bg-white"
              >
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {course.title}
                  </h2>
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
        </div>
      </div>
    </>
  );
};

export default Home;








