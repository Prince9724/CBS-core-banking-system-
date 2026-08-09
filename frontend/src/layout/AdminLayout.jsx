import { Outlet } from "react-router-dom";
import Admin_Sidebar from "../Admin-component/Admin_Sidebar";
import "./adminLayout.css";

export default function AdminLayout() {
  return (
    <div className="layout">
      <Admin_Sidebar /> 
      
      <div className="right-content">
        <Outlet />
      </div>
    </div>
  );
}
