import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './reducers/adminReducer';
import categoriesReducer from './reducers/categoriesReducer';
import productReducer from './reducers/productReducer';
import blogReducer from './reducers/blogReducer';
import checkoutReducer from './reducers/checkoutReducer';
import bannerReducer from './reducers/bannerReducer';
import coupenReducer from './reducers/coupenReducer';

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    category: categoriesReducer,
    products: productReducer,
    blogs: blogReducer,
    checkout : checkoutReducer,
    banner : bannerReducer,
    coupen : coupenReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
