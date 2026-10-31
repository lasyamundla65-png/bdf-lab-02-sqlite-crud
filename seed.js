const db = require("./db");

const books = [
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    publishedYear: 1988,
  },
  {
    title: "Wings of Fire",
    author: "A. P. J. Abdul Kalam",
    publishedYear: 1999,
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    publishedYear: 2018,
  },
];

db.serialize(() => {
  const sql = `
    INSERT INTO books (title, author, publishedYear)
    VALUES (?, ?, ?)
  `;

  const statement = db.prepare(sql);

  books.forEach((book) => {
    statement.run(
      book.title,
      book.author,
      book.publishedYear
    );
  });

  statement.finalize((err) => {
    if (err) {
      console.error("Error inserting books:", err.message);
    } else {
      console.log("Sample books inserted successfully!");
    }

    db.close((closeErr) => {
      if (closeErr) {
        console.error("Error closing database:", closeErr.message);
      } else {
        console.log("Database connection closed.");
      }
    });
  });
});