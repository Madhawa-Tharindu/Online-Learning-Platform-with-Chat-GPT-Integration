import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // To send cookies with requests
});

// Add a request interceptor to include the token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Store token in localStorage after login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default api;
