import jwt from 'jsonwebtoken';

export const authTokenIsValid = (token) => {
    if (token) {
        const decodedToken = jwt.decode(token);
        const dateNow = new Date().getTime();
        return (decodedToken.exp > dateNow / 1000);
    }

    return false;
}
