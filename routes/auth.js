const express = require("express");
const { register, login, getMe, forgotPassword, resetPassword } = require("../controllers/auth");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/me", protect, getMe);
router.post("/register", register);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resettoken", resetPassword);

module.exports = router;
