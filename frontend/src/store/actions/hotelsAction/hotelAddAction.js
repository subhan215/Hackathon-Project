import ActionType from "../../constants/constant"
import { hostedUrl } from "../../../utils/config"

const addHotel = (hotelDetails,email ,  previewSource, setHotelDetails , setPreviewSource) => {
    return (dispatch) => {
        console.log(email)
        let hotelData = { ...hotelDetails, img: previewSource  , email}
        fetch(`${hostedUrl}api/admin/hotelAdd`, {

            method: "POST",

            body: JSON.stringify(hotelData),
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
                setHotelDetails({
                    Name: "",
                    Services_of_Rooms: [],
                    Room_Details: [],
                    Services: [],
                })
                setPreviewSource("")
            })

            .catch((error) => {
                console.log(error)
            })
    }
}
export { addHotel }