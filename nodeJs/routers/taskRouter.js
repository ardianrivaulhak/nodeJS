const express = require('express');
const TasksController = require('../controller/TasksController');
const tasksRouter = express.Router();

tasksRouter.get('/tasks', TasksController.getAllTasks);
tasksRouter.post('/tasks', TasksController.createTasks);
tasksRouter.get(`/tasks/:id`, TasksController.getTasksById);
tasksRouter.put(`/tasks/:id`, TasksController.updateTasksById);
tasksRouter.delete(`/tasks/:id`, TasksController.deleteTaskById);

module.exports = tasksRouter;
