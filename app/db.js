envVar = process.env;

const mysql = require("mysql");
const db = mysql.createConnection({
  host: envVar.DB_HOST,
  port: envVar.DB_PORT,
  user: envVar.DB_USER,
  password: envVar.DB_PASSWORD,
  database: envVar.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.log("Error connecting to database");

    throw err;
  }
  console.log("Connected to database");
});

db.query("SHOW TABLES LIKE 'access_log'", (err, result) => {
  if (err) {
    console.log("Error checking if table exists");

    throw err;
  }

  if (result.length === 0) {
    console.log("Table does not exist");
    db.query(
      `CREATE TABLE access_log (
        id INT AUTO_INCREMENT PRIMARY KEY, 
        timestamp DATETIME, 
        ip VARCHAR(255), 
        method VARCHAR(255), 
        path VARCHAR(255), 
        user_agent VARCHAR(255))`,
      (err, result) => {
        if (err) {
          console.log("Error creating table");

          throw err;
        }
        console.log("Table created");
      }
    );
  }
});

const insertIntoTable = (ip, method, path, user_agent) => {
  db.query(
    "INSERT INTO access_log (timestamp, ip, method, path, user_agent) VALUES (CURRENT_TIMESTAMP, ?, ?, ?, ?)",
    [ip, method, path, user_agent],
    (err, result) => {
      if (err) {
        console.log("Error inserting into table");

        throw err;
      }
      console.log("Inserted into table");
    }
  );
};

exports.insertIntoTable = insertIntoTable;
