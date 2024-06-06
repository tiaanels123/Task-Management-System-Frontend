import React, { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import TaskItem from './TaskItem';

const TaskList = () => {
  const { tasks, loading } = useContext(TaskContext);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
