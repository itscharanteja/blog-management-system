const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const user = require("./models/user");
const post = require("./models/post");
const multer = require("multer");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");

const salt = bcrypt.genSaltSync(10);
const secret = "sadfdsfgdfsggh234";

// Set the maximum payload size to 10MB
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookie());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.3"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  });

// Define storage for multer
const upload = multer({ dest: "uploads/" });

//Route for getting all posts
app.get("/", async (req, res) => {
  const posts = await post.find();
  res.json(posts);
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, secret, {}, (err, info) => {
      if (err) console.log("error");
      res.json(info);
    });
  } else {
    console.log("Not authorized");
  }
});

// Route for registering a new user
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    await user
      .create({ email, password: bcrypt.hashSync(password, salt) })
      .then((user) => {
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
    const userFound = await user.findOne({ email });
    const passOk = await bcrypt.compare(password, userFound.password);
    if (passOk) {
      jwt.sign({ email, id: userFound._id }, secret, {}, (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json("ok");
      });
    } else {
      res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//Route for Loging Out
app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

// Route for creating a new post
app.post("/newpost", upload.single("file"), async (req, res) => {
  const { originalname, buffer } = req.file;
  const ext = originalname.split(".")[1];
  const newPath = path + "." + ext;
  const { title, content } = req.body;
  const postDoc = await post.create({ title, content, image: buffer });
  fs.renameSync(path, newPath);
  res.json(postDoc);
});

app.delete("/delete/:postId", async (req, res) => {
  const postId = req.params.postId;
  async function deletePost(id) {
    await post.deleteOne({ _id: id });
  }
  try {
    await deletePost(postId);
    res.status(200).json({ message: "Post deleted succesfully" });
  } catch (err) {
    console.log(err);
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
