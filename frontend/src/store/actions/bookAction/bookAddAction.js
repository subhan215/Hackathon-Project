import { hostedUrl } from "../../../utils/config"

const bookAdd = (hotelName , userInfo, userPaymentInfo, NoOfDaysToStay, selectedRooms, NoOfPersons , Price, method, setUserInfo, setUserPaymentInfo, setNoOfDaysToStay, setSelectedRooms, setNoOfPersons , setMethod) => {
    return (dispatch) => {
        let bookingDetails = { hotelName : hotelName ,   ...userInfo, ...userPaymentInfo, NoOfDaysToStay, selectedRooms, Price, method , NoOfPersons }
        fetch(`${hostedUrl}api/bookAdd`, {

            method: "POST",

            body: JSON.stringify(bookingDetails),
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
                if (data.success === true) {

                    setNoOfDaysToStay("")
                    setSelectedRooms("")
                    setNoOfPersons("")
                    setMethod("cash")
                    setUserInfo({
                        Name: "",
                        ContactNo: "",
                        CNIC: "",
                        Address: "",
                        No0fPerson: "",
                        Email: ""
                    })
                    setUserPaymentInfo({
                        bankName: "",
                        cardNo: "",
                        cardCode: "",
                        expiryDate: ""
                    })
                }
            })
            .catch((error) => {
                console.log(error)
            })

    }
}
export { bookAdd }