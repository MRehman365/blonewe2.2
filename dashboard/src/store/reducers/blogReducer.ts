import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";


export const addBlog = createAsyncThunk(
  "blogs/addBlog",
  async (blogData: any, { rejectWithValue }) => {
    try {
      const response = await api.post("/addblog", blogData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const getBlogs = createAsyncThunk(
  "blogs/getBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/getblog");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/deleteblog/${id}`,);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Blogs Slice
const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {}, // No additional reducers for now
  extraReducers: (builder) => {
    builder
      // Add Blog
      .addCase(addBlog.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addBlog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Get Blogs
      .addCase(getBlogs.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogs = action.payload; // Save the blogs in the state
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Delete Blog
      .addCase(deleteBlog.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default blogSlice.reducer;
