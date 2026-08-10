import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5003/cbs/customer";

// Deposit
export const fetchDeposit = createAsyncThunk(
  "transaction/deposit",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(
        `${API}/deposite`,
        data,
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

// Withdraw
export const fetchWithdraw = createAsyncThunk(
  "transaction/withdraw",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(
        `${API}/withdraw`,
        data,
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

// History
export const fetchHistory = createAsyncThunk(
  "transaction/history",
  async (accountNumber, thunkAPI) => {
    try {
      if (!accountNumber) {
        return thunkAPI.rejectWithValue("Account number is required");
      }

      const res = await axios.get(
        `${API}/history/${accountNumber}`,
        { withCredentials: true }
      );

      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    history: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default transactionSlice.reducer;