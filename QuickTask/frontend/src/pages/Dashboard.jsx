import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import { analyticsAPI } from '../utils/api';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

const Dashboard = () => {
  const { user } = useAuth();
  const { tasks } = useTasks();
  const [stats, setStats] = useState(null);
  const [productivity, setProductivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [groupBy, setGroupBy] = useState('day');

  useEffect(() => {
    fetchAnalytics();
  }, [user, groupBy]);

  const fetchAnalytics = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      const [statsRes, productivityRes] = await Promise.all([
        analyticsAPI.getUserStats(user.id),
        analyticsAPI.getProductivityAnalysis(user.id, groupBy),
      ]);

      setStats(statsRes.data);
      setProductivity(productivityRes.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#0ea5e9', '#3b82f6', '#6366f1'];
  const PRIORITY_COLORS = {
    High: '#ef4444',
    Med: '#f59e0b',
    Low: '#10b981',
  };

  const statusColors = {
    Todo: '#6b7280',
    'In Progress': '#3b82f6',
    Completed: '#10b981',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const priorityData = stats?.priorityDistribution
    ? Object.entries(stats.priorityDistribution).map(([name, value]) => ({
        name,
        value,
      }))
    : [];

  const statusData = stats?.statusDistribution
    ? Object.entries(stats.statusDistribution).map(([name, value]) => ({
        name,
        value,
      }))
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back, {user?.name}!</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Tasks</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {stats?.totalTasks || tasks.length}
              </p>
            </div>
            <div className="bg-primary-100 rounded-full p-3">
              <svg
                className="w-8 h-8 text-primary-600"
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
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed Tasks</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {stats?.completedTasks || tasks.filter((t) => t.status === 'Completed').length}
              </p>
            </div>
            <div className="bg-green-100 rounded-full p-3">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completion Rate</p>
              <p className="text-3xl font-bold text-primary-600 mt-2">
                {stats?.completionPercentage || 0}%
              </p>
            </div>
            <div className="bg-primary-100 rounded-full p-3">
              <svg
                className="w-8 h-8 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Tasks</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">
                {tasks.filter((t) => t.status !== 'Completed').length}
              </p>
            </div>
            <div className="bg-orange-100 rounded-full p-3">
              <svg
                className="w-8 h-8 text-orange-600"
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
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Priority Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Tasks by Priority</h2>
          {priorityData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PRIORITY_COLORS[entry.name] || COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-8">No data available</p>
          )}
        </div>

        {/* Status Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Tasks by Status</h2>
          {statusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#0ea5e9">
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={statusColors[entry.name] || '#0ea5e9'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-8">No data available</p>
          )}
        </div>
      </div>

      {/* Productivity Analysis */}
      {productivity && productivity.trends && productivity.trends.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Productivity Trends</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setGroupBy('day')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  groupBy === 'day'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Daily
              </button>
              <button
                onClick={() => setGroupBy('week')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  groupBy === 'week'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Weekly
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={productivity.trends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="completedTasks" stroke="#10b981" name="Completed" />
              <Line type="monotone" dataKey="createdTasks" stroke="#3b82f6" name="Created" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
