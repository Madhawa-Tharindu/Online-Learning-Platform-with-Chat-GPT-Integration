// // eslint-disable-next-line no-unused-vars
// import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// const Navbar = () => {
//   const { user, logout } = useContext(AuthContext);

//   return (
//     <nav className="bg-blue-600 p-4 flex justify-between">
//       <div>
//         <Link to="/" className="text-white font-bold text-xl">Learning Platform</Link>
//       </div>
//       <div>
//         {user ? (
//           <>
//             <span className="text-white mr-4">Hello, {user.firstName}</span>
//             {user.role === 'instructor' && (
//               <Link to="/create-course" className="text-white mr-4">Create Course</Link>
//             )}
//             <button onClick={logout} className="text-white">Logout</button>
//           </>
//         ) : (
//           <>
//             <Link to="/login" className="text-white mr-4">Login</Link>
//             <Link to="/signup" className="text-white">Signup</Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



// eslint-disable-next-line no-unused-vars
// Navbar.jsx

import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();  // Call the logout function
    navigate('/login');  // Redirect to login page after logout
  };

  return (
    <nav className="bg-blue-600 p-4 flex justify-between">
      <div>
        <Link to="/" className="text-white font-bold text-xl">Learning Platform</Link>
      </div>
      <div>
        {user ? (
          <>
            <span className="text-white mr-4">Hello, {user.firstName}</span>
            {user.role === 'instructor' && (
              <Link to="/create-course" className="text-white mr-4">Create Course</Link>
            )}
            <button onClick={handleLogout} className="text-white">Logout</button>
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


