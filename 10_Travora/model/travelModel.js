import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    packageName: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    startDate: Date,
    endDate: Date,
    duration: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    packageType: String,
    packageImage: {
      type: String,
      required: true,
    },
    cloudinary_id: String,
  },
  { timestamps: true },
);

const travelPackage =
  mongoose.models.TravelPackage ||
  mongoose.model("TravelPackage", packageSchema);

export default travelPackage;