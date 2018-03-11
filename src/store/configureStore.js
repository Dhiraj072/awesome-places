import { createStore, combineReducers, compose } from 'redux';
import placesReducer from './reducers/places';

let composeEnhancers = compose;

/* eslint-disable no-underscore-dangle, no-undef */
if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
/* eslint-enable */

const reducers = combineReducers({
    app: placesReducer,
});

const configureStore = () => createStore(reducers, composeEnhancers());

export default configureStore;
