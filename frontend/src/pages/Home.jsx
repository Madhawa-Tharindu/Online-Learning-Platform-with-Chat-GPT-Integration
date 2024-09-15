/* eslint-disable no-undef */
// import { useState, useEffect, useContext  } from 'react';
// import api from '../config/api';
// import { Link } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import ImageSection from '../components/ImageSection'; 

// const Home = () => {
//   const [courses, setCourses] = useState([]);
//   const { user } = useContext(AuthContext);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const res = await api.get('/courses');
//         setCourses(res.data);
//       } catch (error) {
//         console.error('Error fetching courses:', error.message);
//       }
//     };
//     fetchCourses();
//   }, []);

//   useEffect(() => {
//     if (user) {
//       console.log('Logged in user role:', user.role); // Log user role for debugging
//     } else {
//       console.log('No user is logged in.');
//     }
//   }, [user]); // Run this effect when `user` changes

//   return (
//     <>
//     <ImageSection />
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl mb-6">Available Courses</h1>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {courses.map(course => (
//           <div key={course._id} className="border rounded p-4 shadow">
//             <h2 className="text-xl font-bold mb-2">{course.title}</h2>
//             <p className="mb-2">{course.description}</p>
//             <p className="mb-2"><strong>Category:</strong> {course.category}</p>
//             <p className="mb-2"><strong>Price:</strong> ${course.price}</p>
//             <p className="mb-2"><strong>Duration:</strong> {course.duration} hours</p>
//             <Link to={`/courses/${course._id}`} className="text-blue-600">View Details</Link>
//           </div>
//         ))}
//       </div>
//     </div>
//     </>
//   );
// };

// export default Home;



// import { useState, useEffect, useContext } from 'react';
// import api from '../config/api';
// import { Link } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import ImageSection from '../components/ImageSection';

// const Home = () => {
//   const [courses, setCourses] = useState([]);
//   const [filteredCourses, setFilteredCourses] = useState([]);
//   const [showSuggestedCourses, setShowSuggestedCourses] = useState(false);
//   const [suggestedCourses, setSuggestedCourses] = useState([]);
//   const { user } = useContext(AuthContext);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const res = await api.get('/courses');
//         setCourses(res.data);
//         setFilteredCourses(res.data); // Initialize filtered courses with all courses
//       } catch (error) {
//         console.error('Error fetching courses:', error.message);
//       }
//     };
//     fetchCourses();
//   }, []);

//   useEffect(() => {
//     if (user) {
//       console.log('Logged in user role:', user.role); // Log user role for debugging
//     } else {
//       console.log('No user is logged in.');
//     }
//   }, [user]);

//   const handleSearch = async (query) => {
//     try {
//       const res = await api.post('/chatgpt/suggest-courses', { prompt: query });
//       const suggested = res.data.suggestions;
//       setSuggestedCourses(suggested);
//       setShowSuggestedCourses(true); // Show suggested courses
//       setFilteredCourses(suggested); // Optionally, you might want to filter the available courses based on suggestions
//     } catch (error) {
//       console.error('Error during search:', error.message);
//     }
//   };

//   const handleCloseSuggestions = () => {
//     setShowSuggestedCourses(false);
//     setSuggestedCourses([]); // Clear suggested courses
//     setFilteredCourses(courses); // Reset to all courses
//   };

//   return (
//     <>
//       <ImageSection onSearch={handleSearch} />
//       <div className="container mx-auto p-4">
//         {showSuggestedCourses && suggestedCourses.length > 0 && (
//           <div className="mb-6 p-4 bg-gray-100 border rounded relative">
//             <h2 className="text-2xl font-bold mb-4">Suggested Courses</h2>
//             <button 
//               onClick={handleCloseSuggestions} 
//               className="absolute top-2 right-2 text-red-500 hover:text-red-700"
//             >
//               &times;
//             </button>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {suggestedCourses.map(course => (
//                 <div key={course._id} className="border rounded p-4 shadow">
//                   <h3 className="text-xl font-bold mb-2">{course.title}</h3>
//                   <p className="mb-2">{course.description}</p>
//                   <p className="mb-2"><strong>Category:</strong> {course.category}</p>
//                   <p className="mb-2"><strong>Price:</strong> ${course.price}</p>
//                   <p className="mb-2"><strong>Duration:</strong> {course.duration} hours</p>
//                   <Link to={`/courses/${course._id}`} className="text-blue-600">View Details</Link>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//         <div>
//           <h1 className="text-3xl mb-6">Available Courses</h1>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {filteredCourses.map(course => (
//               <div key={course._id} className="border rounded p-4 shadow">
//                 <h2 className="text-xl font-bold mb-2">{course.title}</h2>
//                 <p className="mb-2">{course.description}</p>
//                 <p className="mb-2"><strong>Category:</strong> {course.category}</p>
//                 <p className="mb-2"><strong>Price:</strong> ${course.price}</p>
//                 <p className="mb-2"><strong>Duration:</strong> {course.duration} hours</p>
//                 <Link to={`/courses/${course._id}`} className="text-blue-600">View Details</Link>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;




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
              {suggestedCourses.map(course => (
                <div key={course._id} className="border rounded p-4 shadow">
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="mb-2">{course.description}</p>
                  <p className="mb-2"><strong>Category:</strong> {course.category}</p>
                  <p className="mb-2"><strong>Price:</strong> ${course.price}</p>
                  <p className="mb-2"><strong>Duration:</strong> {course.duration} hours</p>
                  <Link to={`/courses/${course._id}`} className="text-blue-600">View Details</Link>
                </div>
              ))}
            </div>
          </div>
        )}
        <div>
          <h1 className="text-3xl mb-6">Available Courses</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
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
      </div>
    </>
  );
};

export default Home;






