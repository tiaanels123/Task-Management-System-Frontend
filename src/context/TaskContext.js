import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const fetchTasks = useCallback(async () => {
    if (user && user.token) {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5249/api/tasks', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error.response ? error.response.data : "Unknown error");
      }
      setLoading(false);
    }
  }, [user]);

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
        setTasks([...tasks, response.data]);
      } catch (error) {
        console.error("Error adding task:", error.response ? error.response.data : "Unknown error");
      }
    }
  };

  const updateTask = async (task) => {
    if (user && user.token) {
      try {
        const response = await axios.put(`http://localhost:5249/api/tasks/${task.id}`, task, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        setTasks(tasks.map(t => (t.id === task.id ? response.data : t)));
      } catch (error) {
        console.error("Error updating task:", error.response ? error.response.data : "Unknown error");
      }
    }
  };

  const deleteTask = async (id) => {
    if (user && user.token) {
      try {
        await axios.delete(`http://localhost:5249/api/tasks/${id}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        setTasks(tasks.filter(task => task.id !== id));
      } catch (error) {
        console.error("Error deleting task:", error.response ? error.response.data : "Unknown error");
      }
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, loading }}>
      {children}
    </TaskContext.Provider>
  );
};
