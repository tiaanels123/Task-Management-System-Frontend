import React, { useState, useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';

const TaskItem = ({ task }) => {
  const { updateTask, deleteTask } = useContext(TaskContext);
  const [currentStatus, setCurrentStatus] = useState(task.status); // Local state to manage dropdown value

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setCurrentStatus(newStatus); // Update local state immediately
    const updatedTask = { ...task, status: newStatus };

    await updateTask(updatedTask); // Update task in the global context
  };

  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <select value={currentStatus} onChange={handleStatusChange}>
        <option value="To-Do">To-Do</option>
        <option value="In-Progress">In-Progress</option>
        <option value="Done">Done</option>
      </select>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
  );
};

export default TaskItem;
