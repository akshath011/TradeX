const { Schema } = require("mongoose");

const OrdersSchema = new Schema({
  name: String,
  qty: Number,
  price: Number,
  mode: String, // "BUY" or "SELL"
  username: String, // who placed the order
  userId: { type: Schema.Types.ObjectId, ref: "user" },
});

module.exports = { OrdersSchema };