import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// DEPOSIT
export const depositMoney = createAsyncThunk(
  "transaction/deposite",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(
        "http://localhost:5003/cbs/customer/deposite",
        data,
        { withCredentials: true }
      );

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Deposit failed"
      );
    }
  }
);

// WITHDRAW
export const withdrawMoney = createAsyncThunk(
  "transaction/withdraw",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(
        "http://localhost:5003/cbs/customer/withdraw",
        data,
        { withCredentials: true }
      );

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Withdraw failed"
      );
    }
  }
);

// HISTORY
export const fetchHistory = createAsyncThunk(
  "transaction/history",
  async (accountNumber, thunkAPI) => {
    try {
      const res = await axios.get(
        `http://localhost:5003/cbs/customer/history/${accountNumber}`,
        { withCredentials: true }
      );

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "History fetch failed"
      );
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transactions: [],
    loading: false,
    error: null,
    success: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // deposit
      .addCase(depositMoney.pending, (state) => {
        state.loading = true;
      })
      .addCase(depositMoney.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(depositMoney.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // withdraw
      .addCase(withdrawMoney.pending, (state) => {
        state.loading = true;
      })
      .addCase(withdrawMoney.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(withdrawMoney.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // history
      .addCase(fetchHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload.data || [];
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default transactionSlice.reducer;