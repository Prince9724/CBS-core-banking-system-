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
<<<<<<< HEAD
import Reports from "./pages/admin/reports-page/Reports";
=======

// Manager
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import ManagerCustomers from "./pages/manager/Customers";
import Accounts from "./pages/manager/Accounts";
>>>>>>> origin/master

// Teller
import TellerDashboard from "./pages/teller/TellerDashboard";
import Deposit from "./pages/teller/Deposit";
import Withdraw from "./pages/teller/Withdraw";
import TransactionHistory from "./pages/teller/TransactionHistory";
import ManagerTransactions from "./pages/manager/ManagerTransactions";

export default function App() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<Login />} />
<<<<<<< HEAD
      {/* Admin */}
      <Route //now route is parent of admin-pages
=======

      {/* ================= ADMIN ================= */}
      <Route
>>>>>>> origin/master
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

<<<<<<< HEAD
        {/* Branch */}

        <Route
          path="branches"
          element={
            <ProtectedRoutes>
              <Branch />
            </ProtectedRoutes>
          }
        />

        <Route
          path="branch/:id"
          element={
            <ProtectedRoutes>
              <BranchDetails />
            </ProtectedRoutes>
          }
        />
        {/* //users-page */}
        <Route
          path="users-roles"
          element={
            <ProtectedRoutes>
              <UsersRoles />
            </ProtectedRoutes>
          }
        />

        {/* cutomers-page */}
        <Route
          path="customers"
          element={
            <ProtectedRoutes>
              <Customers />
            </ProtectedRoutes>
          }
        />

        {/* Account-Page */}
        <Route
          path="accounts"
          element={
            <ProtectedRoutes>
              <AdminAccounts />
            </ProtectedRoutes>
          }
        />
        {/* Account-Page */}

        {/* Transaction - Page */}
        <Route
          path="transaction"
          element={
            <ProtectedRoutes>
              <Transactions />
            </ProtectedRoutes>
          }
        />
        {/* Transaction - Page */}
        {/* Reports - Page */}
        <Route
          path="reports"
          element={
            <ProtectedRoutes>
              <Reports />
            </ProtectedRoutes>
          }
        />{/* Reports - Page */}
        {/* Reports - Page - END */}


      </Route>{" "}
      {/* END-OF-ADMIN */}
      {/* END-OF-ADMIN */}
      {/* Branch Manager */}
=======
      {/* ================= MANAGER ================= */}
>>>>>>> origin/master
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
<<<<<<< HEAD
            <ManagerCustomers />{" "}
            {/* this page for where manager can add customers */}
=======
            <ManagerCustomers />
>>>>>>> origin/master
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
<<<<<<< HEAD
      {/* TellerDashboard */}
=======
      <Route
        path="/manager/:branchcode/transactions"
        element={
          <ProtectedRoutes>
            <ManagerTransactions />
          </ProtectedRoutes>
        }
      />

      {/* ================= TELLER ================= */}
>>>>>>> origin/master
      <Route
        path="/teller/:branchcode"
        element={
          <ProtectedRoutes>
            <TellerDashboard />
          </ProtectedRoutes>
        }
      />
<<<<<<< HEAD
      {/* //TransactionHistory */}
      {/* <Route path="/teller/:branchcode" element={<TellerDashboard />} /> */}
      <Route path="/teller/:branchcode/deposit" element={<Deposit />} />
      <Route path="/teller/:branchcode/withdraw" element={<Withdraw />} />
=======

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

>>>>>>> origin/master
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