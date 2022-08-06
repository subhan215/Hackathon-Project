const authModel = require("../models/authModel");
const logInModel = require("../models/logInModel")
const bcrypt = require("bcryptjs");
const bookingDetailsModel = require("../models/bookingDetailsModel")

updName = async (req, res) => {
    console.log(req.body)
    let updData = { name: req.body.Name, email: req.body.Email, password: req.body.Password, phoneNo: req.body.PhoneNo, role : req.body.Role }
    await authModel.replaceOne({email : req.body.Email}, updData)
   
    await logInModel.deleteOne({})
    const userCreate = await new logInModel({ ...updData})
    await userCreate.save()
    return res.send({ success: true, message: "Name Updated Successfully ", data: updData })
}
updEmail = async (req, res) => {
    let updData = { name: req.body.Name, email: req.body.Email, password: req.body.Password, phoneNo: req.body.PhoneNo, role : req.body.Role }
    await authModel.replaceOne({Email : req.body.prevEmail}, updData)
    await bookingDetailsModel.updateOne({Email : req.body.prevEmail} , {Email : req.body.Email})
    await logInModel.deleteOne({})
    const userCreate = await new logInModel({ ...updData })
    await userCreate.save()
    return res.send({ success: true, message: "Email Updated Successfully ", data: updData})
}
updPhoneNo = async (req, res) => {
    let updData = { name: req.body.Name, email: req.body.Email, password: req.body.Password, phoneNo: req.body.PhoneNo , role : req.body.Role}
    await authModel.replaceOne({Email : req.body.Email}, updData)

    await logInModel.deleteOne({})
    const userCreate = await new logInModel({ ...updData })
    await userCreate.save()
    return res.send({ success: true, message: "Phone No Updated Successfully ", data: updData })
}

updPass = async(req , res) => {
    console.log(req.body)
    const passTest = await bcrypt.compare(req.body.currentPass, req.body.Password)

   if(passTest) {
    const hashPass = await bcrypt.hash(req.body.updPass, 12);
    let updData = { name: req.body.Name, email: req.body.Email, password: req.body.Password, phoneNo: req.body.PhoneNo , role : req.body.Role}
    await authModel.replaceOne({Email : req.body.Email}, updData)
    await logInModel.deleteOne({})
    const userCreate = await new logInModel({ ...updData})
    await userCreate.save()
    return res.send({ success: true, message: "Password Updated Successfully ", data:{ ...updData } })
   } else {
    return res.send({ success: true, message: "Please write correct current Password "  , data : { name: req.body.Name, email: req.body.Email, password: req.body.Password, phoneNo: req.body.PhoneNo , role : req.body.Role}
})

   }
}
module.exports = { updName, updEmail, updPhoneNo , updPass }