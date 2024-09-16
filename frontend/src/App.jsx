import { Routes, Route } from 'react-router-dom';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import CreateCourse from './pages/CreateCourse';
import EditCourse from './pages/EditCourse';
import CourseDetails from './pages/CourseDetails';
import EnrolledCourses from './pages/EnrolledCourses';
import ProtectedRoute from './routes/ProtectedRoute';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes */}
          <Route path="/create-course" element={
            <ProtectedRoute roles={['instructor']}>
              <CreateCourse />
            </ProtectedRoute>
          } />
          <Route path="/edit-course/:id" element={
            <ProtectedRoute roles={['instructor']}>
              <EditCourse />
            </ProtectedRoute>
          } />
          <Route path="/enrolled-courses" element={
            <ProtectedRoute roles={['student']}>
              <EnrolledCourses />
            </ProtectedRoute>
          } />
          
          <Route path="/courses/:id" element={<CourseDetails />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;

