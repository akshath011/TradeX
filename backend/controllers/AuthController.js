const bcrypt = require("bcryptjs");

const { UserModel } = require("../model/UserModel");
const { createSecretToken } = require("../util/SecretToken");

const cookieOptions = {
  httpOnly: true, // JavaScript in the browser cannot read this cookie
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days, same as the token
};

const USERNAME_PATTERN = /^[a-z0-9_]{3,30}$/;

const cleanUsername = (value) => value.trim().toLowerCase();

// Every field must be a non-empty string (this also blocks object payloads)
const allStrings = (...values) =>
  values.every((v) => typeof v === "string" && v.trim() !== "");

const publicUser = (user) => ({
  id: user._id,
  username: user.username,
  commodityAccount: {
    opened: Boolean(user.commodityAccount && user.commodityAccount.opened),
    accountId:
      (user.commodityAccount && user.commodityAccount.accountId) || null,
  },
});

module.exports.Signup = async (req, res) => {
  try {
    const { username, password } = req.body || {};

    if (!allStrings(username, password)) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    const name = cleanUsername(username);
    if (!USERNAME_PATTERN.test(name)) {
      return res.status(400).json({
        success: false,
        message:
          "Username must be 3 to 30 characters: letters, numbers or underscores",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const existingUser = await UserModel.findOne({ username: name });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Username already taken" });
    }

    const user = await UserModel.create({ username: name, password });

    const token = createSecretToken(user._id);
    res.cookie("token", token, cookieOptions);

    res.status(201).json({
      success: true,
      message: "Signed up successfully",
      user: publicUser(user),
    });
  } catch (error) {
    // Two signups with the same username at the same moment
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ success: false, message: "Username already taken" });
    }
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports.Login = async (req, res) => {
  try {
    const { username, password } = req.body || {};

    if (!allStrings(username, password)) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    const user = await UserModel.findOne({ username: cleanUsername(username) });
    const passwordMatches = user
      ? await bcrypt.compare(password, user.password)
      : false;

    // Same message for both cases, so attackers can't tell which usernames exist
    if (!passwordMatches) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect username or password" });
    }

    const token = createSecretToken(user._id);
    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: publicUser(user),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// The cookie is httpOnly, so the frontend can't delete it. The server has to.
module.exports.Logout = (req, res) => {
  const { maxAge, ...clearOptions } = cookieOptions;
  res.clearCookie("token", clearOptions);
  res.json({ success: true, message: "Logged out" });
};

// Who is signed in? (requireAuth has already checked the cookie)
module.exports.Me = (req, res) => {
  res.json({ success: true, user: publicUser(req.user) });
};

// Authorization: only the signed-in user can open or see their own account
module.exports.OpenCommodityAccount = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User no longer exists" });
    }

    if (!user.commodityAccount || !user.commodityAccount.opened) {
      user.commodityAccount = {
        opened: true,
        accountId: `COM-${user._id.toString().slice(-6).toUpperCase()}`,
        openedAt: new Date(),
      };
      await user.save();
    }

    res.json({
      success: true,
      message: "Commodity account is active",
      user: publicUser(user),
    });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ success: false, message: "Server error" });
  // }
      } catch (error) {
    if (error.code === 11000) {
      console.error("Duplicate key error:", error.keyPattern);

      // Only a clash on the username means the name is really taken
      if (error.keyPattern && error.keyPattern.username) {
        return res
          .status(409)
          .json({ success: false, message: "Username already taken" });
      }

      return res.status(500).json({
        success: false,
        message: `Database has an old unique index on: ${Object.keys(
          error.keyPattern || {}
        ).join(", ")}. Drop it in MongoDB Atlas.`,
      });
    }
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};