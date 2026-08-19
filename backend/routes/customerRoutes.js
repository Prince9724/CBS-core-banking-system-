import express from "express";
import { addCustomer, deleteCustomer, searchCustomers, getCustomer, updateCustomer } from "../controller/customerCotroller.js";
import { authMiddleware } from "../middleware/auth.js";
import { managerOnly } from "../middleware/managerOnly.js";
import { getAccounts, openAccount, searchAccount, verifyAccountPassword } from "../controller/accountController.js";
// ✅ FIXED: deposite → deposit
import { deposit, getHistory, getTransactionById, withdraw } from "../controller/transactionController.js";
import { getManagerDashboard } from "../controller/dashboardController.js";
import { getTodayTransactions } from "../controller/transactionController.js";

const CustomerRoute = express.Router();

CustomerRoute.post("/add", authMiddleware, managerOnly, addCustomer);
CustomerRoute.get("/get", authMiddleware, getCustomer);
CustomerRoute.put("/update/:id", updateCustomer);
CustomerRoute.delete("/delete/:id", deleteCustomer);

CustomerRoute.get("/search", authMiddleware, searchCustomers);

CustomerRoute.get(
  "/manager-dashboard/:branchcode",
  authMiddleware,
  getManagerDashboard
);

CustomerRoute.post("/openaccount", authMiddleware, openAccount);
CustomerRoute.get("/accounts", authMiddleware, getAccounts);

// ✅ FIXED: deposite → deposit
CustomerRoute.post("/deposit", authMiddleware, deposit);

CustomerRoute.post("/withdraw", authMiddleware, withdraw);
CustomerRoute.get("/history/:accountNumber", authMiddleware, getHistory);
CustomerRoute.get("/account-search", authMiddleware, searchAccount);
CustomerRoute.get("/today-transactions", authMiddleware, getTodayTransactions);
CustomerRoute.get("/transaction/:id", authMiddleware, getTransactionById);
CustomerRoute.post("/verify-password", authMiddleware, verifyAccountPassword);

export default CustomerRoute;