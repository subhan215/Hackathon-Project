import { hostedUrl } from "../../../utils/config"
import { setCookie } from "../../../cookies/setCookie"


function signOut(navigate) {
    return (dispatch) => {
        setCookie("user", 0)
        fetch(`${hostedUrl}api/logout`, {
            // Adding method type
            method: "DELETE",
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
           alert("User Logout Successfully!")
            navigate("/login")
        })
    }
}
export {signOut}