import { alertConstants } from '../constants';
 
export const alertActions = {
    success,
    error,
    clear
};
 
 success = (message) => {
    return { type: alertConstants.SUCCESS, message };
}
 
 error = (message) => {
    return { type: alertConstants.ERROR, message };
}
 
 clear = () => {
    return { type: alertConstants.CLEAR };
}