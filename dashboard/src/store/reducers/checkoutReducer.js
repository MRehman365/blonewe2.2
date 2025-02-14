import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

const API_URL = "YOUR_BACKEND_URL/api/checkout"; // Update with your actual backend URL

// Fetch all checkouts
export const fetchCheckouts = createAsyncThunk(
  "checkout/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/getallcheckouts");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

// Update a checkout
export const updateCheckout = createAsyncThunk(
  "checkout/update",
  async ({ id, payment_status, delivery_status }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/updatecheckouts/${id}`, {
        payment_status,
        delivery_status,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

// Delete a checkout
export const deleteCheckout = createAsyncThunk(
  "checkout/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/deletecheckouts/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

// Initial state
const initialState = {
  checkouts: [], // Array to store checkouts
  loading: false, // Loading state
  error: null, // Error state
};

// Slice
const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {}, // No additional reducers for now
  extraReducers: (builder) => {
    builder
      // Fetch Checkouts
      .addCase(fetchCheckouts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCheckouts.fulfilled, (state, action) => {
        state.loading = false;
        state.checkouts = action.payload; // Store fetched checkouts
      })
      .addCase(fetchCheckouts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set error message
      })

      // Update Checkout
      .addCase(updateCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCheckout.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCheckout = action.payload;
        state.checkouts = state.checkouts.map((checkout) =>
          checkout.id === updatedCheckout.id ? updatedCheckout : checkout
        ); // Update the specific checkout
      })
      .addCase(updateCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set error message
      })

      // Delete Checkout
      .addCase(deleteCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.checkouts = state.checkouts.filter(
          (checkout) => checkout.id !== action.payload
        ); // Remove deleted checkout
      })
      .addCase(deleteCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set error message
      });
  },
});

export default checkoutSlice.reducer;