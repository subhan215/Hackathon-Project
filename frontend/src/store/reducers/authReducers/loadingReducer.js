import ActionType from "../../constant/constant";

const INITIAL_STATE = {
    loading: false
}
function loadingReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ActionType.Login_Requested:
            return { loading: true }
        case ActionType.Login_Succeed:
            return { loading: false }
        case ActionType.Login_Failed:
            return { loading: false }
        case ActionType. SignUp_Failed:
            return { loading: false }
        case ActionType.SignUp_Requested:
            return { loading: true }
        case ActionType.SignUp_Succeed:
            return { loading: false }
    } return state
}
export default loadingReducer