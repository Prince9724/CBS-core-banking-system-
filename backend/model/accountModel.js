// import mongoose from "mongoose";

// const accountSchema = new mongoose.Schema({

//     customerId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Customer",
//         required: true
//     },
//     accountNumber: {
//         type: String,
//         required: true,
//         unique: true   // unic rhega  duplicate nahi hoga
//     },

//     accountType: {
//         type: String,
//         enum: ["Savings", "Current"],
//         default: "Savings"
//     },

//     balance: {
//         type: Number,
//         default: 0
//     },

//     branchname: String,
//     branchcode: String

// }, { timestamps: true });

// export default mongoose.model("Account", accountSchema);

import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    accountNumber: {
        type: String,
        required: true,
        unique: true
    },
    accountType: {
        type: String,
        enum: ["Savings", "Current"],
        default: "Savings"
    },
    balance: {
        type: Number,
        default: 0
    },
    branchname: String,
    branchcode: String,
    // ✅ NEW - Account Password (Optional)
    accountPassword: {
        type: String,
        default: null   // null means no password set
    },
    status: {
        type: String,
        enum: ["Active", "Inactive", "Frozen"],
        default: "Active"
    }
}, { timestamps: true });

export default mongoose.model("Account", accountSchema);