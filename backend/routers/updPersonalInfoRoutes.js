const express = require("express");
const router = express.Router();
const updPersonalInfoCon = require("../controllers/updPersonalInfoController");
router.put("/personalInfo/upd_Name" , updPersonalInfoCon.updName)
router.put("/personalInfo/upd_Email" , updPersonalInfoCon.updEmail)
router.put("/personalInfo/upd_PhoneNo" , updPersonalInfoCon.updPhoneNo)
router.put("/personalInfo/upd_Pass" , updPersonalInfoCon.updPass) ; 

module.exports = router