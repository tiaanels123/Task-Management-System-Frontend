import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Make sure to import useNavigate

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser({ token });
      fetchUserDetails(token);
    }
  }, []);

  const fetchUserDetails = async (token) => {
    try {
      const response = await axios.get('http://localhost:5249/api/Users/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(prevState => ({ ...prevState, ...response.data }));
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      logout();
    }
  };

  const updateUserDetails = async (newDetails) => {
    try {
        const updateResponse = await axios.put('http://localhost:5249/api/users/me', newDetails, {
            headers: { Authorization: `Bearer ${user.token}` }
        });
        if (updateResponse.status === 204) {
            // Fetch user details again to confirm the update and refresh the token if necessary
            const userDetailsResponse = await axios.get('http://localhost:5249/api/Users/me', {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setUser({
                ...userDetailsResponse.data,
                token: user.token // Ensure the token remains unchanged but update other user details
            });
        } else {
            throw new Error('Update failed with status: ' + updateResponse.status);
        }
    } catch (error) {
        console.error("Failed to update user details:", error);
        // Optionally handle the logout or refresh token scenario here if the token is no longer valid
    }
};

const login = async (credentials) => {
  try {
    const response = await axios.post('http://localhost:5249/api/auth/login', credentials);
    if (response.data.token) {
      const { token } = response.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Fetch user details immediately after setting the token
      const userDetailsResponse = await axios.get('http://localhost:5249/api/Users/me', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (userDetailsResponse.status === 200) {
        const userData = {
          token,
          userName: userDetailsResponse.data.userName,
          email: userDetailsResponse.data.email
        };

        setUser(userData); // Set the user data with token and details
        navigate('/dashboard'); // Navigate to Dashboard after successful login
      } else {
        throw new Error('Failed to fetch user details');
      }
    } else {
      throw new Error('Login successful but no token received.');
    }
  } catch (error) {
    console.error("Login error:", error.response ? error.response.data : error.message);
    alert("Login failed, please check your credentials.");  // Display error message from server if any
    // Explicitly do not navigate anywhere
  }
};

const register = async (credentials, onError) => {
  try {
    const response = await axios.post('http://localhost:5249/api/auth/register', credentials);
    const { userId } = response.data;
    if (userId) {
      localStorage.setItem('userId', userId);
      setUser({ id: userId });
      console.log('Registration successful, userId received:', userId);
      await login(credentials); // Automatically log in the user after registration
    } else {
      console.error('Registration successful but no userId received.');
      onError('Registration successful but no userId received.');
    }
  } catch (error) {
    const errorMessage = error.response && error.response.data
      ? parseErrorMessage(error.response.data)
      : "Registration failed. Please check your details.";
    console.error("Registration error:", errorMessage);
    onError(errorMessage);
  }
};

// Helper function to parse the error message from server response
const parseErrorMessage = (responseData) => {
  if (responseData.errors) {
    // Example to handle object of errors, converting to string
    return Object.values(responseData.errors).map(err => err.join(', ')).join(', ');
  }
  return responseData.title || "Unknown error occurred.";
};

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    navigate('/'); // Redirect to home on logout
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout, updateUserDetails }}>
      {children}
    </AuthContext.Provider>
  );
};