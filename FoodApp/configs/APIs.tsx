import axios from 'axios';
import {getObjectValue} from "@/components/asyncStorage";

const BASE_URL = 'http://localhost:8000/';

export const endpoints = {
    'register': '/users/',
    'login': '/o/token/',
    'roles': '/users/roles/',
    'get_user': '/users/current-user/',

    'dish': '/dish/',
    'dish_type': '/dish_type/',
    'list_dish': (typeId: any) => `/dish_type/${typeId}/dishes/`,
    'dish_topping': (dishId: any) => `/dish/${dishId}/topping/`,

}


export const authApi = async () => {
    const getOauth2Token = async () => {
        const oauth2Token = await getObjectValue('oauth2-token');
        return oauth2Token;
    }

    const oauth2Token = await getOauth2Token().then((res) => res.access_token);

    console.log(oauth2Token);

    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Authorization': 'Bearer ' + oauth2Token
        }
    });
}


export default axios.create({
    baseURL: BASE_URL
});

