const authModel = require("../models/authModel");
const logInModel = require("../models/logInModel")
const bcrypt = require("bcryptjs");
authSignup = async (req, res) => {
    const { email, password, name, phoneNo, role } = req.body;
    try {
        const checkUser = await authModel.findOne({ "email": email })
        if (checkUser) {
            return res.status(200).send({ success: false, message: "user already registered" })
        } else { 
            const hashPass = await bcrypt.hash(password, 12);
            const userCreate = await new authModel({ name, email, password: hashPass, phoneNo , userImage : "" , role  })
            await userCreate.save()
                .then(() => {
                    return res.status(200).send({ success: true, message: "successfully registered" })
                })
                .catch((err) => {
                    return res.status(400).send({ success: false, message: err.message })
                })
        }
    }
    catch (err) {
        return res.status(401).send({ success: false, message: err.message })
    }
}
authlogIn = async (req, res) => {
    console.log(req.body)
    const { email, password } = await req.body;
    try {
        const checkUser = await authModel.findOne({ "email": email })
        
        if (checkUser) {
            const passTest = await bcrypt.compare(password, checkUser.password)
            console.log(passTest)
            if (!passTest) {
                return res.status(200).send({ success: false, message: "Password Incorrect!" })
            } else if (passTest) {
                await logInModel.deleteMany({})
                const userCreate = await new logInModel({ name: checkUser.name, email, password: checkUser.password, phoneNo: checkUser.phoneNo, uId: checkUser._id  , role : checkUser.role})
                await userCreate.save()
                await res.status(200).send({
                    message: "login successfull",
                    success: true,
                    data: { ...checkUser }
                })
            }
        } else {
            return res.status(404).send({ success: false, message: "User doesn't exist" })
        }

         

    }
    catch (err) {
        return res.status(401).send({ success: false, message: err.message })

    }
}
authLogOut = async (req, res) => {
    try{
    await logInModel.deleteMany({}) ; 
    return res.send({success : true  , message : "User Logout Successfully!"}) ; 
 } catch (err) {
    return res.status(401).send({ success: false, message: err.message })

}
}

module.exports = { authSignup, authlogIn , authLogOut}