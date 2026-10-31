const express = require("express");
const db = require("./db");

const app = express();
const PORT = 3000;

// Middleware to read JSON request bodies
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "BDF Lab 02 - SQLite CRUD API",
    status: "Server is running",
    endpoints: {
      getAllBooks: "GET /books/",
      getBookById: "GET /books/:bookId/",
      addBook: "POST /books/",
      updateBook: "PUT /books/:bookId/",
      deleteBook: "DELETE /books/:bookId/",
    },
  });
});

// GET all books
app.get("/books/", (req, res) => {
  const sql = "SELECT * FROM books";

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        error: "Failed to retrieve books",
      });
    }

    res.status(200).json({
      count: rows.length,
      books: rows,
    });
  });
});

// GET a book by ID
app.get("/books/:bookId/", (req, res) => {
  const bookId = Number(req.params.bookId);

  if (!Number.isInteger(bookId) || bookId < 1) {
    return res.status(400).json({
      error: "Invalid book ID",
    });
  }

  const sql = "SELECT * FROM books WHERE id = ?";

  db.get(sql, [bookId], (err, row) => {
    if (err) {
      return res.status(500).json({
        error: "Failed to retrieve book",
      });
    }

    if (!row) {
      return res.status(404).json({
        error: "Book not found",
      });
    }

    res.status(200).json({
      book: row,
    });
  });
});
// POST a new book
app.post("/books/", (req, res) => {
  const { title, author, publishedYear } = req.body;

  // Validate required fields
  if (
    typeof title !== "string" ||
    !title.trim() ||
    typeof author !== "string" ||
    !author.trim()
  ) {
    return res.status(400).json({
      error: "Title and author are required",
    });
  }

  // Validate published year if provided
  if (
    publishedYear !== undefined &&
    (!Number.isInteger(publishedYear) || publishedYear < 0)
  ) {
    return res.status(400).json({
      error: "Published year must be a non-negative integer",
    });
  }

  const sql = `
    INSERT INTO books (title, author, publishedYear)
    VALUES (?, ?, ?)
  `;

  db.run(
    sql,
    [title.trim(), author.trim(), publishedYear ?? null],
    function (err) {
      if (err) {
        return res.status(500).json({
          error: "Failed to add book",
        });
      }

      res.status(201).json({
        message: "Book added successfully",
        book: {
          id: this.lastID,
          title: title.trim(),
          author: author.trim(),
          publishedYear: publishedYear ?? null,
        },
      });
    }
  );
});
 // PUT — Update a book by ID
app.put("/books/:bookId/", (req, res) => {
  const bookId = Number(req.params.bookId);
  const { title, author, publishedYear } = req.body;

  if (!Number.isInteger(bookId) || bookId < 1) {
    return res.status(400).json({
      error: "Invalid book ID",
    });
  }

  if (
    typeof title !== "string" ||
    !title.trim() ||
    typeof author !== "string" ||
    !author.trim()
  ) {
    return res.status(400).json({
      error: "Title and author are required",
    });
  }

  if (
    publishedYear !== undefined &&
    (!Number.isInteger(publishedYear) || publishedYear < 0)
  ) {
    return res.status(400).json({
      error: "Published year must be a non-negative integer",
    });
  }

  const sql = `
    UPDATE books
    SET title = ?, author = ?, publishedYear = ?
    WHERE id = ?
  `;

  db.run(
    sql,
    [title.trim(), author.trim(), publishedYear ?? null, bookId],
    function (err) {
      if (err) {
        return res.status(500).json({
          error: "Failed to update book",
        });
      }

      if (this.changes === 0) {
        return res.status(404).json({
          error: "Book not found",
        });
      }

      res.status(200).json({
        message: "Book updated successfully",
        book: {
          id: bookId,
          title: title.trim(),
          author: author.trim(),
          publishedYear: publishedYear ?? null,
        },
      });
    }
  );
});
 // DELETE a book by ID
app.delete("/books/:bookId/", (req, res) => {
  const bookId = Number(req.params.bookId);

  if (!Number.isInteger(bookId) || bookId < 1) {
    return res.status(400).json({
      error: "Invalid book ID",
    });
  }

  const sql = "DELETE FROM books WHERE id = ?";

  db.run(sql, [bookId], function (err) {
    if (err) {
      return res.status(500).json({
        error: "Failed to delete book",
      });
    }

    if (this.changes === 0) {
      return res.status(404).json({
        error: "Book not found",
      });
    }

    res.status(200).json({
      message: "Book deleted successfully",
      deletedBookId: bookId,
    });
  });
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});