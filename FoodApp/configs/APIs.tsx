import axios from 'axios';

const BASE_URL = 'https://wangedoc0602.pythonanywhere.com/'

export const endpoints = {
    'dish' : '/dish/',
    'dish_type' : '/dish_type/',
    'list_dish' : typeId => `/dish_type/${typeId}/dishes/`,
    'dish_topping' : dishId => `/dish/${dishId}/topping/`,
    'add-to-cart' : '/cart/add-to-cart/',
    'cart_items' : '/cart/items/',
}

export default axios.create({
    baseURL: BASE_URL
});

