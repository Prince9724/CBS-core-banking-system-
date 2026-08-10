import express from "express"
import { addCustomer, deleteCustomer, searchCustomers ,getCustomer, updateCustomer } from "../controller/customerCotroller.js";
import { authMiddleware } from "../middleware/auth.js";
import { managerOnly } from "../middleware/managerOnly.js";
import { getAccounts, openAccount, searchAccount } from "../controller/accountController.js";
import { deposite, getHistory, withdraw } from "../controller/transactionController.js";

const CustomerRoute = express.Router();
CustomerRoute.post("/add", authMiddleware, managerOnly, addCustomer)
CustomerRoute.get("/get", authMiddleware, getCustomer);
CustomerRoute.put("/update/:id", updateCustomer);
CustomerRoute.delete("/delete/:id", deleteCustomer);
CustomerRoute.get(
    "/search",
    authMiddleware,
    searchCustomers
)

CustomerRoute.post("/openaccount", authMiddleware ,openAccount)
CustomerRoute.get(
  "/accounts",authMiddleware,getAccounts);
CustomerRoute.post("/deposit", authMiddleware, deposite);
CustomerRoute.post("/withdraw", authMiddleware, withdraw);
CustomerRoute.get("/history/:accountNumber", authMiddleware, getHistory);
CustomerRoute.get("/search",authMiddleware,searchCustomers)
CustomerRoute.get("/account-search",authMiddleware,searchAccount)
export default CustomerRoute;