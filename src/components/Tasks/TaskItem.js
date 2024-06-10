import React, { useState, useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';

const TaskItem = ({ task }) => {
  const { updateTask, deleteTask } = useContext(TaskContext);
  const [currentStatus, setCurrentStatus] = useState(task.status);

  // Handle status change
  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setCurrentStatus(newStatus);
    const updatedTask = { ...task, status: newStatus };
    await updateTask(updatedTask);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      {/* Task title */}
      <h3 className="text-lg font-bold">{task.title}</h3>
      {/* Task description */}
      <p className="text-gray-600">{task.description}</p>
      {/* Status dropdown */}
      <select value={currentStatus} onChange={handleStatusChange} className="border border-gray-300 rounded p-2">
        <option value="To-Do">To-Do</option>
        <option value="In-Progress">In-Progress</option>
        <option value="Done">Done</option>
      </select>
      {/* Delete button */}
      <button onClick={() => deleteTask(task.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">Delete</button>
    </div>
  );
};

export default TaskItem;
