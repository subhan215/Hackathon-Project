const mongoose = require("mongoose") ; 

const authSignupSchema = mongoose.Schema({
    email : {
        type : String
    } , 
    password : {
        type : String
    }  , 
    name : {
        type : String

    } ,
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

const authModel = mongoose.model( "authData", authSignupSchema)
module.exports = authModel  ;  