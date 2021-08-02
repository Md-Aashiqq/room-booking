import mongoose from "mongoose";

const { Schema, model } = mongoose;

const roomSchema = Schema({
  name: {
    type: String,
    required: [true, "A Room must have a name"],
    unique: true,
    trim: true,
    maxlength: [40, "A Room name must have less or equal then 40 characters"],
    minlength: [10, "A Room name must have more or equal then 10 characters"],
    // validate: [validator.isAlpha, 'Tour name must only contain characters']
  },
  maxMemberSize: {
    type: Number,
    required: [true, "A Room must have a group size"],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, "Rating must be above 1.0"],
    max: [5, "Rating must be below 5.0"],
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "A Room must have a price"],
  },
  summary: {
    type: String,
    trim: true,
    required: [true, "A Room  must have a description"],
  },
  description: {
    type: String,
    trim: true,
  },
  imagesURL: String,
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  location: {
    type: String,
  },

  avalRooms: {
    type: [Object],
  },
});

const Room = model("Room", roomSchema);

export default Room;
