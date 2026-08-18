import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const savedUser = JSON.parse(localStorage.getItem("cbsUser"));

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginData, thunkAPI) => {
    try {
      const res = await axios.post(
        "http://localhost:5003/cbs/signin",
        loginData,
        { withCredentials: true }
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
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
      state.error = null;
      localStorage.removeItem("cbsUser");
    },
    // ✅ Add setUser
    setUser: (state, action) => {
      state.loggedinUser = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("cbsUser", JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loader = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loader = false;
        state.loggedinUser = action.payload.user;
        state.isAuthenticated = true;
        localStorage.setItem("cbsUser", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;