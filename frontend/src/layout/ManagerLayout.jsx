import { Outlet } from "react-router-dom"
import BranchManager from "../branchManager-componet/BranchManager_Sidebar"

export default function ManagerLayout() {
  return (
    <div className="layout">
      <BranchManager /> 
      
      <div className="right-content">
        <Outlet />
      </div>
    </div>
  )
}
