import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser({ token, id: userId });
    } else if (userId) {
        // Handle case where userId exists but no token is yet available
        setUser({ id: userId });
    }
  }, []);

  const login = async (credentials) => {
    try {
        const response = await axios.post('http://localhost:5249/api/auth/login', credentials);
        const { token } = response.data;
        if (token) {
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser({ ...user, token });  // Update user with token, preserving existing user details
        } else {
            console.error('Login successful but no token received.');
        }
    } catch (error) {
        console.error("Login error:", error.response ? error.response.data : error.message);
    }
  };
  
  const register = async (credentials) => {
      try {
          const response = await axios.post('http://localhost:5249/api/auth/register', credentials);
          const { userId } = response.data; 
          if (userId) {
              localStorage.setItem('userId', userId); 
              setUser({ id: userId });
              console.log('Registration successful, userId received:', userId);

              // Automatically log in the user after registration
              await login(credentials);  
          } else {
              console.error('Registration successful but no userId received.');
          }
      } catch (error) {
          console.error("Registration error:", error.response ? error.response.data : error.message);
      }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};