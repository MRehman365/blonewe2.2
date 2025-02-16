import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

// Thunks for asynchronous operations
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/register", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/login", userData);
      localStorage.setItem("myToken", data.token);
      localStorage.setItem("userid", data.user.id);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// New thunk for getUserById
export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (userIdObj, { rejectWithValue }) => {
    // Extract userId from the object
    const userId = userIdObj.userId;
    console.log(userId, 'id is console here'); // Should log: 6791e79c99b9cbd25148039d

    try {
      const response = await api.get(`/getuserbyid/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addUserAddress = createAsyncThunk(
  "user/addUserAddress",
  async (addressData, { rejectWithValue }) => {
    try {
      const response = await api.post("/adduseraddress", addressData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add address");
    }
  }
);

// Get address by ID
export const getAddressById = createAsyncThunk(
  "user/getAddressById",
  async (userid, { rejectWithValue }) => {
    try {
      const response = await api.get(`/getaddressbyid/${userid}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch address");
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "auth/me",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/me", { withCredentials: true });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async ({ email, password, newPassword, confirmPassword }, { rejectWithValue }) => {
    try {
      const response = await api.post("/updatepassword", {
        email,
        password,
        newPassword,
        confirmPassword,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sendContactForm = createAsyncThunk(
  "contact/sendContactForm",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/contact", // Update with your API endpoint
        formData
      );
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to send message");
    }
  }
);

// Initial state
const initialState = {
  user: null,
  loading: false,
  error: null,
  singleuser: null,
  useraddress: null,
  userDetail: null,
  message: null,
};

// User slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register user
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login user
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get user by ID
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleuser = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add user address
      .addCase(addUserAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUserAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.useraddress = action.payload;
      })
      .addCase(addUserAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get address by ID
      .addCase(getAddressById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAddressById.fulfilled, (state, action) => {
        state.loading = false;
        state.useraddress = action.payload;
      })
      .addCase(getAddressById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getUserDetails.pending, (state) => {
        state.loader = true;
      })
      .addCase(getUserDetails.rejected, (state, { payload }) => {
        // console.log('Login rejected payload:', payload); // Log payload
        state.errorMessage = payload?.error || "An error occurred";
        state.loader = false;
      })
      .addCase(getUserDetails.fulfilled, (state, { payload }) => {
        let userDetail = payload.data;
        state.successMessage = payload.message;
        state.loader = false;
        state.userDetail = userDetail;
      })

      // update password

      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // contact from 
      .addCase(sendContactForm.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(sendContactForm.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(sendContactForm.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = userSlice.actions;

export default userSlice.reducer;
