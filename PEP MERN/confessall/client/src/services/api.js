import axios from 'axios';

const API_URL = 'http://localhost:5000/api/confessions';

export const getConfessions = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createConfession = async (confessionData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL, confessionData, config);
    return response.data;
};

export const updateConfession = async (id, data) => {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
};

export const deleteConfession = async (id, secretCode) => {
    // Sending secretCode in body for delete, requires 'data' key in axios config
    const response = await axios.delete(`${API_URL}/${id}`, {
        data: { secretCode }
    });
    return response.data;
};

export const reactToConfession = async (id, reactionType) => {
    const response = await axios.post(`${API_URL}/${id}/react`, { reactionType });
    return response.data;
};
