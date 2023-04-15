const app = require("./app");
const dotenv = require("dotenv");

// config
dotenv.config({ path: "config/config.env" });
// server connection
app.listen(process.env.PORT, () => {
  console.log(`server is  working on http://localhost:${process.env.PORT}`);
});
