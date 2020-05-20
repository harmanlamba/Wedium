export const createHeader = () => {
    let config = {
        headers: {}
    };

    if (localStorage.getItem("user")) {
        const token = JSON.parse(localStorage.getItem("user")).jwtToken;

        if (token) {
            config.headers.Authorization = "Bearer " + token;
        }
    }

    return config;
}
