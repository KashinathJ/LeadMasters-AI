const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/tasks
// @desc    Get all tasks for authenticated user with filtering, search, and sorting
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { status, priority, search, sortBy, sortOrder } = req.query;
    const userId = req.user._id;

    // Build query
    const query = { userId };

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by priority
    if (priority) {
      query.priority = priority;
    }

    // Search by title
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    // Build sort object
    let sort = {};
    if (sortBy) {
      const order = sortOrder === 'desc' ? -1 : 1;
      switch (sortBy) {
        case 'date':
          sort.createdAt = order;
          break;
        case 'priority':
          // Custom priority order: High > Med > Low
          sort.priority = order;
          break;
        case 'dueDate':
          sort.dueDate = order;
          break;
        default:
          sort.createdAt = -1;
      }
    } else {
      sort.createdAt = -1; // Default: newest first
    }

    // Execute query
    const tasks = await Task.find(query).sort(sort);

    res.json({
      count: tasks.length,
      tasks
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ message: 'Server error fetching tasks', error: error.message });
  }
});

// @route   GET /api/tasks/:id
// @desc    Get a single task by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ message: 'Server error fetching task', error: error.message });
  }
});

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, priority, status, dueDate } = req.body;

    // Validation
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const task = new Task({
      title,
      description: description || '',
      priority: priority || 'Med',
      status: status || 'Todo',
      dueDate: dueDate || null,
      userId: req.user._id
    });

    await task.save();

    res.status(201).json({
      message: 'Task created successfully',
      task
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ message: 'Server error creating task', error: error.message });
  }
});

// @route   PUT /api/tasks/:id
// @desc    Update a task
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, description, priority, status, dueDate } = req.body;

    const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update fields
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (priority !== undefined) task.priority = priority;
    if (status !== undefined) task.status = status;
    if (dueDate !== undefined) task.dueDate = dueDate;

    await task.save();

    res.json({
      message: 'Task updated successfully',
      task
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ message: 'Server error updating task', error: error.message });
  }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({
      message: 'Task deleted successfully',
      task
    });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ message: 'Server error deleting task', error: error.message });
  }
});

module.exports = router;
