import { Routes, Route } from "react-router";
import Login from "./pages/Login";
import Admin_dashboard from "./pages/admin/Admin_dashboard";
import BranchManager_dashboard from "./pages/branchmanager/BranchManager_dashboard";
import ProtectedRoutes from "./componet-global/ProtectedRoutes";
export default function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoutes>
                <Admin_dashboard />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/branch-manager"
            element={
              <ProtectedRoutes>
                <BranchManager_dashboard />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </div>
    </>
  );
}
