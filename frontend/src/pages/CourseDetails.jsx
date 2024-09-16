import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../config/api';
import { AuthContext } from '../context/AuthContext';

const CourseDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [course, setCourse] = useState(null);
  const [enrolled, setEnrolled] = useState(false);
  const [students, setStudents] = useState([]); // To store enrolled students
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${id}`);
        setCourse(res.data);

        // Check if the student is already enrolled
        if (user && res.data.studentsEnrolled.includes(user._id)) {
          setEnrolled(true);
        }

        // Fetch detailed student information
        if (user && user.role === 'instructor' && user._id === res.data.instructor._id) {
          const studentsRes = await api.get(`/courses/students/${id}`); // New route for fetching students
          setStudents(studentsRes.data);
        }
      } catch (error) {
        console.error('Error fetching course or students:', error.message);
      }
    };
    fetchCourse();
  }, [id, user]);

  const enrollInCourse = async () => {
    try {
      await api.post(`/courses/enroll/${id}`);
      setEnrolled(true);

      // Optionally, you can fetch the updated course data
      const updatedCourse = await api.get(`/courses/${id}`);
      setCourse(updatedCourse.data);
    } catch (error) {
      console.error('Error enrolling in course:', error.message);
    }
  };

  // Function to delete the course
  const deleteCourse = async () => {
    try {
      await api.delete(`/courses/${id}`);
      navigate('/'); // Redirect to home after deletion
    } catch (error) {
      console.error('Error deleting course:', error.message);
    }
  };

  if (!course) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">{course.title}</h1>
      <p className="mb-2">{course.description}</p>
      <p className="mb-2"><strong>Category:</strong> {course.category}</p>
      <p className="mb-2"><strong>Price:</strong> ${course.price}</p>
      <p className="mb-2"><strong>Duration:</strong> {course.duration} hours</p>
      <p className="mb-4"><strong>Instructor:</strong> {course.instructor.username}</p>

      {/* Back to Home button (common for both roles) */}
      <div className="mb-6">
        <Link to="/" className="bg-gray-300 text-black px-4 py-2 rounded">
          Back to Home
        </Link>
      </div>

      {/* Show enroll button if the user is a student */}
      {user && user.role === 'student' && (
        enrolled ? (
          <button className="bg-green-500 text-white px-4 py-2 rounded" disabled>
            Enrolled
          </button>
        ) : (
          <button onClick={enrollInCourse} className="bg-blue-600 text-white px-4 py-2 rounded">
            Enroll
          </button>
        )
      )}

      {/* Show edit and delete buttons if the user is the course instructor */}
      {user && user.role === 'instructor' && user._id === course.instructor._id && (
        <div className="flex space-x-4 mt-6">
          <Link to={`/edit-course/${id}`} className="bg-yellow-500 text-white px-4 py-2 rounded">
            Edit
          </Link>
          <button onClick={deleteCourse} className="bg-red-500 text-white px-4 py-2 rounded">
            Delete
          </button>
        </div>
      )}

      {/* Course content section */}
      <h2 className="text-2xl mt-6 mb-4">Course Content</h2>
      <ul className="list-disc list-inside">
        {course.content.map((module, index) => (
          <li key={index} className="mb-2">
            <strong>{module.moduleTitle}:</strong> {module.moduleContent}
          </li>
        ))}
      </ul>

      {/* Display Enrolled Students if the user is the instructor */}
      {user && user.role === 'instructor' && user._id === course.instructor._id && students.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl mb-4">Enrolled Students</h2>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Student Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td className="border border-gray-300 px-4 py-2">{student.firstName} {student.lastName}</td>
                  <td className="border border-gray-300 px-4 py-2">{student.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
