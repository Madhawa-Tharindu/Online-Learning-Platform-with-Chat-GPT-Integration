import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../config/api';

const CreateCourse = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    duration: 0,
    category: '',
    content: [{ moduleTitle: '', moduleContent: '' }],
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { title, description, price, duration, category, content } = formData;

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onContentChange = (index, e) => {
    const { name, value } = e.target;
    const updatedContent = formData.content.map((module, i) =>
      i === index ? { ...module, [name]: value } : module
    );
    setFormData({ ...formData, content: updatedContent });
  };

  const addModule = () => {
    setFormData({
      ...formData,
      content: [...formData.content, { moduleTitle: '', moduleContent: '' }],
    });
  };

  const removeModule = (index) => {
    const updatedContent = formData.content.filter((_, i) => i !== index);
    setFormData({ ...formData, content: updatedContent });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/courses/create-course', formData);
      setSuccessMessage('Course created successfully!');
      setTimeout(() => navigate(`/`), 1500); 
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center mt-[3rem] mb-[4rem]">
      {successMessage && (
  <div className="fixed bottom-4 right-4 p-4 bg-green-600 text-white rounded-lg shadow-lg">
    {successMessage}
  </div>
)}
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Create New Course</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={onChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={description}
              onChange={onChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Price ($)</label>
            <input
              type="number"
              name="price"
              value={price}
              onChange={onChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Duration (hours)</label>
            <input
              type="number"
              name="duration"
              value={duration}
              onChange={onChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={category}
              onChange={onChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Course Content</h3>
            {content.map((module, index) => (
              <div key={index} className="mb-4 p-4 border rounded bg-gray-50">
                <div className="mb-2">
                  <label className="block font-medium mb-1">Module Title</label>
                  <input
                    type="text"
                    name="moduleTitle"
                    value={module.moduleTitle}
                    onChange={(e) => onContentChange(index, e)}
                    required
                    className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-2">
                  <label className="block font-medium mb-1">Module Content</label>
                  <textarea
                    name="moduleContent"
                    value={module.moduleContent}
                    onChange={(e) => onContentChange(index, e)}
                    required
                    className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
                {content.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeModule(index)}
                    className="text-red-500 hover:underline"
                  >
                    Remove Module
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addModule}
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add Module
            </button>
          </div>

          <div className="flex justify-between mt-8">
            {/* Back to Home button on the left */}
            <Link
              to="/"
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Back To Home
            </Link>

            {/* Create Course button on the right */}
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Create Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
