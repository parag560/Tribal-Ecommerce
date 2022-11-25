const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema(
  {
    userid: { type: String, required: true },
    productid: { type: String, required: true },
    rating: { type: Number, required: true }
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rating", RatingSchema);