import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

// Thunks for asynchronous operations
export const registerUser = createAsyncThunk(
  'user/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/register', userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/login', userData);
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
  'user/getUserById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/getuserbyid/${id}`);
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
        // console.log(userid, 'id is here')
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch address");
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
};

// User slice
const userSlice = createSlice({
  name: 'user',
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
  },
});

export const { clearError } = userSlice.actions;

export default userSlice.reducer;
