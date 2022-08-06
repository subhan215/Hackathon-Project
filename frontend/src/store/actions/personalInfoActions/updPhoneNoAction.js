import { setCookie } from "../../../cookies/setCookie";
import ActionType from "../../constants/constant";
import { hostedUrl } from "../../../utils/config"

const updatePhoneNo = (logInData , PhoneNo ) => {
    return (dispatch) => {
        let updData = {Name : logInData.logInName , Email : logInData.logInEmail , Password : logInData.logInPassword , PhoneNo ,  Role :  logInData.logInRole}
        fetch(`${hostedUrl}api/personalInfo/upd_PhoneNo`, {
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

            })
            .catch((error) => {
                console.log(error)
            })  
    }
}
export { updatePhoneNo }