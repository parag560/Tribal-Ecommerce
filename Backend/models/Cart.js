const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    customerId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        color:{
            type:String,
        },
        title:{
            type:String,
        },
        size:{
            type:String,
        },
        price:{ type: Number},
        sailerId:{
          type:String,
      },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);