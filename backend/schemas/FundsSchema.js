const { Schema } = require("mongoose");

const FundsSchema = new Schema({
  balance: { type: Number, default: 0 },
  usedMargin: { type: Number, default: 0 },
  openingBalance: { type: Number, default: 0 },
  payin: { type: Number, default: 0 },
  payout: { type: Number, default: 0 },
  transactions: [
    {
      type: { type: String }, // "ADD" or "WITHDRAW"
      amount: Number,
      username: String, // who made the transaction
      userId: { type: Schema.Types.ObjectId, ref: "user" },
      date: { type: Date, default: Date.now },
    },
  ],
});

module.exports = { FundsSchema };