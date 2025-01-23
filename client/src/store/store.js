import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducer/authReducer';
import categoryReducer from './reducer/categoryReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,

  },
});

export default store;
