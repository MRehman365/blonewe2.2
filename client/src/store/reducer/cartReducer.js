import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

// Async Thunks
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (cartData, { rejectWithValue }) => {
    try {
      const response = await api.post("/addtocart", cartData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCart = createAsyncThunk(
  "cart/getCart",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/getcart/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCart = createAsyncThunk(
  "cart/deleteCart",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/deletecart/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const increaseQuantity = createAsyncThunk(
  "cart/increaseQuantity",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.put(`/increasequantity/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const decreaseQuantity = createAsyncThunk(
  "cart/decreaseQuantity",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.put(`/decreasequantity/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCouponByCode = createAsyncThunk(
  "coupon/fetchByCode",
  async (code, { rejectWithValue }) => {
    try {
      const response = await api.get(`/getcoupen/${code}`);
      return response.data.coupon;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

// Initial State
const initialState = {
  cart: [],
  cartlist: [],
  loading: false,
  error: null,
  coupon: null,
};

// Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCart: (state) => {
      state.cart = [];
    },
    clearCartlist: (state) => {
      state.cartlist = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Cart
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartlist = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Cart
      .addCase(deleteCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = state.cart.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Increase Quantity
      .addCase(increaseQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(increaseQuantity.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.cart.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.cart[index].quantity += 1;
        }
      })
      .addCase(increaseQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Decrease Quantity
      .addCase(decreaseQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.cart.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1 && state.cart[index].quantity > 1) {
          state.cart[index].quantity -= 1;
        }
      })
      .addCase(decreaseQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // coupen

      .addCase(fetchCouponByCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCouponByCode.fulfilled, (state, action) => {
        state.loading = false;
        state.coupon = action.payload;
      })
      .addCase(fetchCouponByCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = cartSlice.actions;

export default cartSlice.reducer;
