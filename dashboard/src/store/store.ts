import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './reducers/adminReducer';
import categoriesReducer from './reducers/categoriesReducer';
import productReducer from './reducers/productReducer';
import blogReducer from './reducers/blogReducer';

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    category: categoriesReducer,
    products: productReducer,
    blogs: blogReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
