const express = require("express");
const router = express.Router();
const authCon = require("../controllers/authController");
router.post("/signup", authCon.authSignup)
router.post("/login", authCon.authlogIn)
router.delete("/logout" , authCon.authLogOut)

module.exports = router