// // eslint-disable-next-line no-unused-vars
// import { useState, useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();
  
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const [error, setError] = useState('');

//   const { email, password } = formData;

//   const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setError(''); // Clear any previous errors before submitting
//     try {
//       await login(email, password);
//       navigate('/');
//     } catch (err) {
//       console.error('Login error:', err);  // Debug log
//       setError(err.message || 'Something went wrong');
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <form onSubmit={onSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
//         <h2 className="text-2xl mb-4">Login</h2>
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <div className="mb-4">
//           <label className="block mb-1">Email</label>
//           <input type="email" name="email" value={email} onChange={onChange} required className="w-full border px-3 py-2 rounded"/>
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1">Password</label>
//           <input type="password" name="password" value={password} onChange={onChange} required className="w-full border px-3 py-2 rounded"/>
//         </div>
//         <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;



import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors before submitting
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);  // Debug log
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-screen bg-gray-900">
      <div className="flex-grow flex justify-center items-center bg-gray-200">
        <form onSubmit={onSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-center text-3xl mb-6 font-semibold">Login</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
          
          {/* Sign-up prompt */}
          <p className="text-center text-gray-600 mt-4">
            Not a member?{' '}
            <Link to="/signup" className="text-blue-600 font-semibold">Sign up</Link>
          </p>
        </form>
      </div>

    </div>
  );
};

export default Login;


