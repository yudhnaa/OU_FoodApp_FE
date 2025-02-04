import axios from 'axios';

const BASE_URL = 'https://wangedoc0602.pythonanywhere.com/'

export const endpoints = {
    'dish' : '/dish/',
    'dish_type' : '/dish_type/',
    'list_dish' : (typeId : any) => `/dish_type/${typeId}/dishes/`,
    'dish_topping' : (dishId : any) => `/dish/${dishId}/topping/`,
    'add-to-cart' : '/cart/add-to-cart/',
    'cart_items' : '/cart/items/',
    'payment_type' : '/payment_type/',
    'user_payment' : '/users/payment_methods/',
    'location' : '/users/location/',
    'create_order' : '/create-order-from-selected-cart-items/',
    'deleted_items' : '/cart/delete-multiple/',
    'delete_item' : (id : number) => `/cart/items/${id}/`,
    'order_by_type' : '/users/orders_by_type/',

    // store
    'store_dishes' : '/stores/dishes/', 
    'store_dishes_create' : '/stores/dishes/create/',
    'store_dishes_update' : (dishId : number) => `/stores/dishes/${dishId}/update/`,
    'store_dishes_delete' : (dishId : number) => `/dish/${dishId}/`,
}

export default axios.create({
    baseURL: BASE_URL
});

