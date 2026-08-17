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
import Reports from "./pages/admin/reports-page/Reports";

// Manager
import ManagerLayout from "./layout/ManagerLayout";
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import ManagerCustomers from "./pages/manager/Customers";
import Accounts from "./pages/manager/Accounts";
import ManagerTransactions from "./pages/manager/ManagerTransactions";
import CashVault from "./pages/manager/CashVault";
import LoanRequests from "./pages/manager/LoanRequests";
import BranchStaff from "./pages/manager/branch-staff-page/BranchStaff";
import Attendance from "./pages/manager/attendance-page/Attendance";
import TransactionHistory from "./pages/teller/TransactionHistory";
import ManagerReports from "./pages/manager/reports-page/ManagerReports";
import ManagerSettings from "./pages/manager/setting-page/ManagerSettings";

// Teller
import TellerLayout from "./layout/TellerLayout";
import TellerDashboard from "./pages/teller/TellerDashboard";
import Deposit from "./pages/teller/Deposit";
import Withdraw from "./pages/teller/Withdraw";
import TellerTransaction from "./pages/teller/TellerTransaction";



export default function App() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

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
        <Route path="reports" element={<Reports />} />
      </Route>

      {/* ================= MANAGER ================= */}
      <Route
        path="/manager/:branchcode"
        element={
          <ProtectedRoutes>
            <ManagerLayout />
          </ProtectedRoutes>
        }
      >
        <Route index element={<ManagerDashboard />} />
        <Route path="customers" element={<ManagerCustomers />} />
        <Route path="accounts" element={<Accounts />} />
        <Route path="transactions" element={<ManagerTransactions />} />
        <Route path="cash-vault" element={<CashVault />} />
        <Route path="loan-request" element={<LoanRequests />} />
        <Route path="branch-staff" element={<BranchStaff />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="reports" element={<ManagerReports />} />
        <Route path="settings" element={<ManagerSettings />} />
      </Route>
      {/* <Route
        path="/manager/:branchcode"
        element={
          <ProtectedRoutes>
            <ManagerDashboard />
          </ProtectedRoutes>
        }
      /> */}

      {/* ================= TELLER ================= */}
      <Route
        path="/teller/:branchcode"
        element={
          <ProtectedRoutes>
            <TellerLayout />
          </ProtectedRoutes>
        }
      >
        <Route index element={<TellerDashboard />} />
        <Route path="deposit" element={<Deposit/>}/>
        <Route path="withdrawal" element={<Withdraw/>}/>
        <Route path="transactions" element={<TellerTransaction/>}/>
      </Route>
      {/* ================= TELLER ================= */}
      {/* <Route
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
      /> */}
    </Routes>
  );
}
