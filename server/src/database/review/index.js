import mongoose from "mongoose";
const ReviewSchema = new mongoose.Schema(
  {
    food: { type: mongoose.Types.ObjectId, ref: "foods" },
    restaurant: { type: mongoose.Types.ObjectId, ref: "restaurants" },
    rating: { type: Number, required: true },
    reviewText: { type: String, required: true },
    isrestaurantreview: Boolean,
    isFoodreview: Boolean,
    photos: { type: mongoose.Types.ObjectId, ref: "images" },
  },
  {
    timestamps: true,
  }
);
export const ReviewModel = mongoose.model("reviews", ReviewSchema);
