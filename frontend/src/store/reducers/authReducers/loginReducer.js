import ActionType from "../../constants/constant"


const INITIAL_STATE = {

    login: {
        logInName: "",
        logInEmail: "",
        logInPassword: "",
        logInPhoneNo: "" , 
        logInUserImage : "" , 
        logInRole : ""
    }
}
function logInReducer(state = INITIAL_STATE , action) {
   switch(action.type) {
       case ActionType.SignIn : 
        return {login : {...state.login , logInName : action.payload.name ? action.payload.name : action.payload.Name , logInEmail : action.payload.email ? action.payload.email : action.payload.Email , logInPassword : action.payload.password ? action.payload.password : action.payload.Password  , logInPhoneNo : action.payload.phoneNo ? action.payload.phoneNo : action.payload.PhoneNo,  logInRole : action.payload.role ,  logInUserImage : action.payload.userImage} }
   } return state
}
export default logInReducer