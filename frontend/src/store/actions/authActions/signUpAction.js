import { validateEmail } from "../../../regex expressions/email regex"
import { hostedUrl } from "../../../utils/config"

function signUp(userDetails, conPass, navigate, role) {
    return (dispatch) => {
        if (userDetails.password.length === 0 || userDetails.name.length === 0 || userDetails.phoneNo.length === 0 || userDetails.email.length === 0) {
            alert("Please fill all fields")
        }
        else if (!String(userDetails.email).toLowerCase().match(validateEmail)) {
            alert("Please write correct email")
        } else if (userDetails.password.length < 8) {

            alert("Password should be of 8 characters")
        } else if(role.length === 0){
            alert("Please select a role")
        }
        else if (String(userDetails.email).toLowerCase().match(validateEmail)) {
            if (userDetails.password === conPass) {
                // POST request using fetch()
                fetch(`${hostedUrl}api/signup`, {
                    // Adding method type
                    method: "POST",
                    // Adding body or contents to send
                    body: JSON.stringify({ ...userDetails, role }),
                    // Adding headers to the request
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
                    // Converting to JSON
                    .then(response => response.json())
                    // Displaying results to console
                    .then(json => {
                        console.log(json)
                        navigate("/login")
                    })
            } else {
                alert("Passwords are not matching")
            }
        }

    }
}
export { signUp }