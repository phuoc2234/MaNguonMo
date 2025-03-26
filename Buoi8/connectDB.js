const mongoose = require("mongoose");
async function connectMongo() {
  await mongoose.connect("mongodb://127.0.0.1:27017/config");
  console.log("connected!");
}

module.exports = connectMongo;