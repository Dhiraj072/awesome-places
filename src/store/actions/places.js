import {
    SET_PLACES,
    DELETE_SELECTED_PLACE,
    DELETE_PLACE,
    SELECT_PLACE,
    DESELECT_PLACE,
}
    from './actionTypes';
import { uiStartLoading, uiStopLoading, authGetToken } from './index';
import { handleHttpError } from './errorHandlers';

const handleError = (error) => {
    alert('Something went wrong!');
    throw error;
};

const handleAuthError = (error) => {
    alert('Not logged in!');
    throw new Error('Not authenticated', error);
};

// TODO this does not handle 400/500 errors yet
// putting a catch at the end of a fetch/catch/then should handle them
export const addPlace = (place) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch(uiStartLoading());
        let authToken;
        dispatch(authGetToken())
            .then((token) => {
                authToken = token;
                console.log('Got token', token, 'Now making storeImage req');
                fetch(
                    'https://us-central1-awesome-places-1523022274720.cloudfunctions.net/storeImage',
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            image: place.image.base64,
                        }),
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                )
                    .then((response) => handleHttpError(response, dispatch))
                    .then((response) => response.json())
                    .then((parsedResponse) => {
                        console.log('Parsed res', parsedResponse);
                        const placeData = {
                            name: place.name,
                            location: place.location,
                            image: {
                                uri: parsedResponse.imageUrl,
                            },
                            imagePath: parsedResponse.imagePath,
                        };
                        fetch('https://awesome-places-1523022274720.firebaseio.com/' +
                        `places.json?auth=${authToken}`, {
                            method: 'POST',
                            body: JSON.stringify(placeData),
                        })
                            .then((response) => handleHttpError(response, dispatch))
                            .then((response) => response.json())
                            .then((parsedRes) => {
                                console.log('Place added res', parsedRes);
                                dispatch(uiStopLoading());
                                resolve(parsedRes);
                                dispatch(getPlaces());
                            })
                            .catch((err) => {
                                handleError(err);
                                reject(err);
                            });
                    })
                    .catch((err) => {
                        handleError(err);
                        reject(err);
                    });
            })
            .catch((err) => {
                handleAuthError(err);
                reject(err);
            });
    });
};

export const deleteSelectedPlace = () => ({
    type: DELETE_SELECTED_PLACE,
});

export const deletePlace = (place) => (dispatch) => {
    dispatch(authGetToken())
        .then((token) => {
            fetch('https://awesome-places-1523022274720.firebaseio.com' +
            `/places/${place.key}.json?auth=${token}`, {
                method: 'DELETE',
            })
                .then((response) => handleHttpError(response, dispatch))
                .then(() => {
                    dispatch({
                        type: DELETE_PLACE,
                        place,
                    });
                })
                .catch((err) => handleError(err));
        })
        .catch((error) => handleAuthError(error));
};

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
    dispatch(authGetToken())
        .then((token) => {
            fetch('https://awesome-places-1523022274720.firebaseio.com/' +
            `places.json?auth=${token}`)
            // .then((response) => handleHttpError(response, dispatch))
                .then((response) => response.json())
                .then((parsedResponse) => {
                    const places = [];
                    // FIXME do not iterate over everything, only the keys
                    console.log('parsedResponse', parsedResponse);
                    Object.keys(parsedResponse).forEach((key) => {
                        places.push({
                            ...parsedResponse[key],
                            key,
                        });
                    });
                    dispatch(setPlaces(places));
                })
                .catch((err) => handleError(err));
        })
        .catch((error) => handleAuthError(error));
};
