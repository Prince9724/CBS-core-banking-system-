import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice"
import branchReducer from "../features/branchSlice.js"
import customerReducer from "../features/customerSlice";
import transactionReducer from "../features/transactionSlice";
const store = configureStore({
    reducer: {
        auth: authSlice,
        branch: branchReducer,
        customer: customerReducer,
        transaction: transactionReducer,

    }
})
export default store