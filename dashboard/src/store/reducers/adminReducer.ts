import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const admin_login = createAsyncThunk(
  "auth/admin_login",
  async (info: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/adminlogin", info, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", data.token);
      localStorage.setItem("adminid", data.user.id);
      return data;
    } catch (error: any) {
      console.error("Error response:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  },
);
export const all_users = createAsyncThunk(
  "auth/all_users",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/getallusers");
      console.log("Fetched users:", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users",
      );
    }
  },
);
export const get_admin = createAsyncThunk(
  "auth/single_admin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/getadminbyid");
      console.log("Fetched admin:", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user",
      );
    }
  },
);
export const get_admin_Bio = createAsyncThunk(
  "auth/admin_bio",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/getadminDetails");
      console.log("Fetched admin:", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user",
      );
    }
  },
);

export const update_admin_details = createAsyncThunk(
  "auth/update_admin_details",
  async (
    { adminId, email, username, bio, image, fullName, phone },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("/updatedetails", {
        adminId,
        email,
        username,
        bio,
        image,
        fullName,
        phone,
      });

      return response.data; // Return updated admin data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update admin details"
      );
    }
  }
);

interface AuthState {
  loader: boolean;
  errorMessage: string;
  successMessage: string;
  adminDetail: string | null; // Admin details
  adminInfo: string | null; // Admin info
  adminbio: string | null; // Admin info
  users: Array<any>; // All users data
}

// Initial State
const initialState: AuthState = {
  loader: false,
  errorMessage: "",
  successMessage: "",
  adminDetail: null,
  adminInfo: null,
  users: [],
};

const authSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    admin_reset: (state) => {
      state.adminInfo = null;
      state.adminDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(admin_login.pending, (state) => {
        state.loader = true;
      })
      .addCase(admin_login.fulfilled, (state, { payload }) => {
        if (payload) {
          // Ensure payload exists
          state.payload = payload;
          state.successMessage = payload.message || "";
        }
        state.loader = false;
      })
      .addCase(admin_login.rejected, (state, { payload }) => {
        state.errorMessage = (payload as any)?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(all_users.pending, (state) => {
        state.loader = true;
      })
      .addCase(all_users.fulfilled, (state, { payload }) => {
        state.users = payload; // Save fetched users to the state
        state.successMessage = "Users fetched successfully";
        state.loader = false;
      })
      .addCase(all_users.rejected, (state, { payload }) => {
        state.errorMessage = (payload as string) || "Failed to fetch users";
        state.loader = false;
      })
      .addCase(get_admin.pending, (state) => {
        state.loader = true;
      })
      .addCase(get_admin.fulfilled, (state, { payload }) => {
        state.adminInfo = payload; // Save fetched users to the state
        state.successMessage = "Users fetched successfully";
        state.loader = false;
      })
      .addCase(get_admin.rejected, (state, { payload }) => {
        state.errorMessage = (payload as string) || "Failed to fetch users";
        state.loader = false;
      })
      .addCase(get_admin_Bio.pending, (state) => {
        state.loader = true;
      })
      .addCase(get_admin_Bio.fulfilled, (state, { payload }) => {
        state.adminbio = payload; // Save fetched users to the state
        state.successMessage = "Users fetched successfully";
        state.loader = false;
      })
      .addCase(get_admin_Bio.rejected, (state, { payload }) => {
        state.errorMessage = (payload as string) || "Failed to fetch users";
        state.loader = false;
      });
  },
});

export default authSlice.reducer;
