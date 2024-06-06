import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Register = () => {
  const [credentials, setCredentials] = useState({ username: '', email: '', password: '' });
  const { register } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(credentials);
      // Redirect to login or any other page
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input type="text" name="username" onChange={handleChange} />
      </div>
      <div>
        <label>Email</label>
        <input type="email" name="email" onChange={handleChange} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" onChange={handleChange} />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
