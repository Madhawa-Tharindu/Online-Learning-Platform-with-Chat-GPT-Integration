// // eslint-disable-next-line no-unused-vars
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { firstName, lastName, username, email, password, confirmPassword, role } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await signup(formData);
      setSuccessMessage('Signup successful! Please login.'); // Set the success message
      setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-screen bg-gray-900 relative">
      <div className="flex-grow flex justify-center items-center bg-gray-200">
        <form onSubmit={onSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-center text-3xl mb-6 font-semibold">Signup</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={onChange}
              placeholder="First Name"
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={onChange}
              placeholder="Last Name"
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="username"
              value={username}
              onChange={onChange}
              placeholder="Username"
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Email"
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Password"
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              placeholder="Confirm Password"
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="mb-4">
            <select
              name="role"
              value={role}
              onChange={onChange}
              required
              className="w-full border px-3 py-2 rounded"
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Signup</button>

          {/* Already a member prompt */}
          <p className="text-center text-gray-600 mt-4">
            Already a member?{' '}
            <Link to="/login" className="text-blue-600 font-semibold">Login</Link>
          </p>
        </form>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-4 p-4 bg-green-600 text-white rounded-lg shadow-lg">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default Signup;
