import { AsyncStorage } from 'react-native';
import { uiStartLoading, uiStopLoading } from './ui';
import startMainTabs from '../../screens/MainTabs/startMainTabs';
import { AUTH_SET_TOKEN, REMOVE_AUTH_TOKEN } from './actionTypes';
import { handleHttpError } from './errorHandlers';
import App from '../../../App';

const API_KEY = 'AIzaSyCK2rDlKTdc2NZpDXOmiIYfq1NLrL94hls';
const GOOGLE_AUTH_ENDPOINT = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
const REFRESH_TOKEN_ENDPOINT = `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`;
let AUTH_URL;

// Login user. Sign up and then login for a new user
export const tryAuth = (authData, authMode) => (dispatch) => {
    if (authMode === 'signup') {
        AUTH_URL = `${GOOGLE_AUTH_ENDPOINT}/signupNewUser?key=${API_KEY}`;
    } else if (authMode === 'login') {
        AUTH_URL = `${GOOGLE_AUTH_ENDPOINT}/verifyPassword?key=${API_KEY}`;
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
        .then((response) => handleHttpError(response, dispatch))
        .then((response) => response.json())
        .then((parsedResponse) => {
            if (!parsedResponse.idToken) {
                alert(`Failed! ${parsedResponse.error.message}`);
            } else {
                dispatch(storeToken(
                    parsedResponse.idToken,
                    parsedResponse.expiresIn,
                    parsedResponse.refreshToken,
                ));
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
        if (token) {
            resolve(token);
        } else {
            AsyncStorage.getItem('ap:auth:tokenData')
                .catch((error) => {
                    reject();
                    throw error;
                })
                .then((tokenData) => {
                    if (!tokenData) {
                        reject();
                        return;
                    }
                    const now = new Date();
                    const parsedTokenData = JSON.parse(tokenData);
                    const storedToken = parsedTokenData.token;
                    const refreshToken = parsedTokenData.refreshToken;
                    if (storedToken &&
                        parsedTokenData.expiryAt &&
                        now.getTime() < parseInt(parsedTokenData.expiryAt, 10)) {
                        dispatch(authSetToken(storedToken));
                        resolve(storedToken);
                    } else if (refreshToken) {
                        fetch(REFRESH_TOKEN_ENDPOINT, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
                        })
                            .then((response) => handleHttpError(response, dispatch))
                            .then((response) => response.json())
                            .then((parsedResponse) => {
                                console.log('refresh', parsedResponse);
                                dispatch(storeToken(
                                    parsedResponse.id_token,
                                    parsedResponse.expires_in,
                                    parsedResponse.refresh_token,
                                ));
                                resolve(parsedResponse.id_token);
                            })
                            .catch((error) => {
                                console.log('error refresh');
                                reject();
                                throw error;
                            });
                    } else {
                        clearAsyncStorage();
                        reject();
                    }
                });
        }
    });
    return promise;
};

const storeToken = (token, expiresIn, refreshToken) => (dispatch) => {
    dispatch(authSetToken(token));
    const now = new Date();
    const expiryAt = now.getTime() + (expiresIn * 1000);
    const tokenData = {
        token,
        expiryAt,
        refreshToken,
    };
    AsyncStorage
        .setItem('ap:auth:tokenData', JSON.stringify(tokenData))
        .catch((error) => {
            throw error;
        });
};

export const tryAutoLogin = () => (dispatch) => {
    dispatch(authGetToken())
        .then(() => startMainTabs())
        .catch((error) => {
            throw error;
        });
};

const clearAsyncStorage = () => AsyncStorage.removeItem('ap:auth:tokenData');

export const logout = () => (dispatch) => {
    clearAsyncStorage()
        .then(() => {
            App();
        });
    dispatch(removeAuthToken());
};

const removeAuthToken = () => ({
    type: REMOVE_AUTH_TOKEN,
});
