import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

// Async Thunks
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/allproduct`);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error.response);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/getproduct/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product by ID:", error.response);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch product by ID"
      );
    }
  }
);

export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async (query, { rejectWithValue }) => {
      try {
          const response = await api.get(`/search?query=${query}`);
          return response.data;
      } catch (error) {
          console.error("Error in searchProducts thunk:", error);
          return rejectWithValue(
              error.response?.data?.message || "Failed to search products"
          );
      }
  }
);

export const fetchFilteredProducts = createAsyncThunk(
  "filterProducts/fetchFilteredProducts",
  async ({ categories, sortBy, page }, { rejectWithValue }) => {
    try {
      const response = await api.get("/filterproduct", {
        params: { categories: categories.join(","), sortBy, page },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const customer_review = createAsyncThunk(
  "review/customer_review",
  async (info, { fulfillWithValue }) => {
    try {
      const { data } = await api.post("/submit-review", info);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const get_reviews = createAsyncThunk(
  "review/get_reviews",
  async ({ productId }, { fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/get-reviews/${productId}`
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {}
    return rejectWithValue(error.response?.data || "Something went wrong");
  }
);



// Initial State
const initialState = {
  products: [],
  singleproduct: [],
  filteredProducts: [], 
  shopproducts: [], 
  product: null,
  loading: false,
  error: null,
  successMessage: "",
  totalReview: 0,
  rating_review: [],
  reviews: [],
};

// Products Slice
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearProduct: (state) => {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    // Handle getProducts
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle getProductById
    builder
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleproduct = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredProducts = action.payload.products; 
      })
      .addCase(searchProducts.rejected, (state, action) => {
        console.error("Search products rejected:", action.payload);
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(fetchFilteredProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    })
    .addCase(fetchFilteredProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // review
    .addCase(customer_review.fulfilled, (state, { payload }) => {
      state.successMessage = payload.message;
    })

    .addCase(get_reviews.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(get_reviews.fulfilled, (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
      state.rating_review = action.payload;
    })
    .addCase(get_reviews.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
  },
});

export const { clearError, clearProduct, clearFilteredProducts } = productsSlice.actions;

export default productsSlice.reducer;