import React from 'react';
import TaskList from '../Tasks/TaskList'; 
import TaskForm from '../Tasks/TaskForm'; 
import UserIntro from '../User/UserIntro';  

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Dashboard</h1>
      <UserIntro />
      <div className="my-8">
        <TaskForm />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Tasks</h2>
        <TaskList />
      </div>
    </div>
  );
};

export default Dashboard;
