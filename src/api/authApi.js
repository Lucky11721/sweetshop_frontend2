import api from './axiosConfig';

// Endpoint: POST /api/auth/login
export const loginUser = async (credentials) => {
    // credentials = { email, password }
    const response = await api.post("/auth/login", credentials);
    return response.data;
};

// Endpoint: POST /api/auth/register
export const registerUser = async (userData) => {
    // userData = { username, email, password }
    const response = await api.post("/auth/register", userData);
    return response.data;
};