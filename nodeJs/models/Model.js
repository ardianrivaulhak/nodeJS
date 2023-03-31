const dbPool = require('../config/dbPool');

class Model {
  static getAllTask(callback) {
    const query = 'SELECT * FROM tasks t';

    dbPool.execute(query, (err, rows) => {
      if (err) {
        callback(err);
      } else {
        callback(null, rows);
      }
    });
  }

  static createTask(title, descriptions, completed, callback) {
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

  static validationForm(title, descriptions, completed) {
    let errors = [];
    if (!title) {
      errors.push('Title must be filled');
    }

    if (!descriptions) {
      errors.push('Descriptions must be filled');
    }

    if (completed === true) {
      errors.push('Completed default must false');
    }

    return errors;
  }
}

module.exports = {
  Model,
};
