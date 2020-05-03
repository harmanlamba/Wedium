export const createHeader = () => {
    if (!localStorage.getItem("user")) {
        return null;
    }

    const token = JSON.parse(localStorage.getItem("user")).jwtToken;

    if (!token) {
        return null;
    }

    return {
        headers: {
            "Authorization": "Bearer " + token
        }
    };
}
