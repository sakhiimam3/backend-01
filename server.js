const app = require("./app");
const dotenv = require("dotenv");

const databaseConnect = require("./config/database.js");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// config
dotenv.config({ path: "config/config.env" });

// databse connect
databaseConnect();
// server connection
const server =  app.listen(process.env.PORT, () => {
  console.log(`server is  working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});