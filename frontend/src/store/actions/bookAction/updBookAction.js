import { hostedUrl } from "../../../utils/config"

const bookUpd = (updBookDetails , NoOfDaysToStay , No0fPerson , selectedRooms) => {
    return (dispatch) => {

        fetch(`${hostedUrl}api/bookUpd`, {

            method: "PUT",

            body: JSON.stringify({...updBookDetails , NoOfDaysToStay , No0fPerson , selectedRooms }),
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {

                alert(data.message)
                
            })
            .catch((error) => {
                console.log(error)
            })

    }
}
export { bookUpd}