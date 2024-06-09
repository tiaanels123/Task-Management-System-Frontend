import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Register = () => {
  const [credentials, setCredentials] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');  // State to hold error messages
  const { register } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    register(credentials, (errorMessage) => {
      setError(errorMessage);  // Set error message received from the register function
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input type="text" name="username" value={credentials.username} onChange={handleChange} />
      </div>
      <div>
        <label>Email</label>
        <input type="email" name="email" value={credentials.email} onChange={handleChange} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" value={credentials.password} onChange={handleChange} />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}  // Display error message if it exists
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
