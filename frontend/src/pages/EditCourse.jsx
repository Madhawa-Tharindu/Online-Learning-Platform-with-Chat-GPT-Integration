import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../config/api';

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    duration: 0,
    category: '',
    content: [
      { moduleTitle: '', moduleContent: '' }
    ],
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${id}`);
        setFormData(res.data);
      } catch (error) {
        console.error('Error fetching course:', error.message);
      }
    };
    fetchCourse();
  }, [id]);

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
      await api.put(`/courses/update-course/${id}`, formData);
      setSuccessMessage('Course updated successfully!');
      setTimeout(() => navigate(`/courses/${id}`), 1500); // Redirect after 1.5 seconds
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl">

{successMessage && (
  <div className="fixed bottom-4 right-4 p-4 bg-green-600 text-white rounded-lg shadow-lg">
    {successMessage}
  </div>
)}
      <form onSubmit={onSubmit} className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Edit Course</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        

        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">Title</label>
          <input type="text" name="title" value={title} onChange={onChange} required className="w-full border px-4 py-2 rounded-lg"/>
        </div>
        
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">Description</label>
          <textarea name="description" value={description} onChange={onChange} required className="w-full border px-4 py-2 rounded-lg"/>
        </div>
        
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">Price</label>
          <input type="number" name="price" value={price} onChange={onChange} required className="w-full border px-4 py-2 rounded-lg"/>
        </div>
        
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">Duration (hours)</label>
          <input type="number" name="duration" value={duration} onChange={onChange} required className="w-full border px-4 py-2 rounded-lg"/>
        </div>
        
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">Category</label>
          <input type="text" name="category" value={category} onChange={onChange} required className="w-full border px-4 py-2 rounded-lg"/>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Course Content</h3>
          {content.map((module, index) => (
            <div key={index} className="mb-6 border p-4 rounded-lg shadow-sm">
              <div className="mb-4">
                <label className="block mb-2 font-semibold text-gray-700">Module Title</label>
                <input type="text" name="moduleTitle" value={module.moduleTitle} onChange={(e) => onContentChange(index, e)} required className="w-full border px-4 py-2 rounded-lg"/>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold text-gray-700">Module Content</label>
                <textarea name="moduleContent" value={module.moduleContent} onChange={(e) => onContentChange(index, e)} required className="w-full border px-4 py-2 rounded-lg"/>
              </div>
              {content.length > 1 && (
                <button type="button" onClick={() => removeModule(index)} className="text-red-500">Remove Module</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addModule} className="bg-green-500 text-white px-4 py-2 rounded-lg">Add Module</button>
        </div>

        <div className="flex justify-between mt-8">
          <button type="button" onClick={() => navigate('/')} className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg">Back To Home</button>
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg">Update Course</button>
        </div>
      </form>
    </div>
  );
};

export default EditCourse;

