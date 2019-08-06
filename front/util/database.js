const mysql = require('mysql2');

const pool = mysql.createPool({
  host: '192.168.10.2',
  user: 'free',
  password: '',
  database: 'olx'
});

module.exports = pool.promise();
