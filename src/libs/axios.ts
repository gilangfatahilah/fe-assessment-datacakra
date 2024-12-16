import axios, { AxiosInstance } from "axios";
import cookies from 'js-cookie'


export const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? process.env.API_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

// Apply token every request happen.
axiosInstance.interceptors.request.use((config) => {
    const token = cookies.get('jwt_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});