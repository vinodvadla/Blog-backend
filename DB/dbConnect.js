const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Blog-Aplication",
    });
    console.log("database connected");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDb;
