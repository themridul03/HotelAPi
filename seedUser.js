require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/userModel");

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Mongo Connected");

    // remove old users
    await User.deleteMany({});

    // hash passwords
    const adminPass = await bcrypt.hash("admin123", 10);
    const userPass = await bcrypt.hash("user123", 10);

    // insert users
    await User.insertMany([
      {
        email: "admin@hotel.com",
        password: adminPass,
        fullname: "Admin User",
        username: "admin",
        country: "India",
        image: "https://randomuser.me/api/portraits/men/1.jpg",
        phone: "9876543210",
        fblink: "https://facebook.com/admin",
        twlink: "https://twitter.com/admin",
        isadmin: true,
      },
      {
        email: "john@example.com",
        password: userPass,
        fullname: "John Doe",
        username: "johndoe",
        country: "USA",
        image: "https://randomuser.me/api/portraits/men/2.jpg",
        phone: "9123456780",
        fblink: "https://facebook.com/johndoe",
        twlink: "https://twitter.com/johndoe",
        isadmin: false,
      },
      {
        email: "emma@example.com",
        password: userPass,
        fullname: "Emma Watson",
        username: "emmaw",
        country: "UK",
        image: "https://randomuser.me/api/portraits/women/3.jpg",
        phone: "9988776655",
        fblink: "https://facebook.com/emmaw",
        twlink: "https://twitter.com/emmaw",
        isadmin: false,
      },
    ]);

    console.log("Users inserted successfully");
    process.exit();
  })
  .catch((err) => {
    console.log("Error:", err.message);
  });