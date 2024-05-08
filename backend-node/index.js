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

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(8080, () =>
  console.log("Server is running on http://localhost:" + 8080)
);
