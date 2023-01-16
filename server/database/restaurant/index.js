import mongoose from "mongoose";
const RestaurantSchema = new mongoose.Schema(
  {
    name: { type: String, reqired: true },
    city: { type: String, reqired: true },
    address: { type: String, reqired: true },
    mapLocation: { type: String, reqired: true },
    cuisine: [String],
    RestaurantTiming: String,
    contactNumner: Number,
    website: String,
    popularDishes: [String],
    averageCost: Number,
    amenties: [String],
    menuImages: {
      type: mongoose.Types.ObjectId,
      ref: "images",
    },
    menu: {
      type: mongoose.Types.ObjectId,
      ref: "menus",
    },
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "reviews",
      },
    ],
    photos:{
      type: mongoose.Types.ObjectId,
      ref: "images",
    },
  },
  {
    timestamps: true,
  }
);
export const RestaurantModel = mongoose.model("restaurants", RestaurantSchema);
