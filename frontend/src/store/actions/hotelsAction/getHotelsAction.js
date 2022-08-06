import ActionType from "../../constants/constant"
import { hostedUrl } from "../../../utils/config"


const getHotels = () => {
    return (dispatch) => {
        fetch(`${hostedUrl}api/getHotels`, {
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
                    type: ActionType.hotels,
                    payload: myJson.data

                })
        })
            .catch((e) => {
                console.log(e, "error")
            })
    }
}
export { getHotels }
