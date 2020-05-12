const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST || '127.0.0.1',
  user: 'root',
  password: 'dbpass',
  database: 'docsis_modem'
});

module.exports = {connection};