import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children, axiosInstance }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      validateToken(token);
    } else {
      setLoading(false);
    }
  }, [navigate]);

  // Validate token and fetch user data
  const validateToken = async (token) => {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      const response = await axiosInstance.get('http://localhost:5249/api/Users/me');
      setUser({ ...response.data, token });
      setLoading(false);
    } catch (error) {
      console.error("Token validation failed:", error);
      logout();
    }
  };

  // Update user details
  const updateUserDetails = async (newDetails) => {
    try {
      const updateResponse = await axiosInstance.put('http://localhost:5249/api/users/me', newDetails, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      if (updateResponse.status === 204) {
        const userDetailsResponse = await axiosInstance.get('http://localhost:5249/api/Users/me', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setUser({
          ...userDetailsResponse.data,
          token: user.token
        });
      } else {
        throw new Error('Update failed with status: ' + updateResponse.status);
      }
    } catch (error) {
      console.error("Failed to update user details:", error);
    }
  };

  // Login user
  const login = async (credentials) => {
    try {
      const response = await axiosInstance.post('http://localhost:5249/api/auth/login', credentials);
      if (response.data.token) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const userDetailsResponse = await axiosInstance.get('http://localhost:5249/api/Users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (userDetailsResponse.status === 200) {
          const userData = {
            token,
            userName: userDetailsResponse.data.userName,
            email: userDetailsResponse.data.email
          };

          setUser(userData);
          navigate('/dashboard');
        } else {
          throw new Error('Failed to fetch user details');
        }
      } else {
        throw new Error('Login successful but no token received.');
      }
    } catch (error) {
      console.error("Login error:", error.response ? error.response.data : error.message);
      alert("Login failed, please check your credentials.");
    }
  };

  // Register user
  const register = async (credentials) => {
    try {
      const response = await axiosInstance.post('http://localhost:5249/api/auth/register', credentials);
      if (response.data.userId) {
        console.log('Registration successful, userId received:', response.data.userId);
        login(credentials);
      } else {
        throw new Error('Registration successful but no userId received.');
      }
    } catch (error) {
      const errorMessage = parseErrorMessage(error.response.data);
      console.error("Registration error:", errorMessage);
      alert(errorMessage);
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    delete axiosInstance.defaults.headers.common['Authorization'];
    setUser(null);
    navigate('/');
  };

  // Parse error messages
  const parseErrorMessage = (responseData) => {
    if (responseData && responseData.errors) {
      return Object.values(responseData.errors).map(err => err.join(', ')).join(', ');
    }
    return responseData.title || "Unknown error occurred.";
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout, updateUserDetails }}>
      {children}
    </AuthContext.Provider>
  );
};
