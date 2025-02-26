import axios from 'axios';
import { API_BASE_URL } from './constants';


const apiInstance = axios.create({
    baseURL: API_BASE_URL,
    
    timeout: 100000,

    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export default apiInstance;
