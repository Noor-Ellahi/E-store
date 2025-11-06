
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import cartReducer from '../features/carts/cartSlice';
import authReducer from '../features/auth/authSlice'

// import loginSlice from '../features/auth/login/loginSlice';

export const store = configureStore({
    reducer : {
        products : productsReducer,
        cart : cartReducer,
        auth : authReducer
        // login : loginSlice,
    }
});