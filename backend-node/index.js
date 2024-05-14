const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const db = require("better-sqlite3")("node-database.db");
require("dotenv").config();

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
    return res.status(401).json({ message: "Invalid username or password " });
  }

  const jwtToken = jwt.sign(
    { username: user.username },
    process.env.JWT_SECRET
  );

  res.json({ message: "Hello user", token: jwtToken });
});

app.post("/getUser", function (req, res) {
  const token = req.body.token;

  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const username = decoded.username;
    res.status(200).json({ username });
  } catch (error) {
    console.error("Error verifying token:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
});

app.post("/Signup", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const createUserStmt = db.prepare(
    "INSERT INTO Users (username, password) VALUES (?, ?)"
  );

  createUserStmt.run(username, password);

  res.send("User created successfully");
});

app.listen(8080, () =>
  console.log("Server is running on http://localhost:" + 8080)
);
