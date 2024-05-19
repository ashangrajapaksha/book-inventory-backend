const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

const MONGODB_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;

const dbConnect = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("MongoDB Connected Successfully!");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("MongoDB Connection faild", error);
  }
};

dbConnect();
