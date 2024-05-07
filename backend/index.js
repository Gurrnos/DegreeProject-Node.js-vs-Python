const express = require('express');
require('dotenv').config();
const jwt = require("jsonwebtoken");
const app = express();


app.use(
  require("cors")({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());


app.listen(8080, () =>
  console.log("Server is running on http://localhost:" + 8080)
);