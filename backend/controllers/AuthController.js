const crypto = require("crypto");

const { UserModel } = require("../model/UserModel");
const { createSecretToken } = require("../util/SecretToken");

const cookieOptions = {
  httpOnly: true, // JavaScript in the browser cannot read this cookie
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days, same as the token
};

const publicUser = (user) => ({
  id: user._id,
  username: user.username,
  commodityAccount: {
    opened: Boolean(user.commodityAccount && user.commodityAccount.opened),
    accountId:
      (user.commodityAccount && user.commodityAccount.accountId) || null,
  },
});

// DEMO MODE: any username and any password signs you in.
// A username that does not exist yet gets an account created automatically.
// The typed password is ignored.
const signInAnyone = async (req, res, status, message) => {
  try {
    const { username } = req.body || {};

    if (typeof username !== "string" || username.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Enter a username" });
    }

    const name = username.trim().toLowerCase().slice(0, 50);

    let user = await UserModel.findOne({ username: name });

    if (!user) {
      try {
        user = await UserModel.create({
          username: name,
          // Never used to sign in, so a random value is stored
          password: crypto.randomBytes(16).toString("hex"),
        });
      } catch (error) {
        // Two sign-ins for a brand-new name at the same moment
        if (error.code === 11000) {
          user = await UserModel.findOne({ username: name });
        }
        if (!user) throw error;
      }
    }

    const token = createSecretToken(user._id);
    res.cookie("token", token, cookieOptions);

    res.status(status).json({
      success: true,
      message,
      user: publicUser(user),
    });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(500).json({
        success: false,
        message:
          "The database has an old unique index. Restart the backend once to remove it.",
      });
    }
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports.Signup = (req, res) =>
  signInAnyone(req, res, 201, "Signed up successfully");

module.exports.Login = (req, res) =>
  signInAnyone(req, res, 200, "Logged in successfully");

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

// Only the signed-in user can open or see their own account
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};