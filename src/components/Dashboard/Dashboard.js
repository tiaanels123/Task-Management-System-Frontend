import React from 'react';
import TaskList from '../Tasks/TaskList';  // Corrected import path
import TaskForm from '../Tasks/TaskForm';  // Corrected import path
import UserIntro from '../User/UserIntro';  // Corrected import path

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <UserIntro />
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default Dashboard;