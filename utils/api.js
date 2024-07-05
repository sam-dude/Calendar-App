export const listGoogleEvent = async () => {
    try {
        const response = await axios.get('/api/google/list');
        return response.data;
    } catch (error) {
        return error;
    }
    }