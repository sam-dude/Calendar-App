import axios from "axios";

export const BASE_URL = 'https://proficient-calendar-app.vercel.app/api';

export const listGoogleEvent = async () => {
    try {
        const response = await axios.get('/api/google/list');
        return response.data;
    } catch (error) {
        return error;
    }
    }

export const login = async (username, password) => {
    try {
        console.log(username, password)
        const response = await axios.post(`${BASE_URL}/users/login`, { username, password });
        return response.data;
    } catch (error) {
        console.error(error.response.data)
        return error;
    }
}
