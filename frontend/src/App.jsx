// import { Routes, Route } from "react-router";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/admin/dashboard-page/Home";
import Branch from "./pages/admin/branch-page/Branch";
// import BranchManager_dashboard from "./pages/branchmanager/BranchManager_dashboard";
import ProtectedRoutes from "./componet-global/ProtectedRoutes";
import AdminLayout from "./layout/AdminLayout";
import UsersRoles from "./pages/admin/users and roles/UsersAndRoles";
import Customers from "./pages/admin/customers-page/Customers";
import BranchManager_dashboard from "./pages/branchmanager/BranchManager_dashboard";
import BranchDetails from "./pages/admin/branch-page/BranchDetails";
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import ManagerCustomers from "./pages/manager/Customers";
import Accounts from "./pages/manager/Accounts";
import TellerDashboard from "./pages/teller/TellerDashboard";
import AdminAccounts from "./pages/admin/account-page/Accounts";
import Transactions from "./pages/admin/Transaction-page/Transactions";

export default function App() {
  return (
    <Routes>
      {/* Login */}

      <Route path="/" element={<Login />} />

      {/* Admin */}

      <Route //now route is parent of admin-pages
        path="/admin"
        element={
          <ProtectedRoutes>
            <AdminLayout />
          </ProtectedRoutes>
        }
      >
        {/* Dashboard */}

        <Route index element={<Home />} />

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
        <Route path="transaction" element={
          <ProtectedRoutes>
            <Transactions/>
          </ProtectedRoutes>
        } />
        {/* Transaction - Page */}
      </Route> {/* END-OF-ADMIN */}
      {/* END-OF-ADMIN */} 
      
         
      {/* Branch Manager */}

      <Route
        path="/branch-manager"
        element={
          <ProtectedRoutes>
            <BranchManager_dashboard />
          </ProtectedRoutes>
        }
      />
      <Route path="/manager/:branchcode" element={<ManagerDashboard />} />
      <Route
        path="/manager/:branchcode/customers"
        element={
          <ProtectedRoutes>
            <ManagerCustomers /> {/* this page for where manager can add customers */}
          </ProtectedRoutes>
        }
      />
      <Route
        path="/manager/accounts"
        element={
          <ProtectedRoutes>
            <Accounts />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/teller/:branchcode"
        element={
          <ProtectedRoutes>
            <TellerDashboard />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
}
