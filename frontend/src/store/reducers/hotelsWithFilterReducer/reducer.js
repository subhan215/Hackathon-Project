import ActionType from "../../constants/constant"


const INITIAL_STATE = {

    hotelsWithFilter: [] 
        
    
}
function hotelsWithFilterReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ActionType.hotelsWithFilter:
            return { hotelsWithFilter : action.payload }
    } return state
}
export default hotelsWithFilterReducer