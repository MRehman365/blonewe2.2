import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducer/authReducer';
import categoryReducer from './reducer/categoryReducer';
import productReducer from './reducer/productReducer';
import wishlistReducer from './reducer/wishlistReducer';
import cartReducer from './reducer/cartReducer';
import blogsReducer from './reducer/blogsReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    products: productReducer,
    wishlist : wishlistReducer,
    cart : cartReducer,
    blogs : blogsReducer,

  },
});

export default store;
