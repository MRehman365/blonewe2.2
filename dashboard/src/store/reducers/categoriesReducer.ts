import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

// Async Thunks with Exception Handling
export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/getcategory");
      console.log("Fetched Categories:", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch categories",
      );
    }
  },
);

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (data: { name: string; image: string }, { rejectWithValue }) => {
    try {
      const response = await api.post("/addcategory", data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add category",
      );
    }
  },
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/deletecategory/${id}`);  // Corrected URL
      return response.data;  // Returning the response as action payload
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete category",
      );
    }
  },
);


export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ id, name }: { id: string; name: string }, { rejectWithValue }) => {
    try {
      const response = await api.put("/api/updatecategory", { id, name });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update category",
      );
    }
  },
);
interface CategoryState {
  categories: string[];
  loading: boolean;
  error: string | null;
}

// Slice
const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [] as Category[],
    loading: false,
    error: null,
  } as CategoryState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.category; // Store only the category array
      })
      
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Add Category
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        console.log('Action Payload:', action.payload);
        if (Array.isArray(state.categories)) {
          state.categories.push(action.payload); 
        }
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
   // Delete Category
.addCase(deleteCategory.pending, (state) => {
  state.loading = true;
})
.addCase(deleteCategory.fulfilled, (state, action) => {
  state.loading = false;
  if (Array.isArray(state.categories)) {
    state.categories.push(action.payload); 
  }
})
.addCase(deleteCategory.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload as string;
})


      // Update Category
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex(
          (category) => category === action.payload.id,
        );
        if (index !== -1) {
          state.categories[index] = action.payload.name;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default categorySlice.reducer;
