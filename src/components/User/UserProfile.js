import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const UserProfile = () => {
  const { user, updateUserDetails } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    userName: user?.userName || '',
    email: user?.email || ''
  });

  useEffect(() => {
    
    setFormData({
      userName: user?.userName || '',
      email: user?.email || ''
    });
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserDetails(formData);
      // alert('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error.response ? error.response.data : error);
      // alert('Failed to update profile.');
    }
  };

  return (
    <div>
      <h1>My Profile</h1>
      <div>
        <strong>Username:</strong> {user?.userName}
      </div>
      <div>
        <strong>Email:</strong> {user?.email}
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Update Username</label>
          <input type="text" name="userName" value={formData.userName} onChange={handleChange} />
        </div>
        <div>
          <label>Update Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UserProfile; 