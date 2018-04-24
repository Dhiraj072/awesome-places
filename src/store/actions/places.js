import {
    DELETE_SELECTED_PLACE,
    DELETE_PLACE,
    SELECT_PLACE,
    DESELECT_PLACE,
}
    from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';

export const addPlace = (place) => (dispatch) => {
    dispatch(uiStartLoading());
    fetch(
        'https://us-central1-awesome-places-1523022274720.cloudfunctions.net/storeImage',
        {
            method: 'POST',
            body: JSON.stringify({
                image: place.image.base64,
            }),
        },
    )
        .catch((error) => {
            dispatch(uiStopLoading());
            throw error;
        })
        .then((response) => response.json())
        .then((parsedResponse) => {
            const placeData = {
                name: place.name,
                location: place.location,
                image: parsedResponse.imageUrl,
            };
            fetch('https://awesome-places-1523022274720.firebaseio.com/places.json', {
                method: 'POST',
                body: JSON.stringify(placeData),
            })
                .catch((err) => {
                    dispatch(uiStopLoading());
                    throw err;
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    dispatch(uiStopLoading());
                });
            // return {
            //     type: 'ADD_PLACE',
            //     place,
            // };
        });
};

export const deleteSelectedPlace = () => ({
    type: DELETE_SELECTED_PLACE,
});

export const deletePlace = (place) => ({
    type: DELETE_PLACE,
    place,
});

export const selectPlace = (place) => ({
    type: SELECT_PLACE,
    place,
});

export const deSelectPlace = () => ({
    type: DESELECT_PLACE,
});
