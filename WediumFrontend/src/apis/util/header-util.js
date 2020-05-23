/**
 * Creates header which is attached to request in api
 */
export const createHeader = () => {
    let config = {
        headers: {}
    };

    // If user is logged in, attach authorization token 
    if (localStorage.getItem("user")) {
        const token = JSON.parse(localStorage.getItem("user")).jwtToken;

        if (token) {
            config.headers.Authorization = "Bearer " + token;
        }
    }

    return config;
}