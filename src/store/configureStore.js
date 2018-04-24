import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
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

const configureStore = () => createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default configureStore;
