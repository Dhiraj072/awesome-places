import { uiStartLoading, uiStopLoading } from './ui';
import startMainTabs from '../../screens/MainTabs/startMainTabs';

const API_KEY = 'AIzaSyCK2rDlKTdc2NZpDXOmiIYfq1NLrL94hls';
let AUTH_URL;

// Login user. Sign up and then login for a new user
const tryAuth = (authData, authMode) => (dispatch) => {
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

export default tryAuth;
