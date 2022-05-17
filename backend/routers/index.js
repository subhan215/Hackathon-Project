const express = require("express");
const router = express.Router();
const authRoutes = require('./authRouter')
const cors = require('cors');


router.use('/user',authRoutes)



module.exports = router