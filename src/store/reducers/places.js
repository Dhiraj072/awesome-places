const initialState = {
    places: [],
    selectedPlace: undefined,
};

export default (state = initialState, action) => {
    switch (action.type) {
    case 'ADD_PLACE':
        return {
            ...state,
            places: state.places.concat(action.place),
        };
    case 'DELETE_SELECTED_PLACE':
        return {
            ...state,
            places: state.places.filter((place) => place.key !== state.selectedPlace.key),
            selectedPlace: undefined,
        };
    case 'SELECT_PLACE':
        return {
            ...state,
            selectedPlace: state.places.find((place) => place.key === action.place.key),
        };
    case 'DESELECT_PLACE':
        return {
            ...state,
            selectedPlace: undefined,
        };
    default:
        return state;
    }
};
