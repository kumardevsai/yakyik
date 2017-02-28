import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import zoneReducer from './reducers/zoneReducer';
import accountReducer from './reducers/accountReducer';

let store;

export default {

    configureStore: (initial) => {
        const reducers = combineReducers({
            zone: zoneReducer,
            account: accountReducer
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
