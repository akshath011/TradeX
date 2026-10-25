const router = require("express").Router();

const {
  Signup,
  Login,
  Logout,
  Me,
  OpenCommodityAccount,
} = require("../controllers/AuthController");
const { requireAuth } = require("../middlewares/AuthMiddleware");

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout", Logout);

// Needs a valid login cookie
router.get("/me", requireAuth, Me);
router.post("/commodity/open", requireAuth, OpenCommodityAccount);

module.exports = router;