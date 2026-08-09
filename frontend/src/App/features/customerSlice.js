import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5003/cbs/customer";

// GET
export const fetchCustomers = createAsyncThunk(
    "customer/fetchCustomers",
    async () => {
        const res = await axios.get(`${API}/get`, {
            withCredentials: true,
        });

        return res.data.data;
    }
);

// ADD
export const addCustomer = createAsyncThunk(
    "customer/addCustomer",
    async (data) => {
        const res = await axios.post(`${API}/add`, data, {
            withCredentials: true,
        });

        return res.data.data;
    }
);

// UPDATE
export const updateCustomer = createAsyncThunk(
    "customer/updateCustomer",
    async ({ id, data }) => {
        const res = await axios.put(`${API}/update/${id}`, data, {
            withCredentials: true,
        });

        return res.data.data;
    }
);

// DELETE
export const deleteCustomer = createAsyncThunk(
    "customer/deleteCustomer",
    async (id) => {
        await axios.delete(`${API}/delete/${id}`, {
            withCredentials: true,
        });

        return id;
    }
);

const customerSlice = createSlice({
    name: "customer",
    initialState: {
        customers: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomers.fulfilled, (state, action) => {
                state.customers = action.payload;
            })

            .addCase(addCustomer.fulfilled, (state, action) => {
                state.customers.unshift(action.payload);
            })

            .addCase(updateCustomer.fulfilled, (state, action) => {
                state.customers = state.customers.map((c) =>
                    c._id === action.payload._id ? action.payload : c
                );
            })

            .addCase(deleteCustomer.fulfilled, (state, action) => {
                state.customers = state.customers.filter(
                    (c) => c._id !== action.payload
                );
            });
    },
});

export default customerSlice.reducer;