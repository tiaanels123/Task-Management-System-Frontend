import React from 'react';
import TaskList from '../Tasks/TaskList';
import TaskForm from '../Tasks/TaskForm';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default Dashboard;
