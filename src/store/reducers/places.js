import {
    SET_PLACES,
    DELETE_SELECTED_PLACE,
    DELETE_PLACE,
    SELECT_PLACE,
    DESELECT_PLACE,
}
    from '../actions/actionTypes';

const initialState = {
    places: [],
    selectedPlace: undefined,
};

export default (state = initialState, action) => {
    switch (action.type) {
    case SET_PLACES:
        return {
            ...state,
            places: action.places,
        };
    case DELETE_SELECTED_PLACE:
        return {
            ...state,
            places: state.places.filter((place) => place.key !== state.selectedPlace.key),
            selectedPlace: undefined,
        };
    case DELETE_PLACE:
        return {
            ...state,
            places: state.places.filter((place) => place.key !== action.place.key),
        };
    case SELECT_PLACE:
        return {
            ...state,
            selectedPlace: state.places.find((place) => place.key === action.place.key),
        };
    case DESELECT_PLACE:
        return {
            ...state,
            selectedPlace: undefined,
        };
    default:
        return state;
    }
};
