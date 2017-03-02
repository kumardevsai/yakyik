import constants from '../constants'

var initialState = {
    usersMap: {}
}

export default (state = initialState, action) => {
    
    let updated = Object.assign({}, state);
    switch (action.type) {

        case constants.USER_RECEIVED:
            //console.log('USER_RECEIVED', action.user);
            let updatedUsersMap = Object.assign([], updated.usersMap);
            updatedUsersMap[action.user.username] = action.user; 
            updated['usersMap'] = updatedUsersMap;
            return updated; 

        default:
            return state
    }
}