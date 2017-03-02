import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { zoneReducer, accountReducer, userReducer } from './reducers';

let store;

export default {

    configureStore: (initial) => {
        const reducers = combineReducers({
            zone: zoneReducer,
            account: accountReducer,
            user: userReducer
        })

        store = createStore(
            reducers,
            applyMiddleware(thunk)
        )

        return store;
    },

    currentStore: () => {
        return store
    }
}
