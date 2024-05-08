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

app.post("/Login", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  console.log("username:", username, "password:", password)
});

app.listen(8080, () =>
  console.log("Server is running on http://localhost:" + 8080)
);
