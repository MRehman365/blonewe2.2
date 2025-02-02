import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

interface BannerState {
  banner: any | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: BannerState = {
  banner: null,
  loading: false,
  error: null,
};

// Async thunk to fetch banners
export const fetchBanners = createAsyncThunk(
  "banner/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        '/getbanner',
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch banners",
      );
    }
  },
);

// Async thunk to add/update banner
export const addOrUpdateBanner = createAsyncThunk(
  "banner/addOrUpdate",
  async (bannerData: any, { rejectWithValue }) => {
    try {
      const response = await api.post(
        '/addbanner',
        bannerData,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update banner",
      );
    }
  },
);

// Slice
const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch banners
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banner = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Add/Update banner
      .addCase(addOrUpdateBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOrUpdateBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.banner = action.payload;
      })
      .addCase(addOrUpdateBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default bannerSlice.reducer;
