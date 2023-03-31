const mysql = require('mysql2');

const dbPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'mysql',
  database: 'testNodeJS',
});

module.exports = dbPool;
