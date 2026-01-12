import axios from 'axios';

export const patientsApi = axios.create({
    baseURL : 'https://randomuser.me/api'
})