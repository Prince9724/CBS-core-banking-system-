import axios from "axios";
import { logout } from "../App/features/authSlice";

export const handleLogout = async (dispatch, navigate) => {
  try {
    await axios.post(
      "http://localhost:5003/cbs/logout",
      {},
      { withCredentials: true }
    );

    dispatch(logout());
    localStorage.removeItem("cbsUser");

    navigate("/login", { replace: true });
  } catch (err) {
    console.log("Logout Error:", err);
    dispatch(logout());
    localStorage.removeItem("cbsUser");
    navigate("/login", { replace: true });
  }
};