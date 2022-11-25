const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
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
        sailerId:{
          type:String,
      },
      },
    ],
    amount: { type: Number, required: true },
   
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);