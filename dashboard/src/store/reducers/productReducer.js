
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/addproduct`, formData);
      return response.data;
    } catch (error) {
      console.log(error.response);
    }
  },
);

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/allproduct`);
      return response.data;
    } catch (error) {
      // Custom error handling
      console.log(error.response);
    }
  },
);

export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/getproduct/${id}`);
      return response.data;
    } catch (error) {
      // Custom error handling
      console.log(error.response);
    }
  },
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/updateproduct/${id}`, formData);
      return response.data;
    } catch (error) {
      // Custom error handling
      console.log(error.response);
    }
  },
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/deleteproduct/${id}`);
      return response.data;
    } catch (error) {
      // Custom error handling
      console.log(error.response);
    }
  },
);

// Create slice
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    product: null,
    updateProduct: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle addProduct
    builder
      .addCase(addProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log('Action Payload:', action.payload);
        if (Array.isArray(state.products)) {
          state.products.push(action.payload); 
        }
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; 
      })

      .addCase(getProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Display the error message
      })

      .addCase(getProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Display the error message
      })

      .addCase(updateProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.updatedProduct = action.payload; // Store the updated product data in a separate state key
      })
      
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Display the error message
      })

      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (Array.isArray(state.product)) {
          state.product.push(action.payload); 
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Display the error message
      });
  },
});

// Export reducer
export default productSlice.reducer;
