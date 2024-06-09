import React from 'react';
import TaskList from '../Tasks/TaskList'; 
import TaskForm from '../Tasks/TaskForm'; 
import UserIntro from '../User/UserIntro';  

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