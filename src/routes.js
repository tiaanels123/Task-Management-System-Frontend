import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';

const RoutesComponent = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </Router>
      </TaskProvider>
    </AuthProvider>
  );
};

export default RoutesComponent;
