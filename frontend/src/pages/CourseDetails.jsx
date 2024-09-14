import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../config/api';
import { AuthContext } from '../context/AuthContext';

const CourseDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [course, setCourse] = useState(null);
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${id}`);
        setCourse(res.data);
        if (user && res.data.studentsEnrolled.includes(user._id)) {
          setEnrolled(true);
        }
      } catch (error) {
        console.error('Error fetching course:', error.message);
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
      // Optionally, display error to the user
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

      <h2 className="text-2xl mt-6 mb-4">Course Content</h2>
      <ul className="list-disc list-inside">
        {course.content.map((module, index) => (
          <li key={index} className="mb-2">
            <strong>{module.moduleTitle}:</strong> {module.moduleContent}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseDetails;
