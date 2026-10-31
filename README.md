# BDF Lab 02: SQLite Database and CRUD API

## Overview

This project demonstrates how to build a REST API using Node.js, Express.js, and SQLite. It implements CRUD (Create, Read, Update, and Delete) operations for managing book records.

## Objectives

- Connect an Express.js application to an SQLite database.
- Implement REST API routes for CRUD operations.
- Use parameterized SQL queries.
- Validate incoming request data.
- Handle errors and return appropriate HTTP status codes.

## Technologies Used

- Node.js
- Express.js
- SQLite
- SQLite3
- Postman

## Project Structure

```text
bdf-lab-02-sqlite-crud/
├── app.js
├── db.js
├── seed.js
├── books.db
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Installation

### 1. Install dependencies

```bash
npm install
```

### 2. Insert sample data

```bash
node seed.js
```

Run the seed script only when you want to insert the sample records.

### 3. Start the server

```bash
node app.js
```

The API runs at:

`http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Display API information |
| GET | `/books/` | Retrieve all books |
| GET | `/books/:bookId/` | Retrieve a book by ID |
| POST | `/books/` | Add a new book |
| PUT | `/books/:bookId/` | Update an existing book |
| DELETE | `/books/:bookId/` | Delete a book |

## Sample POST Request

**Endpoint:** `POST /books/`

```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "publishedYear": 2008
}
```

## Error Handling

The API handles invalid IDs, missing books, invalid input, and database errors with appropriate HTTP status codes.

## Testing

API endpoints can be tested using Postman.

## Deployment Status

The application is designed to run locally with SQLite. Cloud deployment has not been configured.

## Learning Outcomes

- Developed a REST API using Express.js.
- Connected an application to an SQLite database.
- Implemented CRUD operations.
- Practiced parameterized SQL queries.
- Tested API responses using Postman.