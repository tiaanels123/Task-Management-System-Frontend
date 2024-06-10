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
      // Optionally display alert or message on successful update
    } catch (error) {
      console.error('Failed to update profile:', error.response ? error.response.data : error);
      // Optionally handle errors with a user notification
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow rounded-lg my-6">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <div className="mb-2">
        <strong>Username:</strong> {user?.userName}
      </div>
      <div className="mb-4">
        <strong>Email:</strong> {user?.email}
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Update Username</label>
          <input type="text" name="userName" value={formData.userName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded"/>
        </div>
        <div>
          <label className="block text-gray-700">Update Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded"/>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
