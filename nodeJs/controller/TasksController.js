const { Model } = require('../models/Model');

class TaskController {
  static async getAllTasks(req, res) {
    await Model.getAllTasks((err, tasks) => {
      if (err) {
        res.status(500).json({
          message: 'Internal Server Error',
          serverMessage: err,
        });
      } else {
        res.status(200).json({
          message: 'Successfully read all tasks',
          tasks,
        });
      }
    });
  }

  static async createTasks(req, res) {
    let { title, descriptions, completed = false } = req.body;
    await Model.createTasks(title, descriptions, completed, (err) => {
      if (err) {
        err.map((el) => {
          if (el === 'Completed default must false' || el === 'Title must be filled' || el === 'Descriptions must be filled') {
            res.status(401).json({
              serverMessage: el,
            });
          } else {
            res.status(500).json({
              message: 'Internal Server Error',
            });
          }
        });
      } else {
        res.status(201).json({
          message: 'Success Create Task',
          data: req.body,
        });
      }
    });
  }

  static async getTasksById(req, res) {
    const { id } = req.params;

    await Model.getTasksById(+id, (err, tasks) => {
      if (err) {
        res.status(500).json({
          message: 'Internal Server Error',
          serverMessage: err,
        });
      } else {
        res.status(200).json({
          message: 'Successfully update tasks by id',
          tasks,
        });
      }
    });
  }

  static async updateTasksById(req, res) {
    const { id } = req.params;
    const { title, descriptions, completed } = req.body;

    await Model.updateTasksById(+id, title, descriptions, completed, (err) => {
      if (err) {
        res.status(500).json({
          message: 'Internal Server Error',
          serverMessage: err,
        });
      } else {
        res.status(200).json({
          message: 'Successfully read tasks by id',
          data: req.body,
        });
      }
    });
  }

  static async deleteTaskById(req, res) {
    const { id } = req.params;

    await Model.deleteTaskById(+id, (err) => {
      if (err) {
        res.status(500).json({
          message: 'Internal Server Error',
          serverMessage: err,
        });
      } else {
        res.status(200).json({
          message: 'Successfully read tasks by id',
          data: req.body,
        });
      }
    });
  }
}

module.exports = TaskController;
