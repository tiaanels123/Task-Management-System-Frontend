import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Register = () => {
  // State to manage user credentials
  const [credentials, setCredentials] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(''); // State to manage errors
  const { register } = useContext(AuthContext); // Context for authentication functions

  // Handler for input changes
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    register(credentials, (errorMessage) => {
      setError(errorMessage); // Set error message if registration fails
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Register</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input type="text" id="username" name="username" value={credentials.username} onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input type="email" id="email" name="email" value={credentials.email} onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input type="password" id="password" name="password" value={credentials.password} onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
