import React, { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';

const TaskItem = ({ task }) => {
  const { updateTask, deleteTask } = useContext(TaskContext);

  const handleStatusChange = (e) => {
    const updatedTask = { ...task, status: e.target.value };
    updateTask(updatedTask);
  };

  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <select value={task.status} onChange={handleStatusChange}>
        <option value="To-Do">To-Do</option>
        <option value="In-Progress">In-Progress</option>
        <option value="Done">Done</option>
      </select>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
  );
};

export default TaskItem;
