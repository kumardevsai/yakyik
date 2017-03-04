import constants from '../constants'

var initialState = {
    user: null
}

export default (state = initialState, action) => {
    let updated = Object.assign({}, state);
    switch (action.type) {

        case constants.CURRENT_USER_RECEIVED:
            //console.log('CURRENT_USER_RECEIVED');
            updated['user'] = action.user;
            return updated 
        
        case constants.USER_PROFILE_UPDATED:
            console.log('USER_PROFILE_UPDATED: ', JSON.stringify(action.user));
            updated['user'] = action.user;
            return updated;

        default:
            return state
    }
}