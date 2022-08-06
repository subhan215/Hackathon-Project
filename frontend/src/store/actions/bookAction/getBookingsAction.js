import ActionType from "../../constants/constant"
import { hostedUrl } from "../../../utils/config"


const getBookings = () => {
    return (dispatch) => {
        fetch(`${hostedUrl}api/getBookings`, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

            .then((response) => {
                return response.json()
            })
            .then((myJson) => {
                console.log(myJson.data)
                dispatch({
                    type: ActionType.getBookings,
                    payload: myJson.data

                })
        })
            .catch((e) => {
                console.log(e, "error")
            })
    }
}
export { getBookings }