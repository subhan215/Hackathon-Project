const mongoose = require("mongoose")
const logInSchema = mongoose.Schema({
    name : {
        type : String
    } ,
    email : {
        type : String
    } , 
    password : {
        type : String
    }  ,  
    phoneNo : {
        type : String

    } , 
    userImage : {
        type : String
    } ,
   
    role : {
        type : String
    }
})
const logInModel = mongoose.model( "logInData", logInSchema)
module.exports = logInModel