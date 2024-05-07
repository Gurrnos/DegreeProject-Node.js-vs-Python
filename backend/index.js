const express = require('express');
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