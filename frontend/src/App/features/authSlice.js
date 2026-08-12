import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const savedUser = JSON.parse(localStorage.getItem("cbsUser"));

// LOGIN API
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginData, thunkAPI) => {
    try {
      const res = await axios.post(
        "http://localhost:5003/cbs/signin",
        loginData,
        {
          withCredentials: true,
        }
      );

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loggedinUser: savedUser || null,
    isAuthenticated: !!savedUser,
    loader: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.loggedinUser = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loader = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("LOGIN RESPONSE:", action.payload);

        state.loader = false;
        state.loggedinUser = action.payload.user;
        state.isAuthenticated = true;

        // 🔥 important
        localStorage.setItem(
          "cbsUser",
          JSON.stringify(action.payload.user)
        );
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload;
      });
  },
});
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await axios.post(
        "http://localhost:5003/cbs/logout",
        {},
        { withCredentials: true }
      );
      return true;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const { logout } = authSlice.actions;
export default authSlice.reducer;