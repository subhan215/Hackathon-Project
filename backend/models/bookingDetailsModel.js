const mongoose = require("mongoose");

const bookingDetailsSchema = mongoose.Schema({
    hotelName : {
        type : String
    } , 
    Name: {
        type: String
    },
    Email : {
        type: String
    } , 
    ContactNo: {
        type: String
    },
    CNIC: {
        type: String
    },
    Address: {
        type: String
    },
    No0fPerson: {
        type: Number
    },
    bankName: {
        type: String
    },
    cardNo: {
        type: String
    },
    cardCode: {
        type: String
    },
    expiryDate: {
        type: String
    },
    NoOfDaysToStay: {
        type: Number
    },
    selectedRooms: {
        type: Number

    },
    Price: {
        type: Number
    } , 
    method : {
        type : String
    }

})
const bookingDetailsModel = mongoose.model("bookingDetails", bookingDetailsSchema)
module.exports = bookingDetailsModel;  