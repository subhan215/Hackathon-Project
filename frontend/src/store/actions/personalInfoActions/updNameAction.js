import { setCookie } from "../../../cookies/setCookie";
import ActionType from "../../constants/constant";
import { hostedUrl } from "../../../utils/config"

const updateName = (logInData, Name) => {
    return (dispatch) => {
    let updData = {Name , Email : logInData.logInEmail , Password : logInData.logInPassword , PhoneNo : logInData.logInPhoneNo ,  Role :  logInData.logInRole }
        fetch(`${hostedUrl}api/personalInfo/upd_Name`, {
            method: "PUT",

            body: JSON.stringify(updData),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then((response) => { return response.json() })
            .then((json) => {
                console.log(json)
                 setCookie("user", JSON.stringify(json.data), 5)
                dispatch({
                    type: ActionType.SignIn,
                    payload: json.data 
                })
                alert(json.message) 

            })
            .catch((error) => {
                console.log(error)
            })
      
    }
}
export { updateName }