const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const user = require("./models/user");

app.use(cors());
app.use(express.json());
// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://itscharanteja:BMS@blogposts.xrydnwa.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  });

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    await user.create({ email, password }).then((user) => {
      console.log(user);
      res.status(201).json({ message: "User registered successfully" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await user.findOne({ email, password });
    if (userFound) {
      res.status(200).json({ message: "User logged in successfully" });
    } else {
      res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
