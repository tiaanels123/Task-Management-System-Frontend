import React, { useState, useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { AuthContext } from '../../context/AuthContext';

const TaskForm = () => {
  const [task, setTask] = useState({ title: '', description: '', status: 'To-Do' });
  const { addTask } = useContext(TaskContext);
  const { user } = useContext(AuthContext);

  // Handle form input changes
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskWithUser = { ...task, userId: user.id };
    try {
      await addTask(taskWithUser);
      setTask({ title: '', description: '', status: 'To-Do' }); // Reset form after successful submission
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow">
      {/* Title input */}
      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input type="text" name="title" value={task.title} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded"/>
      </div>
      {/* Description input */}
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea name="description" value={task.description} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded"></textarea>
      </div>
      {/* Submit button */}
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Task</button>
    </form>
  );
};

export default TaskForm;
