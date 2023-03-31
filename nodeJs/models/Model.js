const dbPool = require('../config/dbPool');

class Model {
  static getAllTasks(callback) {
    const query = 'SELECT * FROM tasks t';

    dbPool.execute(query, (err, rows) => {
      if (err) {
        callback(err);
      } else {
        callback(null, rows);
      }
    });
  }

  static createTasks(title, descriptions, completed, callback) {
    const errors = this.validationForm(title, descriptions, completed);
    if (errors.length) {
      callback(errors);
    } else {
      const query = `
                INSERT INTO tasks (title, descriptions, completed)
                VALUES ('${title}', '${descriptions}', '${completed}');
            `;

      dbPool.execute(query, (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null);
        }
      });
    }
  }

  static getTasksById(id, callback) {
    const query = `SELECT * FROM tasks t WHERE id = ${id} `;

    dbPool.execute(query, (err, rows) => {
      if (err) {
        callback(err);
      } else {
        callback(null, rows);
      }
    });
  }

  static updateTasksById(id, title, descriptions, completed, callback) {
    const query = `UPDATE tasks
    SET title = '${title}', descriptions = '${descriptions}', completed = '${completed}'
    WHERE id = ${id};`;

    dbPool.execute(query, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  }

  static deleteTaskById(id, callback) {
    const query = `DELETE FROM tasks WHERE id = '${id}'`;
    dbPool.execute(query, (err, rows) => {
      if (err) {
        callback(err);
      } else {
        callback(null, rows);
      }
    });
  }

  static validationForm(title, descriptions, completed) {
    let errors = [];
    if (!title) {
      errors.push('Title must be filled');
    }

    if (!descriptions) {
      errors.push('Descriptions must be filled');
    }

    if (completed !== 0) {
      errors.push('Completed default must false');
    }

    return errors;
  }
}

module.exports = {
  Model,
};
