import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import BranchManager from "../branchManager-componet/BranchManager_Sidebar";

export default function ManagerLayout() {
  const { loggedinUser } = useSelector((state) => state.auth);

  return (
    <div className="layout">
      <BranchManager />
      <div className="right-content">
        {/* ✅ Pass loggedinUser as prop to children */}
        <Outlet context={{ loggedinUser }} />
      </div>
    </div>
  );
}