import { uiStopLoading } from './index';

export const handleHttpError = (response, dispatch) => {
    if (!response.ok) {
        dispatch(uiStopLoading());
        throw new Error(`Request rejected with status ${response.status}`);
    } else {
        return response;
    }
};