import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/redux/states/authSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default store;
