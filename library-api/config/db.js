require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false
  }
});

db.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Database connected");
  }
});

console.log(process.env.DB_HOST);
console.log(process.env.DB_USER);
console.log("USER:", process.env.DB_USER);
console.log("DB:", process.env.DB_NAME);

module.exports = db;