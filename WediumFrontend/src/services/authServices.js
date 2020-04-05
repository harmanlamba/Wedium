import jwt from 'jsonwebtoken';

export function UserIsValid(token) {
    if (token.isAuthenticated) {
        const decodedToken = jwt.decode(token.user);
        const dateNow = new Date()

        if (decodedToken.exp > dateNow.getTime() / 1000) {
            return true;
        } else {
            return false;
        }
    }

    return false;
}