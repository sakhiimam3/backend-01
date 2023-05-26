const express = require("express");
const cors = require('cors');

const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware=require("./middleware/error")
// accept json data
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// import routes
const product = require("./routes/productRoutes");
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoutes");


app.use("/api/v1", product);
app.use("/api/v1", order);
app.use("/api/v1", user);



// Middleware for Errors
app.use(errorMiddleware);
module.exports = app;
