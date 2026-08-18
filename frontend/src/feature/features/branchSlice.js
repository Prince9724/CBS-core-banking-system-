import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ================= GET ALL BRANCHES =================
export const fetchBranches = createAsyncThunk(
    "branch/fetchBranches",
    async (_, thunkAPI) => {
        try {
            const res = await axios.get(
                "http://localhost:5003/cbs/getbranch",
                { withCredentials: true }
            );

            console.log("BRANCH API:", res.data);

            return res.data.data; // backend ka data array
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch branches"
            );
        }
    }
);

// ================= ADD BRANCH =================
export const addBranch = createAsyncThunk(
    "branch/addBranch",
    async (branchData, thunkAPI) => {
        try {
            const res = await axios.post(
                "http://localhost:5003/cbs/addbranch",
                branchData,
                { withCredentials: true }
            );

            return res.data.data; // new branch object
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to add branch"
            );
        }
    }
);

// ================= DELETE BRANCH =================
export const deleteBranch = createAsyncThunk(
    "branch/deleteBranch",
    async (id, thunkAPI) => {
        try {
            await axios.delete(
                `http://localhost:5003/cbs/deletebranch?id=${id}`,
                { withCredentials: true }
            );

            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to delete branch"
            );
        }
    }
);
export const updateBranch = createAsyncThunk(
    "branch/updateBranch",
    async ({ id, branchData }, thunkAPI) => {
        try {
            const res = await axios.put(
                `http://localhost:5003/cbs/updatebranch/${id}`,
                branchData,
                { withCredentials: true }
            );

            return res.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message);
        }
    }
);
// ================= SLICE =================
const branchSlice = createSlice({
    name: "branch",
    initialState: {
        branches: [],
        loading: false,
        error: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            // FETCH
            .addCase(fetchBranches.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchBranches.fulfilled, (state, action) => {
                state.loading = false;
                state.branches = action.payload; // pura array set karo
            })

            .addCase(fetchBranches.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ADD
            .addCase(addBranch.fulfilled, (state, action) => {
                if (action.payload) {
                    state.branches.push(action.payload);
                }
            })

            // DELETE
            .addCase(deleteBranch.fulfilled, (state, action) => {
                state.branches = state.branches.filter(
                    (branch) => branch._id !== action.payload
                );
            })
            .addCase(updateBranch.fulfilled, (state, action) => {
                state.branches = state.branches.map((branch) =>
                    branch._id === action.payload._id ? action.payload : branch
                );
            })

    },
});

export default branchSlice.reducer;