const express = require('express');
const TasksController = require('../controller/TasksController');
const tasksRouter = express.Router();

tasksRouter.get('/', TasksController.getAllTasks);
tasksRouter.post('/add', TasksController.createTasks);
tasksRouter.get(`/tasks/:id`, TasksController.getTasksById);
tasksRouter.patch(`/tasks/:id`, TasksController.updateTasksById);
tasksRouter.delete(`/tasks/:id`, TasksController.deleteTaskById);

module.exports = tasksRouter;
