import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../config/api';  // Assuming you have an API config set up
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { id } = useParams();
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch the user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/auth/profile/${id}`); // Backend route to get profile
        setFormData({
          username: res.data.username,
          email: res.data.email,
          password: '', // Leave password field blank initially
        });
      } catch (error) {
        setError('Error fetching profile', error);
      }
    };

    fetchProfile();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle profile update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // eslint-disable-next-line no-unused-vars
      const res = await api.patch(`/auth/update-profile/${id}`, formData); // Backend route to update profile
      setSuccess('Profile updated successfully');
      setFormData({ ...formData, password: '' }); // Reset password field after update
    } catch (error) {
      setError('Error updating profile', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle account deletion for students
  const handleDeleteAccount = async () => {
    if (user.role !== 'student') {
      setError('Only students can delete their account');
      return;
    }

    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await api.delete(`/auth/delete-profile/${id}`); // Backend route to delete account
        logout();
        navigate('/signup');
      } catch (error) {
        setError('Error deleting account', error.message);
      }
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg mt-[3rem] max-w-xl">
      <div className="flex items-center mb-6">
        <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden mr-6">
          <img src={`https://avatar.iran.liara.run/public/boy?username=${formData.username}`} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Profile</h1>
          <p className="text-gray-600">Manage your profile and account settings here.</p>
        </div>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="block w-full px-2 border-gray-400 bg-gray-200 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full px-2 border-gray-400 bg-gray-200 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Leave blank to keep current password"
            className="block w-full px-2 border-gray-400 bg-gray-200 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>

        <div className="flex items-center justify-between pb-7">
  <button
    type="submit"
    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 mt-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    disabled={loading}
  >
    {loading ? 'Updating...' : 'Update Profile'}
  </button>

  {user.role === 'student' && (
    <button
      onClick={handleDeleteAccount}
      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 mt-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
    >
      Delete Account
    </button>
  )}
</div>
      </form>
    </div>
  );
};

export default Profile;
