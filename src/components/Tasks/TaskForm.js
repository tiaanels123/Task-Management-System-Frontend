import React, { useState, useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { AuthContext } from '../../context/AuthContext'; 

const TaskForm = () => {
  const [task, setTask] = useState({ title: '', description: '', status: 'To-Do' });
  const { addTask } = useContext(TaskContext);
  const { user } = useContext(AuthContext);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const taskWithUser = { ...task, userId: user.id };  
  try {
      await addTask(taskWithUser);
      setTask({ title: '', description: '', status: 'To-Do' });
  } catch (error) {
      console.error("Failed to add task:", error);
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input type="text" name="title" value={task.title} onChange={handleChange} />
      </div>
      <div>
        <label>Description</label>
        <textarea name="description" value={task.description} onChange={handleChange}></textarea>
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
