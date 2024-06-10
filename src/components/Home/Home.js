import React from 'react';

const Home = () => {
  return (
    <div className="px-4 pt-8">
      {/* Container for welcome message */}
      <div className="max-w-4xl mx-auto bg-white p-12 rounded-lg shadow-xl">
        {/* Welcome heading */}
        <h1 className="text-5xl font-bold text-gray-800 mb-8">Welcome to the Task Management System</h1>
        {/* Description of the application */}
        <p className="text-xl text-gray-600">
          This application helps you manage your tasks efficiently. Whether you're planning your day, organizing a project,
          or keeping track of your personal goals, our Task Management System is here to assist you. Navigate to the Dashboard
          to manage your tasks or update your profile under My Profile.
        </p>
      </div>
    </div>
  );
};

export default Home;
