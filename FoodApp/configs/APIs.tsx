import axios from 'axios';
import {getObjectValue} from "@/components/asyncStorage";

const BASE_URL = 'http://192.168.1.10:8000/';

export const endpoints = {
    'register': '/users/',
    'login': '/o/token/',
    'roles': '/users/roles/',
    'get_user': '/users/current_user/',
    'logout': '/o/revoke_token/',

    "payment_methods": '/user/payment_methods/',
    "set_default_payment_method": "/user/payment_methods/set_default_payment_method/",
    "remove_payment_method": "/user/payment_methods/",
    "get_payment_type": "/payment_methods/",

    'address': '/user_addresses/',

    'notification': '/user/notifications/',
    // 'read_notification': '/user/notifications/mark_as_read/',


    'dish': '/dish/',
    'dish_type': '/dish_type/',
    'list_dish': (typeId: any) => `/dish_type/${typeId}/dishes/`,
    'dish_topping': (dishId: any) => `/dish/${dishId}/topping/`,

}


export const authApi = (access_token:string) => {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    });
}


export default axios.create({
    baseURL: BASE_URL
});

