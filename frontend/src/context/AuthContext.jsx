/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';
//import axios from 'axios';
import api from '../config/api'; 
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleTokenExpiration = () => {
    console.log('Token expired, logging out...');
    logout(); // Log out the user when token expires
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Retrieved token:', token); // Debugging

    if (token) {
      api.get('/auth/profile/', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data.user);
          console.log('User data fetched:', response.data.user); // Debugging
        })
        .catch((error) => {
          console.error('Error fetching user data:', error.response?.data?.message || error.message);
          if (error.response?.data?.message === 'jwt expired') {
            handleTokenExpiration();
          } else {
            setUser(null);
          }
        });
    } else {
      setUser(null);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      //const { token, user } = response.data;
      const token = response.data.token;
      const user = response.data;
      console.log(response.data);
      if (token && user) {
        localStorage.setItem('token', response.data.token);
        setUser(user);
        console.log('Token stored:', token); // Debugging
      } else {
        console.error('No token or user data received');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout', {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      localStorage.removeItem('token');
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error.response?.data?.message || error.message);
    }
  };

  const signup = async (userData) => {
    try {
      const res = await api.post('/auth/signup', userData);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
    } catch (error) {
      console.error('Signup error:', error.response?.data?.message || error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
