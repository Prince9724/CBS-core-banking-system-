import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


//1.fetch all admins and branch manager
export const fetchUsers = createAsyncThunk("fetch/admin", async () => {
    try {
        const res = await axios.get("http://localhost:3000/admins")
        return res.data
    } catch (error) {
        throw error
    }
})//1.fetch all admins and branch manager

// 2.get a values from login.jsx what user type in 
export const loginUser = createAsyncThunk("auth/loginUser", async (loginData, thunkAPI) => {
    const users = thunkAPI.getState().auth.users //this line is very important now i am getting the variable where all users we stored.
    if (!loginData.email || !loginData.role || !loginData.password) {
        alert("pls fill the required fields!")
        return;
    }
    const user = users.find((u) => {
        return ( //if user what he typed === our json if exits and it matched so then return to user
            loginData.role === u.role &&
            loginData.email === u.email &&
            loginData.password === u.password
        )
    })
    if (user) {
        thunkAPI.dispatch(setLoggedinUser({ //Inside createAsyncThunk, Redux Toolkit already gives you dispatch.
            id: user.id,
            email: user.email,
            branchId: user.branchId,
            role: user.role
        }))
        localStorage.setItem("isAuthenticated", "true");//now when user is correct fill then this will be store in localstorage.
        alert("login success")
    }
    else {
        alert("invalid input!")
    }
})
const authSlice = createSlice({
    name: "adminauth",
    initialState: {
        users: [], // fetch the all users
        loader: false,
        error: null,
        loggedinUser: null, // current users
        isAuthenticated: false
    },
    reducers: {
        setLoggedinUser: (state, action) => {
            // console.log("loggedInuser: ", action.payload)
            state.loggedinUser = action.payload
            state.isAuthenticated = true
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state, action) => { //fetch-admin
            state.loader = true
        })
            .addCase(fetchUsers.fulfilled, (state, action) => {//fetch-admin
                state.loader = false
                state.users = action.payload
            })
            .addCase(fetchUsers.rejected, (state, action) => {//fetch-admin
                state.loader = false
                state.error = action.error.message
            });//fetch-admin
    }
})
export const { setLoggedinUser } = authSlice.actions
export default authSlice.reducer