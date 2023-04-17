const app = require("./app");
const dotenv = require("dotenv");
const databaseConnect = require("./config/database.js");

// config
dotenv.config({ path: "config/config.env" });

// databse connect
databaseConnect();
// server connection
app.listen(process.env.PORT, () => {
  console.log(`server is  working on http://localhost:${process.env.PORT}`);
});
