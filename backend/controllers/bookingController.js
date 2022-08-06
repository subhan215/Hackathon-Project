const bookingDetailsModel = require("../models/bookingDetailsModel")
const { cloudinary } = require("./utils/cloudinary");
const hotelAddModel = require("../models/adminPanelHotelAddModel")

bookAdd = async (req, res) => {
    const checkBooking = await bookingDetailsModel.find({})
    try {
        if (req.body.Name && req.body.Price && req.body.ContactNo && req.body.CNIC && req.body.Address && req.body.No0fPerson && req.body.NoOfDaysToStay && req.body.selectedRooms && req.body.method) {
            let bookAdd;
            /*  if (!checkBooking) {
                 checkHotels = [{
                     Name: req.body.Name,
                     ContactNo: req.body.ContactNo,
                     CNIC: req.body.CNIC,
                     Address: req.body.Address,
                     No0fPerson: req.body.No0fPerson,
                     bankName: req.body.bankName,
                     cardNo: req.body.cardNo,
                     cardCode: req.body.cardCode,
                     expiryDate: req.body.expiryDate,
                     NoOfDaysToStay: req.body.NoOfDaysToStay,
                     selectedRooms: req.body.selectedRooms,
                     Price: req.body.Price,
                     method: req.body.method,
                    Email : req.body.Email
 
 
                 }]
             } */ /* else if (checkBooking) {
         checkHotels.push({
             Name: req.body.Name,
             ContactNo: req.body.ContactNo,
             CNIC: req.body.CNIC,
             Address: req.body.Address,
             No0fPerson: req.body.No0fPerson,
             bankName: req.body.bankName,
             cardNo: req.body.cardNo,
             cardCode: req.body.cardCode,
             expiryDate: req.body.expiryDate,
             NoOfDaysToStay: req.body.NoOfDaysToStay,
             selectedRooms: req.body.selectedRooms,
             Price: req.body.Price,
             method: req.body.method,
              Email : req.body.Email
         })
     } */
            /*  let bookAdd = await new bookingDetailsModel({
                 hotelName : req.body.hotelName , 
                 Name: req.body.Name,
                 Email : req.body.Email,
                 ContactNo: req.body.ContactNo,
                 CNIC: req.body.CNIC,
                 Address: req.body.Address,
                 No0fPerson: req.body.No0fPerson,
                 bankName: req.body.bankName,
                 cardNo: req.body.cardNo,
                 cardCode: req.body.cardCode,
                 expiryDate: req.body.expiryDate,
                 NoOfDaysToStay: req.body.NoOfDaysToStay,
                 selectedRooms: req.body.selectedRooms,
                 Price: req.body.Price,
                 method: req.body.method,
                
 
             }) */
            if (req.body.method === "cash") {
                bookAdd = await new bookingDetailsModel({
                    hotelName: req.body.hotelName,
                    Name: req.body.Name,
                    Email: req.body.Email,
                    ContactNo: req.body.ContactNo,
                    CNIC: req.body.CNIC,
                    Address: req.body.Address,
                    No0fPerson: req.body.No0fPerson,
                    NoOfDaysToStay: req.body.NoOfDaysToStay,
                    selectedRooms: req.body.selectedRooms,
                    Price: req.body.Price,
                    method: req.body.method,
                })
            }

            else if (req.body.method === "cash") {
                if (req.body.bankName && req.body.cardNo && req.body.cardCode && req.body.expiryDate) {
                    bookAdd = await new bookingDetailsModel({
                        hotelName: req.body.hotelName,
                        Name: req.body.Name,
                        Email: req.body.Email,
                        ContactNo: req.body.ContactNo,
                        CNIC: req.body.CNIC,
                        Address: req.body.Address,
                        No0fPerson: req.body.No0fPerson,
                        bankName: req.body.bankName,
                        cardNo: req.body.cardNo,
                        cardCode: req.body.cardCode,
                        expiryDate: req.body.expiryDate,
                        NoOfDaysToStay: req.body.NoOfDaysToStay,
                        selectedRooms: req.body.selectedRooms,
                        Price: req.body.Price,
                        method: req.body.method
                    })
                } else {
                    return res.json({ message: "Please fill all card details", success: false })

                }

            }
            await bookAdd.save()
            return res.json({ message: "booking created Successfully", success: true })

        } else {
            res.statusCode = 400;
            return res.send("Please fill all the details");
        }
    }
    catch (e) {
        return res.send({ success: false, message: e.message })

    }
}
getBookings = async (req, res) => {
    try {
        res.statusCode = 200;
        const checkBookings = await bookingDetailsModel.find({})
        return res.send({ data: checkBookings, success: true, message: "Successfully Bookings Fetched " })
    }

    catch (err) {
        return res.send({ success: false, message: err.message })
    }
}
bookUpd = async (req, res) => {
    try {
        console.log(req.body.No0fPerson)
        console.log(req.body._id)
        const checkHotel = await bookingDetailsModel.findById(req.body._id)
        console.log(checkHotel)
        const updBooking = await { ...req.body, Price: (checkHotel.Price * req.body.selectedRooms) * req.body.NoOfDaysToStay }
        await bookingDetailsModel.findByIdAndUpdate(req.body._id, updBooking)
        return res.send({ success: true, message: "Successfully Updated Details " })
    }
    catch (err) {
        return res.send({ success: false, message: err.message })
    }
}
module.exports = { bookAdd, getBookings, bookUpd }
