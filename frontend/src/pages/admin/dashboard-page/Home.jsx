import React from "react";
import DashboardCards from "./DashboardCards";
import DepositChart from "./DepositChart";
import BranchChart from "./BranchChart";
import RecentTransactions from "./RecentTransactions";
import QuickActions from "./QuickAction";
import Footer from "../footer/Footer";

export default function () {
  return (
    <div className="main-container">
      <div className="row align-items-center justify-content-between mb-4 g-3">
        {/* Left Side */}
        <div className="col-lg-8 col-md-7 col-12">
          <h3 className="fw-bold mb-1 welcome-title">Welcome Back Admin 👋</h3>

          <p className="text-secondary mb-0 welcome-subtitle">
            Here's what's happening in your bank today.
          </p>
        </div>

        {/* Right Side */}
        <div className="col-lg-4 col-md-5 col-12 d-flex justify-content-md-end justify-content-start">
          <div className="date-box">
            {/* <label className="date-label">Select Date</label> */}

            <input
              type="date"
              className="form-control date-input bg-dark border border-secondary text-white"
            />
          </div>
        </div>
      </div>
      <DashboardCards /> 
      <div className="row gap justify-content-between mt-5 pb-2 mb-5">
        <div className="col-xl-8 col-lg-6 col-md-6  p-0">
          <DepositChart />
        </div>

        <div className="col-xl-4 col-lg-6 col-md-6 p-0">
          <BranchChart />
        </div>
      </div>
      <div className="row g-4 mt-4 mb-5 align-items-stretch">
        <div className="col-xl-8 col-lg-7 col-md-12">
          <RecentTransactions />
        </div>
        <div className="col-xl-4 col-lg-5 col-md-12">
          <QuickActions />
        </div>
      </div>
      <Footer />
    </div>
  );
}
