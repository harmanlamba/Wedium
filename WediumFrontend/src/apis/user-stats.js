import axios from "axios";

import { createHeader } from "./util/header-util";

const API_URL = process.env.REACT_APP_API_URL;

export const getUserStats = () => {
    const header = createHeader();

    const endpoint = `${API_URL}/api/user/stats`;

    return axios.get(endpoint, header)
        .then(response => { return response.data });

}
