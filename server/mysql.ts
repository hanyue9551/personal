const mysql = require("mysql");

const db = mysql.createPool({
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "123456",
  database: "personal_db",
});

module.exports = db;
