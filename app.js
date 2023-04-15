const express = require("express");
const app = express();
// accept json data
app.use(express.json());

// import routes
const product = require("./routes/productRoute");

app.use("/api/v1", product);

module.exports = app;
