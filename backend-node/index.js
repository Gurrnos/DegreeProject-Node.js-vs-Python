const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const db = require("better-sqlite3")("node-database.db");

app.use(
  require("cors")({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

db.prepare(
  "CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY, username TEXT NOT NULL UNIQUE, password TEXT NOT NULL)"
).run();

app.post("/Login", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const findUserStmt = db.prepare("SELECT * FROM Users WHERE username = ?");

  const user = findUserStmt.get(username);

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  if (password !== user.password) {
    return res.status(401).json({ message: "Invalid username or password "});
  }

  res.json({ message: "Hello", username: username })
});

app.post("/Signup", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const createUserStmt = db.prepare("INSERT INTO Users (username, password) VALUES (?, ?)")

  createUserStmt.run(username, password);

  res.send("User created successfully");
});

app.listen(8080, () =>
  console.log("Server is running on http://localhost:" + 8080)
);
