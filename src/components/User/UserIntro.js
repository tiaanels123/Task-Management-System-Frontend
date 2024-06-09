import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const UserIntro = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.userName}!</h1>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserIntro;
