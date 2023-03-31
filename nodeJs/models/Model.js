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

module.exports = {
  Model,
};
