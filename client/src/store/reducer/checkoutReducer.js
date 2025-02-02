import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

const BASE_URL = "your_backend_url"; // Replace with actual backend URL

// Async thunk to create a checkout
export const createCheckout = createAsyncThunk(
  "checkout/createCheckout",
  async (checkoutData, { rejectWithValue }) => {
    try {
      const response = await api.post('/createcheckouts', checkoutData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const getCheckoutById = createAsyncThunk(
  "checkout/getCheckoutById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/getcheckouts/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    checkouts: [],
    checkout: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      // Create Checkout
      .addCase(createCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.checkouts.push(action.payload);
      })
      .addCase(createCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Checkout by ID
      .addCase(getCheckoutById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCheckoutById.fulfilled, (state, action) => {
        state.loading = false;
        state.checkout = action.payload;
      })
      .addCase(getCheckoutById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default checkoutSlice.reducer;
