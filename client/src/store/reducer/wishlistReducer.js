import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

// Async Thunks
export const addToWishlist = createAsyncThunk(
  'wishlist/addToWishlist',
  async ({userId, productId}, { rejectWithValue }) => {
    try {
      const response = await api.post('/addwishlist', {userId, productId});
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteWishlist = createAsyncThunk(
  'wishlist/deleteWishlist',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/deletewishlist/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getWishlist = createAsyncThunk(
  'wishlist/getWishlist',
  async (userId, { rejectWithValue }) => {
    try {
      console.log(userId, 'userid is here')
      const response = await api.get(`/getwishlist/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial State
const initialState = {
  wishlist: [],
  wishlistproduct: [],
  loading: false,
  error: null,
};

// Slice
const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearWishlist: (state) => {
      state.wishlist = [];
    },
    clearWishlistproduct: (state) => {
      state.wishlistproduct = [];
    },
  },
  extraReducers: (builder) => {
    builder
    // Add to Wishlist
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist.push(action.payload);
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    // Delete Wishlist
      .addCase(deleteWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = state.wishlist.filter(
          (item) => item._id !== action.meta.arg
        );
      })
      .addCase(deleteWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    // Get Wishlist
      .addCase(getWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlistproduct = action.payload;
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default wishlistSlice.reducer;
