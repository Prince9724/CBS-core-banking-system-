import React from "react";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";

export default function ProtectedRoutes({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const isLoggedin = localStorage.getItem("isAuthenticated")
//   console.log(isLoggedin);
    // if(!isAuthenticated){
    //     return <Navigate to="/" /> //this is why not we using bcz we store in variable and if refresh so user have to login again
    // }
    if(!isLoggedin){
        return <Navigate to="/" />;
    }
    // console.log(isLoggedin)
    return children;//this line is imp if is not empty then children will be appears
}
