import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchTasks = useCallback(async () => {
    if (user && user.token) {
      try {
        const response = await axios.get('http://localhost:5249/api/tasks', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error.response ? error.response.data : "Unknown error");
      }
    }
  }, [user?.token]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (task) => {
    if (user && user.token) {
      try {
        const response = await axios.post('http://localhost:5249/api/tasks', task, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        });
        if (response.status === 201) {
          setTasks(prevTasks => [...prevTasks, response.data]);
        }
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  const updateTask = async (task) => {
    if (user && user.token) {
      const updatedTask = { ...task }; // Create a copy of task to be updated
      setTasks(prevTasks => prevTasks.map(t => t.id === task.id ? {...t, ...updatedTask} : t)); // Optimistically update task

      try {
        const response = await axios.put(`http://localhost:5249/api/tasks/${task.id}`, updatedTask, {
          headers: { 'Authorization': `Bearer ${user.token}` }
        });
        if (!response.status.toString().startsWith('2')) { // Checks if the status code starts with '2' (e.g., 200, 201, 204)
          throw new Error('Failed to update task due to unexpected status code');
        }
      } catch (error) {
        // If the update fails, revert to the previous state
        console.error("Error updating task:", error);
        setTasks(prevTasks => prevTasks.map(t => t.id === task.id ? {...t, status: task.status} : t)); // Revert if update fails
      }
    }
  };

  const deleteTask = async (id) => {
    if (user && user.token) {
      try {
        await axios.delete(`http://localhost:5249/api/tasks/${id}`, {
          headers: { 'Authorization': `Bearer ${user.token}` }
        });
        setTasks(prevTasks => prevTasks.filter(t => t.id !== id));
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
