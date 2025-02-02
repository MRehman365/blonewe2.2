import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

const API_URL = "YOUR_BACKEND_URL/api/checkout"; // Update with your actual backend URL

// Fetch all checkouts
export const fetchCheckouts = createAsyncThunk(
  "checkout/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/getallcheckouts');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  },
);

// Update a checkout
export const updateCheckout = createAsyncThunk(
  "checkout/update",
  async ({ id, payment_status, delivery_status }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/updatecheckouts/${id}`,
        {payment_status, delivery_status},
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  },
);

// Delete a checkout
export const deleteCheckout = createAsyncThunk(
  "checkout/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/deletecheckouts/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  },
);

interface CheckoutState {
  checkouts: any[];
  loading: boolean;
  error: string | null;
}

const initialState: CheckoutState = {
  checkouts: [],
  loading: false,
  error: null,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCheckouts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCheckouts.fulfilled, (state, action) => {
        state.loading = false;
        state.checkouts = action.payload;
      })
      .addCase(fetchCheckouts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.checkouts = action.payload;
      })
      .addCase(updateCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.checkouts = action.payload;
      })
      .addCase(deleteCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default checkoutSlice.reducer;
