const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Create or connect to the SQLite database
const dbPath = path.join(__dirname, "books.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error connecting to database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

// Create the books table
db.run(`
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    publishedYear INTEGER
  )
`, (err) => {
  if (err) {
    console.error("Error creating books table:", err.message);
  } else {
    console.log("Books table is ready.");
  }
});

module.exports = db;