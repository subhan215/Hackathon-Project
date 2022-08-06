import { hostedUrl } from "../../../utils/config"
import { setCookie } from "../../../cookies/setCookie"
import ActionType from "../../constants/constant"

function signIn(userDetails, navigate) {
    return (dispatch) => {
        if (userDetails.email.length === 0 || userDetails.password.length === 0) {

            alert("Please fill both fields")

        } else {


            // POST request using fetch()
            fetch(`${hostedUrl}api/login`, {
                // Adding method type
                method: "POST",
                // Adding body or contents to send
                body: JSON.stringify(userDetails),
                // Adding headers to the request
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                // Converting to JSON
                .then(response => response.json())
                // Displaying results to console
                .then(json => {
                    console.log(json.data)
                    let user = json.data._doc
                    setCookie("user", JSON.stringify(user), 5)
                    navigate("/profile")
                    dispatch({
                        type: ActionType.SignIn,
                        payload: { ...json.data._doc }
                    })
                })
        }
    }
}
export { signIn }