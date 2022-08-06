const express = require("express");
const router = express.Router();
const adminRoutes = require('./adminRoutes')
const otherRoutes = require("./otherRoutes")
const authRoutes = require("./authRoutes")
const updPersonalInfoRoutes = require("./updPersonalInfoRoutes")
router.use('/api',[adminRoutes   , otherRoutes , authRoutes , updPersonalInfoRoutes])


module.exports = router