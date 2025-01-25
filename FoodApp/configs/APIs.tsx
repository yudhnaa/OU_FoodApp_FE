import axios from 'axios';

const BASE_URL = 'http://localhost:8000/';

export const endpoints = {
    'register': '/users/',
    'login': '/o/token/',
    'roles': '/users/roles/',

    'dish': '/dish/',
    'dish_type': '/dish_type/',
    'list_dish': (typeId: any) => `/dish_type/${typeId}/dishes/`,
    'dish_topping': (dishId: any) => `/dish/${dishId}/topping/`,

}

export const authApi = () => {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });
}


export default axios.create({
    baseURL: BASE_URL
});

