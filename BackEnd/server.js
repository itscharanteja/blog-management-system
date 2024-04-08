const mongoose = require("mongoose");

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://itscharanteja:bms@blogposts.xrydnwa.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    // Start your application logic here
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
