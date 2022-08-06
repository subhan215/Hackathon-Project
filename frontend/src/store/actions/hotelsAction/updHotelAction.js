import ActionType from "../../constants/constant"
import { hostedUrl } from "../../../utils/config"

const updHotel = (Email , updHotelDetails , previewSource , setPreviewSource ) => {
    return (dispatch) => {
        
         console.log(updHotelDetails.image)
         console.log(updHotelDetails.img_Cloud_Id)
        fetch(`${hostedUrl}api/admin/hotelUpd`, {

            method: "PUT",

            body: JSON.stringify({Email , updHotelDetails , img: previewSource  }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

            // Converting to JSON
            .then((response) => { return response.json() })
            // Displaying results to console
            .then((json) => {
                alert(json.message)
                console.log(json.data)
                dispatch({
                    type: ActionType.hotels,
                    payload: json.data
                })
                setPreviewSource("")
            })

            .catch((error) => {
                console.log(error)
            })
    }
}
export { updHotel }