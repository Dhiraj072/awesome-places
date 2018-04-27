import { uiStartLoading, uiStopLoading } from './ui';
import startMainTabs from '../../screens/MainTabs/startMainTabs';
import { AUTH_SET_TOKEN } from './actionTypes';

const API_KEY = 'AIzaSyCK2rDlKTdc2NZpDXOmiIYfq1NLrL94hls';
let AUTH_URL;

// Login user. Sign up and then login for a new user
export const tryAuth = (authData, authMode) => (dispatch) => {
    if (authMode === 'signup') {
        AUTH_URL = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`;
    } else if (authMode === 'login') {
        AUTH_URL = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`;
    } else {
        throw new Error('Unknown authMode ', authMode);
    }
    dispatch(uiStartLoading());
    fetch(AUTH_URL, {
        method: 'POST',
        body: JSON.stringify({
            ...authData,
            returnSecureToken: true,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((parsedResponse) => {
            if (!parsedResponse.idToken) {
                alert(`Failed! ${parsedResponse.error.message}`);
            } else {
                dispatch(authSetToken(parsedResponse.idToken));
                startMainTabs();
            }
            dispatch(uiStopLoading());
        })
        .catch((err) => {
            alert('Something went wrong');
            dispatch(uiStopLoading());
            throw err;
        });
};

export const authSetToken = (token) => ({
    type: AUTH_SET_TOKEN,
    token,
});

export const authGetToken = () => (dispatch, getState) => {
    const token = getState().auth.token;
    const promise = new Promise((resolve, reject) => {
        if (!token) {
            reject();
        } else {
            resolve(token);
        }
    });
    return promise;
};
