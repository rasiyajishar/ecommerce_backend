
const express = require("express");
const mongoose = require("mongoose");
const usercontroller = require("./Controller/usercontroller");
const cookieParser=require("cookie-parser")
const app = express();
const port = 4000;

app.use(express.json());
app.use(cookieParser());
mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error.message);
  });

app.post("/register", usercontroller.register);

app.listen(port, () => {
  console.log("Server is running on port", port);
});
