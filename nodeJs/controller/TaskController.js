const { Model } = require('../models/Model');

class TaskController {
  static async getAllTask(req, res) {
    await Model.getAllTask((err, tasks) => {
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

  static async createTask(req, res) {
    const { title, descriptions, completed } = req.body;
    await Model.createTask(title, descriptions, completed, (err) => {
      if (err) {
        res.status(500).json({
          message: 'Internal Server Error',
          serverMessage: err,
        });
      } else {
        res.status(201).json({
          message: 'Success Create Task',
        });
      }
    });
  }
}

module.exports = TaskController;
