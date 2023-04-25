const express = require("express");
const app = express();
const errorMiddleware=require("./middleware/error")
// accept json data
app.use(express.json());

// import routes
const product = require("./routes/productRoute");

app.use("/api/v1", product);

// Middleware for Errors
app.use(errorMiddleware);
module.exports = app;
