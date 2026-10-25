require("dotenv").config();
const jwt = require("jsonwebtoken");

const { UserModel } = require("../model/UserModel");

// Runs before a protected route: checks the login cookie and identifies the user
module.exports.requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not logged in" });
    }

    // Throws if the token is fake, tampered with, or expired
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);

    const user = await UserModel.findById(decoded.id).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User no longer exists" });
    }

    req.user = user; // later routes can read who is logged in
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};