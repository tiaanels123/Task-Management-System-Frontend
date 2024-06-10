import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const UserIntro = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="text-center py-4">
      {user ? (
        <div>
          {/* Display user details */}
          <h1 className="text-2xl font-bold">Welcome, {user.userName}!</h1>
          <p className="text-gray-600">Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserIntro;
