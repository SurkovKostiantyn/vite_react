// redux
import {configureStore} from '@reduxjs/toolkit';
import likesReducer from '@/components/likesSlice.js';

const store = configureStore({
    reducer: {
        likes: likesReducer,
    },
});

export default store;
