import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // State to manage user credentials
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const { login } = useContext(AuthContext); // Context for authentication functions
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Handler for input changes
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials); // Attempt to log in
      navigate('/dashboard'); // Navigate to dashboard on successful login
    } catch (error) {
      console.error("Login error:", error.response ? error.response.data : error.message);
      // Optionally handle errors with a user notification
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <div className="mb-6">
          <label htmlFor="username" className="block text-gray-700 text-lg font-bold mb-2">Username</label>
          <input type="text" id="username" name="username" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-lg font-bold mb-2">Password</label>
          <input type="password" id="password" name="password" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
      </form>
    </div>
  );
};

export default Login;
