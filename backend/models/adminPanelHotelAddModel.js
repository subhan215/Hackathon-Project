const mongoose = require("mongoose");

const hotelAddSchema = mongoose.Schema({
    Email : {
        type : String
    } ,
    Name : {
        type : String
    } , 
    Price: {
        type: Number
    },
    Services_of_Rooms: {
        type: Array
    },
    Room_Details: {
        type: Array

    },
    Services: {
        type: Array

    },
    Image: {
        type: String
    } , 
    Img_Cloud_Id : {
        type: String
    }

})
const hotelAddModel = mongoose.model("adminPanelHotels", hotelAddSchema)
module.exports = hotelAddModel;  