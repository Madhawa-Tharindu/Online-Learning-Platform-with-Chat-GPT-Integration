// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

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
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={onSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4">Signup</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block mb-1">First Name</label>
          <input type="text" name="firstName" value={firstName} onChange={onChange} required className="w-full border px-3 py-2 rounded"/>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Last Name</label>
          <input type="text" name="lastName" value={lastName} onChange={onChange} required className="w-full border px-3 py-2 rounded"/>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input type="text" name="username" value={username} onChange={onChange} required className="w-full border px-3 py-2 rounded"/>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} required className="w-full border px-3 py-2 rounded"/>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input type="password" name="password" value={password} onChange={onChange} required className="w-full border px-3 py-2 rounded"/>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Confirm Password</label>
          <input type="password" name="confirmPassword" value={confirmPassword} onChange={onChange} required className="w-full border px-3 py-2 rounded"/>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Role</label>
          <select name="role" value={role} onChange={onChange} required className="w-full border px-3 py-2 rounded">
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
