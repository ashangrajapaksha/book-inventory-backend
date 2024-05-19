const express = require("express");
const bodyparser = require("body-parser");

const app = express();
app.use(bodyparser.json());

const bookInventryRoute = require("./routes/inventoryRoute");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/bookInventry", bookInventryRoute);

module.exports = app;
