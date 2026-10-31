require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { FundsModel } = require("./model/FundsModel");
const { UserModel } = require("./model/UserModel");
const authRoute = require("./routes/AuthRoute");
const { requireAuth } = require("./middlewares/AuthMiddleware");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

// Cookies only work with a specific origin plus credentials: true
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/auth", authRoute);

// Get the single funds document, creating it with starting values the first time
const getFunds = async () => {
  let funds = await FundsModel.findOne({});
  if (!funds) {
    funds = await FundsModel.create({
      balance: 4043.1,
      usedMargin: 3757.3,
      openingBalance: 4043.1,
    });
  }
  return funds;
};

// Validate and round an amount to 2 decimals
const parseAmount = (value) => {
  const amount = Math.round(Number(value) * 100) / 100;
  return Number.isFinite(amount) && amount > 0 ? amount : null;
};

app.get("/allHoldings", async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
});

app.get("/allPositions", async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({});
    res.json(allPositions);
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
});

// Only signed-in users can buy or sell
app.post("/newOrder", requireAuth, async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body || {};
    const quantity = Number(qty);
    const orderPrice = Number(price);

    if (typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ message: "Stock name is required" });
    }
    if (mode !== "BUY" && mode !== "SELL") {
      return res.status(400).json({ message: "Mode must be BUY or SELL" });
    }
    if (!Number.isInteger(quantity) || quantity < 1) {
      return res
        .status(400)
        .json({ message: "Quantity must be a whole number, 1 or more" });
    }
    if (!Number.isFinite(orderPrice) || orderPrice <= 0) {
      return res.status(400).json({ message: "Price must be greater than 0" });
    }

    const newOrder = new OrdersModel({
      name: name.trim(),
      qty: quantity,
      price: orderPrice,
      mode,
      username: req.user.username,
      userId: req.user._id,
    });
    await newOrder.save();

    res.json({ success: true, message: "Order saved!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save order" });
  }
});

app.get("/allOrders", async (req, res) => {
  try {
    const allOrders = await OrdersModel.find({});
    res.json(allOrders);
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
});

// ---------- FUNDS ----------
// Anyone can view the funds page
app.get("/funds", async (req, res) => {
  try {
    res.json(await getFunds());
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load funds" });
  }
});

// Only signed-in users can add funds
app.post("/funds/add", requireAuth, async (req, res) => {
  try {
    const amount = parseAmount(req.body.amount);
    if (!amount) {
      return res.status(400).json({ message: "Enter a valid amount" });
    }

    await getFunds();
    const updated = await FundsModel.findOneAndUpdate(
      {},
      {
        $inc: { balance: amount, payin: amount },
        $push: {
          transactions: {
            type: "ADD",
            amount,
            username: req.user.username,
            userId: req.user._id,
          },
        },
      },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add funds" });
  }
});

// Only signed-in users can withdraw funds
app.post("/funds/withdraw", requireAuth, async (req, res) => {
  try {
    const amount = parseAmount(req.body.amount);
    if (!amount) {
      return res.status(400).json({ message: "Enter a valid amount" });
    }

    await getFunds();
    const updated = await FundsModel.findOneAndUpdate(
      { balance: { $gte: amount } },
      {
        $inc: { balance: -amount, payout: amount },
        $push: {
          transactions: {
            type: "WITHDRAW",
            amount,
            username: req.user.username,
            userId: req.user._id,
          },
        },
      },
      { new: true }
    );

    if (!updated) {
      return res.status(400).json({ message: "Insufficient funds" });
    }
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to withdraw funds" });
  }
});

app.listen(PORT, () => {
  console.log("App started!");
  mongoose
    .connect(uri)
    .then(async () => {
      console.log("DB started!");
      // Remove leftover indexes (like the old unique email one) so signups work
      const dropped = await UserModel.syncIndexes();
      console.log("User indexes synced. Dropped:", dropped);
    })
    .catch((err) => console.error("DB connection failed:", err));
});