
export const addPlace = (place) => ({
    type: 'ADD_PLACE',
    place,
});

export const deleteSelectedPlace = () => ({
    type: 'DELETE_SELECTED_PLACE',
});

export const selectPlace = (place) => ({
    type: 'SELECT_PLACE',
    place,
});

export const deSelectPlace = () => ({
    type: 'DESELECT_PLACE',
});