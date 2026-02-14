import React from 'react';
import { format } from 'date-fns';
import { useTasks } from '../context/TaskContext';

const TaskItem = ({ task, onEdit }) => {
  const { updateTask, deleteTask } = useTasks();

  const handleStatusChange = async (newStatus) => {
    await updateTask(task._id, { ...task, status: newStatus });
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(task._id);
    }
  };

  const priorityColors = {
    High: 'bg-red-100 text-red-800 border-red-200',
    Med: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Low: 'bg-green-100 text-green-800 border-green-200',
  };

  const statusColors = {
    Todo: 'bg-gray-100 text-gray-800 border-gray-200',
    'In Progress': 'bg-blue-100 text-blue-800 border-blue-200',
    Completed: 'bg-green-100 text-green-800 border-green-200',
  };

  const isOverdue =
    task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'Completed';

  return (
    <div
      className={`bg-white rounded-lg shadow p-6 border-l-4 ${
        task.priority === 'High'
          ? 'border-red-500'
          : task.priority === 'Med'
          ? 'border-yellow-500'
          : 'border-green-500'
      } ${task.status === 'Completed' ? 'opacity-75' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3
              className={`text-lg font-semibold ${
                task.status === 'Completed' ? 'line-through text-gray-500' : 'text-gray-800'
              }`}
            >
              {task.title}
            </h3>
            <span
              className={`px-2 py-1 text-xs font-medium rounded border ${priorityColors[task.priority]}`}
            >
              {task.priority}
            </span>
            <span
              className={`px-2 py-1 text-xs font-medium rounded border ${statusColors[task.status]}`}
            >
              {task.status}
            </span>
            {isOverdue && (
              <span className="px-2 py-1 text-xs font-medium rounded bg-red-100 text-red-800 border border-red-200">
                Overdue
              </span>
            )}
          </div>

          {task.description && (
            <p className="text-gray-600 mb-3">{task.description}</p>
          )}

          <div className="flex items-center gap-4 text-sm text-gray-500">
            {task.dueDate && (
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className={isOverdue ? 'text-red-600 font-medium' : ''}>
                  {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                </span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Created {format(new Date(task.createdAt), 'MMM dd, yyyy')}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-4">
          <select
            value={task.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <button
            onClick={() => onEdit(task)}
            className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition"
            title="Edit task"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>

          <button
            onClick={handleDelete}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            title="Delete task"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
