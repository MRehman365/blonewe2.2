import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/getblog");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const getBlogById = createAsyncThunk(
    "blogs/getBlogById",
    async (id, { rejectWithValue }) => {
      try {
        const response = await api.get(`/getblogbyid/${id}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching blog by ID:", error.response);
        return rejectWithValue(
          error.response?.data?.message || "Failed to fetch blog by ID"
        );
      }
    }
  );

const blogsSlice = createSlice({
  name: "blogs",
  initialState: {
    blogsdata: [],
    singleblog: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogsdata = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getBlogById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getBlogById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.singleblog = action.payload;
      })
      .addCase(getBlogById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default blogsSlice.reducer;
