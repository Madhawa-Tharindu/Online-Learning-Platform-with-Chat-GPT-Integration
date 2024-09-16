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

        // Fetch detailed student information if the user is the instructor
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

      // Optionally, fetch updated course data
      const updatedCourse = await api.get(`/courses/${id}`);
      setCourse(updatedCourse.data);
    } catch (error) {
      console.error('Error enrolling in course:', error.message);
    }
  };

  const unenrollFromCourse = async () => {
    try {
      await api.post(`/courses/unenroll/${id}`);
      setEnrolled(false);

      // Optionally, fetch updated course data
      const updatedCourse = await api.get(`/courses/${id}`);
      setCourse(updatedCourse.data);
    } catch (error) {
      console.error('Error unenrolling from course:', error.message);
    }
  };

  // Function to delete the course
  const deleteCourse = async () => {
    try {
      await api.delete(`/courses/delete-course/${id}`);
      navigate('/'); // Redirect to home after deletion
    } catch (error) {
      console.error('Error deleting course:', error.message);
    }
  };

  if (!course) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6 rounded-lg shadow-lg mt-[3rem] mb-[4rem] ">
      {/* Course Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{course.title}</h1>
        <p className="text-lg text-gray-700 mb-2">{course.description}</p>
        <p className="text-sm text-gray-600 mb-2"><strong>Category:</strong> {course.category}</p>
        <p className="text-sm text-gray-600 mb-2"><strong>Price:</strong> ${course.price}</p>
        <p className="text-sm text-gray-600 mb-2"><strong>Duration:</strong> {course.duration} hours</p>
        <p className="text-sm text-gray-600 mb-4"><strong>Instructor:</strong> {course.instructor.username}</p>
      </div>

      {/* Enrollment Section */}
      <div className="mb-8">
        {user && user.role === 'student' && (
          enrolled ? (
            <div className="flex items-center space-x-4">
              <button
                onClick={unenrollFromCourse}
                className="bg-red-600 text-white font-bold px-6 py-2 rounded-lg shadow hover:bg-red-700 transition"
              >
                Unenroll
              </button>
              <p className="text-sm text-red-600">You already enrolled for this course.</p>
            </div>
          ) : (
            <button
              onClick={enrollInCourse}
              className="bg-green-600 text-white font-bold px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
            >
              Enroll
            </button>
          )
        )}
      </div>

      {/* Course Content */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Course Content</h2>
        <ul className="list-disc list-inside space-y-3">
          {course.content.map((module, index) => (
            <li key={index} className="text-lg text-gray-700">
              <strong>{module.moduleTitle}:</strong> {module.moduleContent}
            </li>
          ))}
        </ul>
      </div>

      {/* Instructor Controls: Edit and Delete */}
      {user && user.role === 'instructor' && user._id === course.instructor._id && (
        <div className="flex justify-between mt-10">
          <Link
            to={`/edit-course/${id}`}
            className="bg-yellow-500 text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-yellow-600 transition"
          >
            Edit Course
          </Link>
          <button
            onClick={deleteCourse}
            className="bg-red-500 text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-red-600 transition"
          >
            Delete Course
          </button>
        </div>
      )}

      {/* Enrolled Students for Instructors */}
      {user && user.role === 'instructor' && user._id === course.instructor._id && students.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Enrolled Students</h2>
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
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {student.firstName} {student.lastName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{student.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Back to Home button */}
      <div className="mt-10 flex justify-end">
        <Link to="/" className="bg-gray-300 text-black font-semibold px-6 py-2 rounded-lg shadow hover:bg-gray-400 transition">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default CourseDetails;
