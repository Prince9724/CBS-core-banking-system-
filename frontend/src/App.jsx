import { Routes, Route } from "react-router";
import Login from "./pages/Login";
import Admin_dashboard from "./pages/admin/Admin_dashboard";

export default function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<Admin_dashboard />} />
        </Routes>
      </div>
    </>
  );
}
