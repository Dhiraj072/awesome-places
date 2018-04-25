import { uiStartLoading, uiStopLoading } from './ui';
import startMainTabs from '../../screens/MainTabs/startMainTabs';

const API_KEY = 'AIzaSyCK2rDlKTdc2NZpDXOmiIYfq1NLrL94hls';
const AUTH_URL = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`;

export const tryAuth = (authData) => (dispatch) => {
    dispatch(authSignup(authData));
};

export const authSignup = (authData) => (dispatch) => {
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
        .catch((err) => {
            alert('Something went wrong');
            dispatch(uiStopLoading());
            throw err;
        })
        .then((response) => response.json())
        .then((parsedResponse) => {
            if (parsedResponse.error) {
                alert(`Failed! ${parsedResponse.error.message}`);
            } else {
                startMainTabs();
            }
            dispatch(uiStopLoading());
        });
};
