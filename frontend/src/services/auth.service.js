import axios from "axios";

const apiURL = import.meta.env.VITE_APP_API_URL;

const register = async (firstName, surname, username, email, password) => {
    try {
        const response = await axios.post(`${apiURL}/auth/signup`, {
            firstName,
            surname,
            username,
            password,
            email
        });
        const data = await response.data;

        return data;
    }
    catch (error) {
        return { error: error.response.data.message };
    }
};

const login = async (username, password) => {
    try {
        const response = await axios.post(`${apiURL}/auth/signin`, {
            username,
            password,
        });
        const data = await response.data;
        if (data.accessToken) {
            localStorage.setItem(`user`, JSON.stringify(response.data));
        }

        return data;
    }
    catch (error) {
        return { error: error.response.data.message };
    }
};

const logout = () => {
    localStorage.removeItem(`user`);
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem(`user`));
};

const authService = {
    register,
    login,
    logout,
    getCurrentUser
};

export default authService;


