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
      navigate(`/courses/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={onSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Edit Course</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <div className="mb-4">
          <label className="block mb-1">Title</label>
          <input type="text" name="title" value={title} onChange={onChange} required className="w-full border px-3 py-2 rounded"/>
        </div>
        
        <div className="mb-4">
          <label className="block mb-1">Description</label>
          <textarea name="description" value={description} onChange={onChange} required className="w-full border px-3 py-2 rounded"/>
        </div>
        
        <div className="mb-4">
          <label className="block mb-1">Price</label>
          <input type="number" name="price" value={price} onChange={onChange} required className="w-full border px-3 py-2 rounded"/>
        </div>
        
        <div className="mb-4">
          <label className="block mb-1">Duration (hours)</label>
          <input type="number" name="duration" value={duration} onChange={onChange} required className="w-full border px-3 py-2 rounded"/>
        </div>
        
        <div className="mb-4">
          <label className="block mb-1">Category</label>
          <input type="text" name="category" value={category} onChange={onChange} required className="w-full border px-3 py-2 rounded"/>
        </div>
        
        <div className="mb-4">
          <h3 className="text-xl mb-2">Course Content</h3>
          {content.map((module, index) => (
            <div key={index} className="mb-4 border p-4 rounded">
              <div className="mb-2">
                <label className="block mb-1">Module Title</label>
                <input type="text" name="moduleTitle" value={module.moduleTitle} onChange={(e) => onContentChange(index, e)} required className="w-full border px-3 py-2 rounded"/>
              </div>
              <div className="mb-2">
                <label className="block mb-1">Module Content</label>
                <textarea name="moduleContent" value={module.moduleContent} onChange={(e) => onContentChange(index, e)} required className="w-full border px-3 py-2 rounded"/>
              </div>
              {content.length > 1 && (
                <button type="button" onClick={() => removeModule(index)} className="text-red-500">Remove Module</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addModule} className="bg-green-500 text-white px-3 py-2 rounded">Add Module</button>
        </div>
        
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update Course</button>
      </form>
    </div>
  );
};

export default EditCourse;
