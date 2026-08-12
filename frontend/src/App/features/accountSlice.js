import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAccounts = createAsyncThunk(
  "account/fetchAccounts",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        "http://localhost:5003/cbs/customer/accounts",
        { withCredentials: true }
      );

      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState: {
    accounts: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccounts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = action.payload;
      });
  },
});

export default accountSlice.reducer;
