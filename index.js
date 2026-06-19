require("dotenv").config();

// import external modules
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// import internal modules
const userRoute = require("./routes/user");
const hotelRoute = require("./routes/hotel");
const roomRoute = require("./routes/room");
const blogRoute = require("./routes/blog");

const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// debug env
console.log("Mongo URI:", process.env.MONGO_URI);

// mongoose settings
mongoose.set("strictQuery", false);

// database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Database Error:", err.message);
  });

// routes
app.use("/api", userRoute);
app.use("/api", hotelRoute);
app.use("/api", roomRoute);
app.use("/api", blogRoute);

// home route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server running...",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "URL not Found",
  });
});

// error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message || "Internal Server Error",
  });
});

const port = process.env.PORT || 5000;

// start server
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});