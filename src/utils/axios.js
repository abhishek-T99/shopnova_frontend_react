import axios from 'axios';


const apiInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    
    timeout: 100000,

    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export default apiInstance;
