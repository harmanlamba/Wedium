import jwt from 'jsonwebtoken';

/**
 * Used for when jwt token is received from user's state
 * in order to determine if user is rightfully logged in 
 * by checking user's jwt token validity 
 */
export const authTokenIsValid = (token) => {

    // Check if authorization token is valid via using jwt library 
    if (token) {
        const decodedToken = jwt.decode(token);
        const dateNow = new Date().getTime();
        return (decodedToken.exp > dateNow / 1000);
    }

    return false;
}