import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Register = () => {
  const [credentials, setCredentials] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    register(credentials, (errorMessage) => {
      setError(errorMessage);
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-bold mb-2">Username</label>
          <input type="text" name="username" value={credentials.username} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-bold mb-2">Email</label>
          <input type="email" name="email" value={credentials.email} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-bold mb-2">Password</label>
          <input type="password" name="password" value={credentials.password} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</button>
      </form>
    </div>
  );
};

export default Register;
