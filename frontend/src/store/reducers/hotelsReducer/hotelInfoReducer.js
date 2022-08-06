import ActionType from "../../constants/constant"


const INITIAL_STATE = {

   hotelInfo : {
       Name : "" , 
       PerRoomPrice : ""
   }        
    
}
function hotelInfoReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ActionType.hotelInfo:
            return { hotelInfo : { Name : action.payload.Name , PerRoomPrice : action.payload.PerRoomPrice} }
    } return state
}
export default hotelInfoReducer