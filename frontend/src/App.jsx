import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import ProtectedRoutes from "./componet-global/ProtectedRoutes";

// Admin
import AdminLayout from "./layout/AdminLayout";
import Home from "./pages/admin/dashboard-page/Home";
import Branch from "./pages/admin/branch-page/Branch";
import BranchDetails from "./pages/admin/branch-page/BranchDetails";
import UsersRoles from "./pages/admin/users and roles/UsersAndRoles";
import Customers from "./pages/admin/customers-page/Customers";
import AdminAccounts from "./pages/admin/account-page/Accounts";
import Transactions from "./pages/admin/Transaction-page/Transactions";

// Manager
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import ManagerCustomers from "./pages/manager/Customers";
import Accounts from "./pages/manager/Accounts";

// Teller
import TellerDashboard from "./pages/teller/TellerDashboard";
import Deposit from "./pages/teller/Deposit";
import Withdraw from "./pages/teller/Withdraw";
import TransactionHistory from "./pages/teller/TransactionHistory";

export default function App() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<Login />} />

      {/* ================= ADMIN ================= */}
      <Route
        path="/admin"
        element={
          <ProtectedRoutes>
            <AdminLayout />
          </ProtectedRoutes>
        }
      >
        <Route index element={<Home />} />
        <Route path="branches" element={<Branch />} />
        <Route path="branch/:id" element={<BranchDetails />} />
        <Route path="users-roles" element={<UsersRoles />} />
        <Route path="customers" element={<Customers />} />
        <Route path="accounts" element={<AdminAccounts />} />
        <Route path="transaction" element={<Transactions />} />
      </Route>

      {/* ================= MANAGER ================= */}
      <Route
        path="/manager/:branchcode"
        element={
          <ProtectedRoutes>
            <ManagerDashboard />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/manager/:branchcode/customers"
        element={
          <ProtectedRoutes>
            <ManagerCustomers />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/manager/:branchcode/accounts"
        element={
          <ProtectedRoutes>
            <Accounts />
          </ProtectedRoutes>
        }
      />

      {/* ================= TELLER ================= */}
      <Route
        path="/teller/:branchcode"
        element={
          <ProtectedRoutes>
            <TellerDashboard />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/teller/:branchcode/deposit"
        element={
          <ProtectedRoutes>
            <Deposit />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/teller/:branchcode/withdraw"
        element={
          <ProtectedRoutes>
            <Withdraw />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/teller/:branchcode/history"
        element={
          <ProtectedRoutes>
            <TransactionHistory />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
}