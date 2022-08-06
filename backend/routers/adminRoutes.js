const express = require("express");
const router = express.Router();

const hotelCon = require("../controllers/hotelsControler")

router.post("/admin/hotelAdd", hotelCon.hotelAdd)
router.delete("/admin/hotelDel" , hotelCon.delHotel)
router.put("/admin/hotelUpd" , hotelCon.updHotel)


module.exports = router