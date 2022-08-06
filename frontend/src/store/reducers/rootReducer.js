import { combineReducers } from "redux";
import logInReducer from "./authReducers/loginReducer";
import bookingsReducer from "./bookingsReducer/bookingsReducer";
import hotelInfoReducer from "./hotelsReducer/hotelInfoReducer";

import hotelReducer from "./hotelsReducer/hotelReducer";
import hotelsWithFilterReducer from "./hotelsWithFilterReducer/reducer";

const rootReducer = combineReducers({
     logInReducer , 
     hotelReducer ,
     hotelInfoReducer , 
     bookingsReducer ,
     hotelsWithFilterReducer
})
export default rootReducer