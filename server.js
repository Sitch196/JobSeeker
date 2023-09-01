const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const mongoose = require("mongoose");
const app = require("./app");

const DB = process.env.DATABASE_HOST;

const getConnection = async () => {
  try {
    await mongoose.connect(DB);
    console.log("DB connection successful");
  } catch (err) {
    console.log(err);
  }
};
getConnection();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
