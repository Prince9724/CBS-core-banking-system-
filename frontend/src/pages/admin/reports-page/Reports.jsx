import React from "react";
import ReportsHeader from "./ReportsHeader";
import Searchfilter from "./Searchfilter";
import BranchPerformanceSummary from "./BranchPerformanceSummary";
import TopBranchesDeposits from "./TopBranchesDeposits";
import PortfolioCard from "./PortfolioCard";
import "./reports.css";
import DepositByBranchesChart from "./DepositByBranchesChart";

export default function Reports() {
  return (
    <div className="reports-page">
      <ReportsHeader />
      <Searchfilter />

      <div className="container-fluid px-0 mt-4">
        <div className="row g-4">
          {/* Left Column - 60% */}
          <div className="col-xl-7 col-lg-12">
            <div className="h-100">
              <BranchPerformanceSummary />
            </div>
          </div>

          {/* Right Column - 40% */}
          <div className="col-xl-5 col-lg-12">
            <div className="d-flex flex-column gap-4 h-100">
              <div className="flex-grow-1" style={{ minHeight: "50%" }}>
                <TopBranchesDeposits />
              </div>
              <div className="flex-grow-1" style={{ minHeight: "50%" }}>
                <PortfolioCard />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div>
          <DepositByBranchesChart/>
        </div>
      </div>
    </div>
  );
}