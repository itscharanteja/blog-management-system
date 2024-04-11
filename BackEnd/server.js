const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const user = require("./models/user");
const post = require("./models/post");
const multer = require("multer");
const path = require("path");

// Set the maximum payload size to 10MB
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.3"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  });

// Define storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
const upload = multer({ storage: storage });

// Route for registering a new user
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

// Route for user login
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

// Route for creating a new post
app.post("/newpost", upload.single("file"), async (req, res) => {
  // console.log(req.file); // This will log the uploaded file details
  res.json({ message: "File uploaded successfully" });
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
