require("dotenv").config();
const mongoose = require("mongoose");
const Room = require("./models/roomModel");

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Mongo Connected");

    // delete old rooms
    await Room.deleteMany({});

    // insert new rooms
    await Room.insertMany([
      {
        title: "Deluxe Room",
        price: 2500,
        maxPeople: 2,
        desc: [
          "Air conditioning",
          "Free WiFi",
          "Sea view",
          "King size bed"
        ],
        roomNumbers: [
          {
            number: 101,
            unavailableDates: [new Date("2026-06-20"), new Date("2026-06-22")]
          },
          {
            number: 102,
            unavailableDates: []
          }
        ],
        facilities: ["WiFi", "TV", "AC", "Mini Bar"]
      },
      {
        title: "Family Suite",
        price: 4500,
        maxPeople: 4,
        desc: [
          "2 bedrooms",
          "Living room",
          "Balcony",
          "City view"
        ],
        roomNumbers: [
          {
            number: 201,
            unavailableDates: [new Date("2026-06-25")]
          },
          {
            number: 202,
            unavailableDates: []
          }
        ],
        facilities: ["WiFi", "TV", "AC", "Kitchen", "Balcony"]
      },
      {
        title: "Budget Room",
        price: 1500,
        maxPeople: 2,
        desc: [
          "Basic room",
          "Free WiFi",
          "Attached bathroom"
        ],
        roomNumbers: [
          {
            number: 301,
            unavailableDates: []
          },
          {
            number: 302,
            unavailableDates: []
          }
        ],
        facilities: ["WiFi", "Fan", "Bathroom"]
      }
    ]);

    console.log("Rooms inserted successfully");
    process.exit();
  })
  .catch((err) => {
    console.log("Error:", err.message);
  });