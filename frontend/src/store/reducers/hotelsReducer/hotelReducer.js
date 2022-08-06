import ActionType from "../../constants/constant"


const INITIAL_STATE = {

    hotels: [] 
        
    
}
function hotelReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ActionType.hotels:
            return { hotels : action.payload }
    } return state
}
export default hotelReducer