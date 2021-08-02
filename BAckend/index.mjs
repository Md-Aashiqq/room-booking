import dotenv from "dotenv";
dotenv.config();
import express from "express";
import RoomRoute from "./Routes/Room.mjs";
import mongoose from "mongoose";

import cors from "cors";
import UserRoute from "./Routes/UserRoute.mjs";
import BookingRoute from "./Routes/BookingRoute.mjs";

const DB =
  "mongodb+srv://admin-ashick:md.aashiq.2801@cluster0.vce2n.mongodb.net/RoomBooking?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connection successful!"));

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;

app.use("/", RoomRoute);
app.use("/user", UserRoute);
app.use("/booking", BookingRoute);

app.listen(3001, () => {
  console.log(`App run on port ${port}`);
});
