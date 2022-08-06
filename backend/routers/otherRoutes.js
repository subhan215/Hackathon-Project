const express = require("express");
const router = express.Router();
const hotelCon = require("../controllers/hotelsControler")
const bookCon = require("../controllers/bookingController")
router.get("/getHotels", hotelCon.getHotels)
router.post("/bookAdd" , bookCon.bookAdd)
router.get("/getBookings", bookCon.getBookings)
router.delete("/hotelDel" , hotelCon.delHotel)
router.put("/bookUpd" , bookCon.bookUpd)

module.exports = router