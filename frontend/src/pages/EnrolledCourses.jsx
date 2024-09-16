// import { useState, useEffect, useContext } from 'react';
// import axios from 'axios'; // Use axios for API requests
// import { AuthContext } from '../context/AuthContext';
// import { Link } from 'react-router-dom';

// const EnrolledCourses = () => {
//   const { user } = useContext(AuthContext);
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchEnrolledCourses = async () => {
//       try {
//         const token = localStorage.getItem('token'); // Get the token from localStorage

//         if (!token) {
//           console.error('No token found.');
//           setLoading(false);
//           return;
//         }

//         // Check if the user exists and has an ID
//         if (!user || !user._id) {
//           console.error('User ID is missing.');
//           setLoading(false);
//           return;
//         }

//         const res = await axios.get(`http://localhost:5000/api/courses/enrolled/${user._id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`, // Pass the token in the request header
//           },
//         });
        
//         setCourses(res.data); // Set the enrolled courses
//       } catch (error) {
//         console.error('Error fetching enrolled courses:', error.message);
//       } finally {
//         setLoading(false); // Stop loading once data is fetched
//       }
//     };

//     if (user) {
//       fetchEnrolledCourses();
//     }
//   }, [user]);

//   if (loading) {
//     return <p>Loading courses...</p>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl mb-6">My Enrolled Courses</h1>
//       {courses.length === 0 ? (
//         <p>You have not enrolled in any courses yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {courses.map((course) => (
//             <div key={course._id} className="border rounded p-4 shadow">
//               <h2 className="text-xl font-bold mb-2">{course.title}</h2>
//               <p className="mb-2">{course.description}</p>
//               <p className="mb-2">
//                 <strong>Category:</strong> {course.category}
//               </p>
//               <p className="mb-2">
//                 <strong>Price:</strong> ${course.price}
//               </p>
//               <p className="mb-2">
//                 <strong>Duration:</strong> {course.duration} hours
//               </p>
//               <Link to={`/courses/${course._id}`} className="text-blue-600">
//                 View Details
//               </Link>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default EnrolledCourses;






import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
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

        const res = await axios.get(`http://localhost:5000/api/courses/enrolled/${user._id}`, {
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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
          <div className="flex justify-center mt-6">
            <ul className="inline-flex items-center space-x-2">
              {Array.from({ length: Math.ceil(courses.length / coursesPerPage) }, (_, index) => (
                <li key={index}>
                  <button
                    onClick={() => paginate(index + 1)}
                    className={`px-4 py-2 rounded-lg ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default EnrolledCourses;

