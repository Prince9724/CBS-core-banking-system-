import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    accountNumber: String,

    customerName: String,

    type: {
      type: String,
      enum: ["Deposit", "Withdraw"],
    },

    amount: Number,

    balanceAfter: Number,

    branchcode: String,

    branchname: String,

    // kisne transaction kiya
    performedBy: {
      type: String,
    },

    performedByRole: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "Transaction",
  transactionSchema
);