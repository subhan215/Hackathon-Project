import ActionType from "../../constants/constant"
import { hostedUrl } from "../../../utils/config"

const delHotel = (Email , Img_Cloud_Id) => {
    return (dispatch) => {
        console.log(Email)
        fetch(`${hostedUrl}api/admin/hotelDel`, {

            method: "DELETE",

            body: JSON.stringify({Email , Img_Cloud_Id}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
         // Converting to JSON
         .then((response) => { return response.json() })
         // Displaying results to console
         .then((json) => {
             console.log(json.data)
             dispatch({
                type: ActionType.hotels,
                payload: json.data
            })
         })

         .catch((error) => {
             console.log(error)
         })
    }
}
export {delHotel}
