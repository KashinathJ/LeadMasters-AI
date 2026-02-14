import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import TaskFilters from '../components/TaskFilters';

const Tasks = () => {
  const { tasks, loading, filters, updateFilters, clearFilters } = useTasks();
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>
          <p className="text-gray-600 mt-1">Manage your tasks efficiently</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition font-medium"
        >
          + New Task
        </button>
      </div>

      <TaskFilters filters={filters} updateFilters={updateFilters} clearFilters={clearFilters} />

      {showForm && (
        <TaskForm
          task={editingTask}
          onClose={handleFormClose}
          onSuccess={() => {
            handleFormClose();
          }}
        />
      )}

      <TaskList loading={loading} tasks={tasks} onEdit={handleEdit} />
    </div>
  );
};

export default Tasks;
