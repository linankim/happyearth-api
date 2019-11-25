const express = require("express");
const app = express();

require("dotenv").config();
require("./database");

app.listen(4000, () => {
  console.log("Ready on Port 4000");
});
