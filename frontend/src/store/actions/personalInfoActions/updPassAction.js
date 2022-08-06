import { setCookie } from "../../../cookies/setCookie";
import ActionType from "../../constants/constant";
import { hostedUrl } from "../../../utils/config"


const updatePass = (logInData, currentPass, logInPass, updPass ,setUserData) => {
    return (dispatch) => {
      
        let updData = {Name : logInData.logInName , Email : logInData.logInEmail , Password : logInData.logInPassword , PhoneNo : logInData.logInPhoneNo ,  currentPass , updPass ,  Role :  logInData.logInPhoneNo}
        fetch(`${hostedUrl}api/personalInfo/upd_Pass`, {
            method: "PUT",

            body: JSON.stringify(updData),

            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then((response) => { return response.json() })
            .then((json) => {
                setCookie("user", JSON.stringify(json.data), 5)
                dispatch({
                    type: ActionType.SignIn,
                    payload: json.data
                })
                alert(json.message)
                setUserData({
                    ...updData , password : "" , updPass : ""
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
}
export { updatePass }