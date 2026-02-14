import React, { createContext, useContext, useState, useEffect } from 'react';
import { tasksAPI } from '../utils/api';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    search: '',
    sortBy: 'date',
    sortOrder: 'desc',
  });
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    }
  }, [isAuthenticated, filters]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.status) params.status = filters.status;
      if (filters.priority) params.priority = filters.priority;
      if (filters.search) params.search = filters.search;
      if (filters.sortBy) params.sortBy = filters.sortBy;
      if (filters.sortOrder) params.sortOrder = filters.sortOrder;

      const response = await tasksAPI.getAll(params);
      setTasks(response.data.tasks || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    try {
      const response = await tasksAPI.create(taskData);
      setTasks([response.data.task, ...tasks]);
      toast.success('Task created successfully!');
      return { success: true, task: response.data.task };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create task';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const response = await tasksAPI.update(id, taskData);
      setTasks(tasks.map((task) => (task._id === id ? response.data.task : task)));
      toast.success('Task updated successfully!');
      return { success: true, task: response.data.task };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update task';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const deleteTask = async (id) => {
    try {
      await tasksAPI.delete(id);
      setTasks(tasks.filter((task) => task._id !== id));
      toast.success('Task deleted successfully!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete task';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const updateFilters = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      priority: '',
      search: '',
      sortBy: 'date',
      sortOrder: 'desc',
    });
  };

  const value = {
    tasks,
    loading,
    filters,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    updateFilters,
    clearFilters,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
