// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();
// const PORT = process.env.PORT || 3002;
// const url = process.env.MONGO_URL;

// app.use(cors());
// app.use(express.json());

// // Sample holdings for testing the TradeX dashboard
// const allHoldings = [
//   {
//     name: "TCS",
//     qty: 10,
//     avg: 3500,
//     price: 3650,
//     net: "+4.29%",
//     day: "+1.25%"
//   },
//   {
//     name: "INFY",
//     qty: 15,
//     avg: 1450,
//     price: 1520,
//     net: "+4.83%",
//     day: "+0.85%"
//   },
//   {
//     name: "RELIANCE",
//     qty: 5,
//     avg: 2800,
//     price: 2750,
//     net: "-1.79%",
//     day: "-0.50%"
//   },
//   {
//     name: "HDFCBANK",
//     qty: 8,
//     avg: 1600,
//     price: 1680,
//     net: "+5.00%",
//     day: "+0.70%"
//   }
// ];

// // API endpoint used by Holdings.js
// app.get("/allHoldings", (req, res) => {
//   res.json(allHoldings);
// });

// // Basic health check
// app.get("/", (req, res) => {
//   res.send("TradeX backend is running!");
// });

// app.listen(PORT, () => {
//   console.log(`TradeX backend running at http://localhost:${PORT}`);
//   mongoose.connect(url)
//     console.log("Connected MongoDB");
//   });



// //Index.js
// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const { HoldingsModel } = require("./model/HoldingsModel");

// const { PositionsModel } = require("./model/PositionsModel");
// const { OrdersModel } = require("./model/OrdersModel");

// const PORT = process.env.PORT || 3002;
// const uri = process.env.MONGO_URL;

// const app = express();

// app.use(cors());
// app.use(bodyParser.json());

// // app.get("/addHoldings", async (req, res) => {
// //   let tempHoldings = [
// //     {
// //       name: "BHARTIARTL",
// //       qty: 2,
// //       avg: 538.05,
// //       price: 541.15,
// //       net: "+0.58%",
// //       day: "+2.99%",
// //     },
// //     {
// //       name: "HDFCBANK",
// //       qty: 2,
// //       avg: 1383.4,
// //       price: 1522.35,
// //       net: "+10.04%",
// //       day: "+0.11%",
// //     },
// //     {
// //       name: "HINDUNILVR",
// //       qty: 1,
// //       avg: 2335.85,
// //       price: 2417.4,
// //       net: "+3.49%",
// //       day: "+0.21%",
// //     },
// //     {
// //       name: "INFY",
// //       qty: 1,
// //       avg: 1350.5,
// //       price: 1555.45,
// //       net: "+15.18%",
// //       day: "-1.60%",
// //       isLoss: true,
// //     },
// //     {
// //       name: "ITC",
// //       qty: 5,
// //       avg: 202.0,
// //       price: 207.9,
// //       net: "+2.92%",
// //       day: "+0.80%",
// //     },
// //     {
// //       name: "KPITTECH",
// //       qty: 5,
// //       avg: 250.3,
// //       price: 266.45,
// //       net: "+6.45%",
// //       day: "+3.54%",
// //     },
// //     {
// //       name: "M&M",
// //       qty: 2,
// //       avg: 809.9,
// //       price: 779.8,
// //       net: "-3.72%",
// //       day: "-0.01%",
// //       isLoss: true,
// //     },
// //     {
// //       name: "RELIANCE",
// //       qty: 1,
// //       avg: 2193.7,
// //       price: 2112.4,
// //       net: "-3.71%",
// //       day: "+1.44%",
// //     },
// //     {
// //       name: "SBIN",
// //       qty: 4,
// //       avg: 324.35,
// //       price: 430.2,
// //       net: "+32.63%",
// //       day: "-0.34%",
// //       isLoss: true,
// //     },
// //     {
// //       name: "SGBMAY29",
// //       qty: 2,
// //       avg: 4727.0,
// //       price: 4719.0,
// //       net: "-0.17%",
// //       day: "+0.15%",
// //     },
// //     {
// //       name: "TATAPOWER",
// //       qty: 5,
// //       avg: 104.2,
// //       price: 124.15,
// //       net: "+19.15%",
// //       day: "-0.24%",
// //       isLoss: true,
// //     },
// //     {
// //       name: "TCS",
// //       qty: 1,
// //       avg: 3041.7,
// //       price: 3194.8,
// //       net: "+5.03%",
// //       day: "-0.25%",
// //       isLoss: true,
// //     },
// //     {
// //       name: "WIPRO",
// //       qty: 4,
// //       avg: 489.3,
// //       price: 577.75,
// //       net: "+18.08%",
// //       day: "+0.32%",
// //     },
// //   ];

// //   tempHoldings.forEach((item) => {
// //     let newHolding = new HoldingsModel({
// //       name: item.name,
// //       qty: item.qty,
// //       avg: item.avg,
// //       price: item.price,
// //       net: item.day,
// //       day: item.day,
// //     });

// //     newHolding.save();
// //   });
// //   res.send("Done!");
// // });

// // app.get("/addPositions", async (req, res) => {
// //   let tempPositions = [
// //     {
// //       product: "CNC",
// //       name: "EVEREADY",
// //       qty: 2,
// //       avg: 316.27,
// //       price: 312.35,
// //       net: "+0.58%",
// //       day: "-1.24%",
// //       isLoss: true,
// //     },
// //     {
// //       product: "CNC",
// //       name: "JUBLFOOD",
// //       qty: 1,
// //       avg: 3124.75,
// //       price: 3082.65,
// //       net: "+10.04%",
// //       day: "-1.35%",
// //       isLoss: true,
// //     },
// //   ];

// //   tempPositions.forEach((item) => {
// //     let newPosition = new PositionsModel({
// //       product: item.product,
// //       name: item.name,
// //       qty: item.qty,
// //       avg: item.avg,
// //       price: item.price,
// //       net: item.net,
// //       day: item.day,
// //       isLoss: item.isLoss,
// //     });

// //     newPosition.save();
// //   });
// //   res.send("Done!");
// // });

// app.get("/allHoldings", async (req, res) => {
//   let allHoldings = await HoldingsModel.find({});
//   res.json(allHoldings);
// });

// app.get("/allPositions", async (req, res) => {
//   let allPositions = await PositionsModel.find({});
//   res.json(allPositions);
// });

// app.post("/newOrder", async (req, res) => {
//   let newOrder = new OrdersModel({
//     name: req.body.name,
//     qty: req.body.qty,
//     price: req.body.price,
//     mode: req.body.mode,
//   });

//   newOrder.save();

//   res.send("Order saved!");
// });


// app.listen(PORT, () => {
//   console.log("App started!");
//   mongoose.connect(uri);
//   console.log("DB started!");
// });


// //C for sell option
// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const { HoldingsModel } = require("./model/HoldingsModel");
// const { PositionsModel } = require("./model/PositionsModel");
// const { OrdersModel } = require("./model/OrdersModel");

// const PORT = process.env.PORT || 3002;
// const uri = process.env.MONGO_URL;

// const app = express();

// app.use(cors());
// app.use(bodyParser.json());

// app.get("/allHoldings", async (req, res) => {
//   const allHoldings = await HoldingsModel.find({});
//   res.json(allHoldings);
// });

// app.get("/allPositions", async (req, res) => {
//   const allPositions = await PositionsModel.find({});
//   res.json(allPositions);
// });

// app.post("/newOrder", async (req, res) => {
//   try {
//     const newOrder = new OrdersModel({
//       name: req.body.name,
//       qty: req.body.qty,
//       price: req.body.price,
//       mode: req.body.mode,
//     });
//     await newOrder.save();
//     res.send("Order saved!");
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Failed to save order");
//   }
// });

// app.get("/allOrders", async (req, res) => {
//   try {
//     const allOrders = await OrdersModel.find({});
//     res.json(allOrders);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json([]);
//   }
// });

// app.listen(PORT, () => {
//   console.log("App started!");
//   mongoose.connect(uri);
//   console.log("DB started!");
// });



// //Funds 
// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const { HoldingsModel } = require("./model/HoldingsModel");
// const { PositionsModel } = require("./model/PositionsModel");
// const { OrdersModel } = require("./model/OrdersModel");
// const { FundsModel } = require("./model/FundsModel");

// const PORT = process.env.PORT || 3002;
// const uri = process.env.MONGO_URL;

// const app = express();

// app.use(cors());
// app.use(bodyParser.json());

// // Get the single funds document, creating it with starting values the first time
// const getFunds = async () => {
//   let funds = await FundsModel.findOne({});
//   if (!funds) {
//     funds = await FundsModel.create({
//       balance: 4043.1,
//       usedMargin: 3757.3,
//       openingBalance: 4043.1,
//     });
//   }
//   return funds;
// };

// // Validate and round an amount to 2 decimals
// const parseAmount = (value) => {
//   const amount = Math.round(Number(value) * 100) / 100;
//   return Number.isFinite(amount) && amount > 0 ? amount : null;
// };

// app.get("/allHoldings", async (req, res) => {
//   const allHoldings = await HoldingsModel.find({});
//   res.json(allHoldings);
// });

// app.get("/allPositions", async (req, res) => {
//   const allPositions = await PositionsModel.find({});
//   res.json(allPositions);
// });

// app.post("/newOrder", async (req, res) => {
//   try {
//     const newOrder = new OrdersModel({
//       name: req.body.name,
//       qty: req.body.qty,
//       price: req.body.price,
//       mode: req.body.mode,
//     });
//     await newOrder.save();
//     res.send("Order saved!");
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Failed to save order");
//   }
// });

// app.get("/allOrders", async (req, res) => {
//   try {
//     const allOrders = await OrdersModel.find({});
//     res.json(allOrders);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json([]);
//   }
// });

// // ---------- FUNDS ----------
// app.get("/funds", async (req, res) => {
//   try {
//     res.json(await getFunds());
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to load funds" });
//   }
// });

// app.post("/funds/add", async (req, res) => {
//   try {
//     const amount = parseAmount(req.body.amount);
//     if (!amount) {
//       return res.status(400).json({ message: "Enter a valid amount" });
//     }

//     await getFunds();
//     const updated = await FundsModel.findOneAndUpdate(
//       {},
//       {
//         $inc: { balance: amount, payin: amount },
//         $push: { transactions: { type: "ADD", amount } },
//       },
//       { new: true }
//     );
//     res.json(updated);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to add funds" });
//   }
// });

// app.post("/funds/withdraw", async (req, res) => {
//   try {
//     const amount = parseAmount(req.body.amount);
//     if (!amount) {
//       return res.status(400).json({ message: "Enter a valid amount" });
//     }

//     await getFunds();
//     // The balance check is part of the query, so two quick requests
//     // can never push the balance below zero
//     const updated = await FundsModel.findOneAndUpdate(
//       { balance: { $gte: amount } },
//       {
//         $inc: { balance: -amount, payout: amount },
//         $push: { transactions: { type: "WITHDRAW", amount } },
//       },
//       { new: true }
//     );

//     if (!updated) {
//       return res.status(400).json({ message: "Insufficient funds" });
//     }
//     res.json(updated);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to withdraw funds" });
//   }
// });

// app.listen(PORT, () => {
//   console.log("App started!");
//   mongoose.connect(uri);
//   console.log("DB started!");
// });

//Authentication
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
  mongoose.connect(uri);
  console.log("DB started!");
});