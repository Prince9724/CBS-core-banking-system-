import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice.js";          // ✅ Sahi
import branchReducer from "../features/branchSlice.js";    // ✅ Sahi
import customerReducer from "../features/customerSlice.js"; // ✅ Sahi
import transactionReducer from "../features/transactionSlice.js"; // ✅ Sahi
import accountReducer from "../features/accountSlice.js";  // ✅ Sahi

const store = configureStore({
    reducer: {
        auth: authSlice,
        branch: branchReducer,
        customer: customerReducer,
        transaction: transactionReducer,
        account: accountReducer,
    }
});

export default store;