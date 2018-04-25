import {
    SET_PLACES,
    DELETE_SELECTED_PLACE,
    DELETE_PLACE,
    SELECT_PLACE,
    DESELECT_PLACE,
}
    from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';

const handleError = (error) => {
    alert('Something went wrong!');
    throw error;
};

const stopLoadingAndHandleError = (error, dispatch) => {
    dispatch(uiStopLoading());
    handleError(error);
};

// TODO this does not handle 400/500 errors yet
// putting a catch at the end of a fetch/catch/then should handle them
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
        .catch((err) => {
            stopLoadingAndHandleError(err, dispatch);
        })
        .then((response) => response.json())
        .then((parsedResponse) => {
            const placeData = {
                name: place.name,
                location: place.location,
                image: {
                    uri: parsedResponse.imageUrl,
                },
            };
            fetch('https://awesome-places-1523022274720.firebaseio.com/places.json', {
                method: 'POST',
                body: JSON.stringify(placeData),
            })
                .catch((err) => {
                    stopLoadingAndHandleError(err, dispatch);
                })
                .then((response) => response.json())
                .then(() => {
                    dispatch(uiStopLoading());
                });
        });
};

export const deleteSelectedPlace = () => ({
    type: DELETE_SELECTED_PLACE,
});

export const deletePlace = (place) => (dispatch) => {
    fetch(`https://awesome-places-1523022274720.firebaseio.com/places/${place.key}.json`, {
        method: 'DELETE',
    })
        .catch((err) => handleError(err))
        .then(() => {
            dispatch({
                type: DELETE_PLACE,
                place,
            });
        });
};
// ({
//     type: DELETE_PLACE,
//     place,
// });

export const selectPlace = (place) => ({
    type: SELECT_PLACE,
    place,
});

export const deSelectPlace = () => ({
    type: DESELECT_PLACE,
});

export const setPlaces = (places) => ({
    type: SET_PLACES,
    places,
});

export const getPlaces = () => (dispatch) => {
    fetch('https://awesome-places-1523022274720.firebaseio.com/places.json')
        .catch((err) => handleError(err))
        .then((response) => response.json())
        .then((parsedResponse) => {
            const places = [];
            // FIXME do not iterate over everything, only the keys
            for (const key in parsedResponse) {
                places.push({
                    ...parsedResponse[key],
                    key,
                });
            }
            dispatch(setPlaces(places));
        });
};
