import { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Generate random profile picture based on the username
  const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${user?.firstName}`;

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Toggle dropdown menu visibility
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside); // Cleanup event listener
    };
  }, [showDropdown]);

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center">
      {/* Left Side: Logo */}
      <div>
        <Link to="/" className="text-white font-bold text-xl">Learning Platform</Link>
      </div>

      {/* Right Side: Home, Hello, User, Profile Pic, and Dropdown */}
      <div className="relative flex items-center">
        {user ? (
          <>
            {/* Home Link */}
            <Link to="/" className="text-white font-medium mr-4">Home</Link>
            <span className="text-silver mr-4">|</span>

            {/* Greeting */}
            <span className="text-white mr-4">Hello, {user.firstName}</span>

            {/* Profile image as button */}
            <div className="relative inline-block" ref={dropdownRef}>
              <button onClick={toggleDropdown} className="focus:outline-none">
                <img
                  src={boyProfilePic}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                  {user.role === 'student' && (
                    <>
                      <Link to={`/profile/${user._id}`} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                      Role: {user?.role}
                      </Link>
                      <Link to={`/profile/${user._id}`} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                        Profile
                      </Link>
                      <Link to="/enrolled-courses" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                        Enrolled Courses
                      </Link>
                    </>
                  )}
                  {user.role === 'instructor' && (
                    <>
                    <Link to={`/profile/${user._id}`} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                      Role: {user?.role}
                    </Link>
                    <Link to={`/profile/${user._id}`} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                        Profile
                      </Link>
                    <Link to="/create-course" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                      Create Course
                    </Link>
                    <Link to={`/my-courses/${user._id}`} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    My Courses
                  </Link>
                  </>
                  )}

                  {/* Logout at the bottom */}
                  <div className="border-t mt-2">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white mr-4">Login</Link>
            <Link to="/signup" className="text-white">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


