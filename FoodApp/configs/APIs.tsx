import axios from 'axios';

const BASE_URL = 'https://wangedoc0602.pythonanywhere.com/'

export const endpoints = {
    'dish' : '/dish/',
    'dish_type' : '/dish_type/',
}

export default axios.create({
    baseURL: BASE_URL
});

