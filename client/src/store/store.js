import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducer/authReducer';
import categoryReducer from './reducer/categoryReducer';
import productReducer from './reducer/productReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    products: productReducer,

  },
});

export default store;
