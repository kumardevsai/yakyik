import constants from '../constants'

var initialState = {
    user: null
}

export default (state = initialState, action) => {
    
    switch (action.type) {

        case constants.CURRENT_USER_RECEIVED:
            console.log('CURRENT_USER_RECEIVED');
            let updated = Object.assign({}, state);
            updated['user'] = action.user;
            return updated 

        default:
            return state
    }
}