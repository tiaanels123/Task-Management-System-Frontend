import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import UserProfile from './components/User/UserProfile';
import Navbar from './components/Navbar/Navbar';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import ProtectedRoute from './utils/ProtectedRoute'; // Correct path

const RoutesComponent = () => {
  return (
    <Router>
      <AuthProvider>
        <TaskProvider>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            } />
          </Routes>
        </TaskProvider>
      </AuthProvider>
    </Router>
  );
};

export default RoutesComponent;
