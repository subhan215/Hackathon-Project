import ActionType from "../../constants/constant"


const INITIAL_STATE = {

    bookings : [] 
        
    
}
function bookingsReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ActionType.getBookings:
            return { bookings : action.payload }
    } return state
}
export default bookingsReducer