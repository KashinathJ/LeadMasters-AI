import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ loading, tasks, onEdit }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-12 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by creating a new task.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default TaskList;
