import axios from 'axios';
import { getObjectValue } from "@/components/asyncStorage";

// const BASE_URL = 'https://wangedoc0602.pythonanywhere.com/'
// const BASE_URL = 'https://yudhna.dynamic-dns.net/';
const BASE_URL = 'http://192.168.1.23:8000/';

export const endpoints = {
    'dish': '/dish/',
    'dish_by_store': '/dish/get-by-store/',
    'dish_type': '/dish_type/',
    'list_dish': (typeId: any) => `/dish_type/${typeId}/dishes/`,
    'dish_topping': (dishId: any) => `/dish/${dishId}/topping/`,

    'add-to-cart': '/cart/add-to-cart/',
    'cart_items': '/cart/items/',

    'payment_type': '/payment_type/',
    'user_payment': '/users/payment_methods/',
    'location': '/users/location/',
    'create_order': '/create-order-from-selected-cart-items/',
    'deleted_items': '/cart/delete-multiple/',
    'delete_item': '/cart/items/',
    'order_by_type': '/user/orders_by_type/',
    'user_order': '/user/orders/',
    'change_password': '/users/change_password/',

    "dish_review": "/dish-review/",

    'register': '/users/',
    'login': '/o/token/',
    'update_user': '/users/',
    'roles': '/users/roles/',
    'get_user': '/users/current_user/',
    'logout': '/o/revoke_token/',

    'google_signin': '/firebase/auth/google/authenticate/',
    'update_google_user_info': '/firebase/auth/google/',

    "payment_methods": '/user/payment_methods/',
    "set_default_payment_method": "/user/payment_methods/set_default_payment_method/",
    "remove_payment_method": "/user/payment_methods/",
    "get_payment_type": "/payment_methods/",

    'address': '/user/addresses/',

    'notification': '/user/notifications/',

    'following': '/users/following_store/',
    'follow': '/user/follow/',
    'get_store': '/store/',
    'follow_store': '/user/follow/',
    'unfollow_store': '/user/follow/',
    'is_following': '/user/follow/is_follow/',

    'questionAnswer': '/question_and_answer/',
    'contact': '/contact/',

    'send_otp': '/twilio/send-sms-otp/',
    'verify_otp': '/twilio/verify-sms-otp/',

    'momo_payment': "/momo-payment/create-payment/",
    'check_order_status': "/user/order/check_status/",

    'search': '/search/',

    // store
    'store_dishes': '/stores/dishes/',
    'store_dishes_create': '/stores/dishes/create/',
    'store_dishes_update': (dishId: number) => `/stores/dishes/${dishId}/update/`,
    'store_dishes_delete': (dishId: number) => `/dish/${dishId}/`,

    'store_orders': '/stores/orders/',
    'store_order_detail': (orderId: number) => `/stores/orders/${orderId}/`,
    'store_order_update': (orderId: number) => `/stores/orders/${orderId}/update/`,
}


export const authApi = (access_token: string) => {
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

