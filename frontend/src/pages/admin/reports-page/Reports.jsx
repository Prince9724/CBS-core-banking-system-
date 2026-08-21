import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ReportsHeader from "./ReportsHeader";
import Searchfilter from "./Searchfilter";
import BranchPerformanceSummary from "./BranchPerformanceSummary";
import TopBranchesDeposits from "./TopBranchesDeposits";
import PortfolioCard from "./PortfolioCard";
import DepositByBranchesChart from "./DepositByBranchesChart";
import "./reports.css";

export default function Reports() {
  const { loggedinUser } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState({
    branches: [],
    totalBranches: 0,
    totalCustomers: 0,
    totalAccounts: 0,
    totalBalance: 0,
    totalDeposits: 0,
    totalWithdrawals: 0,
    branchPerformance: [],
    topBranches: [],
    portfolio: {
      totalDeposits: 0,
      totalWithdrawals: 0,
      netFlow: 0,
      growth: 0,
    },
  });

  const api = axios.create({
    baseURL: "http://localhost:5003",
    withCredentials: true,
  });

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      setLoading(true);

      // ✅ 1. Get all branches
      const branchRes = await api.get("/cbs/getbranch");
      const branches = branchRes.data.data || [];

      // ✅ 2. Get all customers
      const customerRes = await api.get("/cbs/customer/get");
      const customers = customerRes.data.data || [];

      // ✅ 3. Get all accounts
      const accountRes = await api.get("/cbs/customer/accounts");
      const accounts = accountRes.data.data || [];

      // ✅ 4. Get today's transactions
      const todayRes = await api.get("/cbs/customer/today-transactions");
      const todayTxns = todayRes.data.data || [];

      // ✅ Calculate totals
      const totalBalance = accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0);
      
      const totalDeposits = todayTxns
        .filter((t) => t.type === "Deposit")
        .reduce((sum, t) => sum + (t.amount || 0), 0);

      const totalWithdrawals = todayTxns
        .filter((t) => t.type === "Withdraw")
        .reduce((sum, t) => sum + (t.amount || 0), 0);

      // ✅ Branch-wise performance
      const branchPerformance = branches.map((branch) => {
        const branchCustomers = customers.filter(
          (c) => c.branchcode === branch.branchcode
        );
        const branchAccounts = accounts.filter(
          (a) => a.branchcode === branch.branchcode
        );
        const branchBalance = branchAccounts.reduce(
          (sum, acc) => sum + (acc.balance || 0), 0
        );
        const branchTxns = todayTxns.filter(
          (t) => t.branchcode === branch.branchcode
        );
        const branchDeposits = branchTxns
          .filter((t) => t.type === "Deposit")
          .reduce((sum, t) => sum + (t.amount || 0), 0);
        const branchWithdrawals = branchTxns
          .filter((t) => t.type === "Withdraw")
          .reduce((sum, t) => sum + (t.amount || 0), 0);

        return {
          ...branch,
          customers: branchCustomers.length,
          accounts: branchAccounts.length,
          balance: branchBalance,
          deposits: branchDeposits,
          withdrawals: branchWithdrawals,
          transactions: branchTxns.length,
          status: branch.status || "Active",
        };
      });

      // ✅ Top branches by deposits
      const topBranches = [...branchPerformance]
        .sort((a, b) => b.deposits - a.deposits)
        .slice(0, 5);

      // ✅ Portfolio data
      const portfolio = {
        totalDeposits,
        totalWithdrawals,
        netFlow: totalDeposits - totalWithdrawals,
        growth: branchPerformance.length > 0 ? 12.5 : 0, // Placeholder
      };

      setReportData({
        branches: branchPerformance,
        totalBranches: branches.length,
        totalCustomers: customers.length,
        totalAccounts: accounts.length,
        totalBalance,
        totalDeposits,
        totalWithdrawals,
        branchPerformance,
        topBranches,
        portfolio,
      });

    } catch (err) {
      console.error("❌ Report Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-secondary mt-2">Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-4 py-4 bg-dark min-vh-100">

      {/* ===== HEADER ===== */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <span className="badge bg-info bg-opacity-10 text-info mb-2">
            <i className="bi bi-bar-chart-line me-1"></i>
            Bank Reports
          </span>
          <h1 className="text-white fw-bold mb-1">Reports & Analytics</h1>
          <p className="text-secondary m-0">
            {reportData.totalBranches} Branches • {reportData.totalCustomers} Customers • {reportData.totalAccounts} Accounts
          </p>
        </div>
        <button
          className="btn btn-outline-primary d-flex align-items-center gap-2"
          onClick={fetchReportData}
        >
          <i className="bi bi-arrow-clockwise"></i>
          Refresh
        </button>
      </div>

      {/* ===== SUMMARY CARDS ===== */}
      <div className="row g-3 mb-4">
        <div className="col-xl-3 col-lg-6">
          <div className="card bg-dark border-secondary h-100">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="bg-primary bg-opacity-10 rounded-3 p-3">
                <i className="bi bi-building fs-2 text-primary"></i>
              </div>
              <div>
                <p className="text-secondary small fw-semibold text-uppercase mb-0">Total Branches</p>
                <h3 className="text-white fw-bold mb-0">{reportData.totalBranches}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-lg-6">
          <div className="card bg-dark border-secondary h-100">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="bg-success bg-opacity-10 rounded-3 p-3">
                <i className="bi bi-people fs-2 text-success"></i>
              </div>
              <div>
                <p className="text-secondary small fw-semibold text-uppercase mb-0">Total Customers</p>
                <h3 className="text-white fw-bold mb-0">{reportData.totalCustomers}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-lg-6">
          <div className="card bg-dark border-secondary h-100">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="bg-warning bg-opacity-10 rounded-3 p-3">
                <i className="bi bi-wallet2 fs-2 text-warning"></i>
              </div>
              <div>
                <p className="text-secondary small fw-semibold text-uppercase mb-0">Total Accounts</p>
                <h3 className="text-white fw-bold mb-0">{reportData.totalAccounts}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-lg-6">
          <div className="card bg-dark border-secondary h-100">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="bg-info bg-opacity-10 rounded-3 p-3">
                <i className="bi bi-cash-stack fs-2 text-info"></i>
              </div>
              <div>
                <p className="text-secondary small fw-semibold text-uppercase mb-0">Total Balance</p>
                <h3 className="text-white fw-bold mb-0">₹{reportData.totalBalance.toLocaleString()}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== BRANCH PERFORMANCE TABLE ===== */}
      <div className="card bg-dark border-secondary mb-4">
        <div className="card-body">
          <h5 className="text-white mb-3">
            <i className="bi bi-list-ul me-2 text-primary"></i>
            Branch Performance Summary
          </h5>
          <div className="table-responsive">
            <table className="table table-dark table-hover">
              <thead>
                <tr className="border-secondary">
                  <th>Branch</th>
                  <th>Code</th>
                  <th>Customers</th>
                  <th>Accounts</th>
                  <th>Balance</th>
                  <th>Deposits</th>
                  <th>Withdrawals</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {reportData.branchPerformance.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-secondary">
                      <i className="bi bi-inbox fs-1 d-block mb-2"></i>
                      No branches found
                    </td>
                  </tr>
                ) : (
                  reportData.branchPerformance.map((branch) => (
                    <tr key={branch._id} className="border-secondary">
                      <td className="text-white">{branch.branchname}</td>
                      <td>
                        <span className="badge bg-secondary">{branch.branchcode}</span>
                      </td>
                      <td>{branch.customers}</td>
                      <td>{branch.accounts}</td>
                      <td className="text-info">₹{branch.balance.toLocaleString()}</td>
                      <td className="text-success">₹{branch.deposits.toLocaleString()}</td>
                      <td className="text-danger">₹{branch.withdrawals.toLocaleString()}</td>
                      <td>
                        <span className={`badge ${branch.status === "Inactive" ? "bg-danger" : "bg-success"}`}>
                          {branch.status || "Active"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ===== TOP BRANCHES & PORTFOLIO ===== */}
      <div className="row g-4 mb-4">
        <div className="col-xl-6">
          <div className="card bg-dark border-secondary h-100">
            <div className="card-body">
              <h5 className="text-white mb-3">
                <i className="bi bi-trophy me-2 text-warning"></i>
                Top Branches by Deposits
              </h5>
              {reportData.topBranches.length === 0 ? (
                <div className="text-center py-4 text-secondary">
                  <i className="bi bi-inbox fs-1 d-block mb-2"></i>
                  No data available
                </div>
              ) : (
                <div className="d-flex flex-column gap-2">
                  {reportData.topBranches.map((branch, index) => (
                    <div key={branch._id} className="d-flex justify-content-between align-items-center p-3 bg-dark bg-opacity-50 rounded-3 border border-secondary">
                      <div className="d-flex align-items-center gap-3">
                        <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" style={{ width: "32px", height: "32px" }}>
                          <span className="text-white fw-bold">{index + 1}</span>
                        </div>
                        <div>
                          <div className="text-white fw-semibold">{branch.branchname}</div>
                          <span className="text-secondary small">{branch.branchcode}</span>
                        </div>
                      </div>
                      <div className="text-end">
                        <div className="text-success fw-bold">₹{branch.deposits.toLocaleString()}</div>
                        <small className="text-secondary">{branch.transactions} transactions</small>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-xl-6">
          <div className="card bg-dark border-secondary h-100">
            <div className="card-body">
              <h5 className="text-white mb-3">
                <i className="bi bi-pie-chart me-2 text-purple"></i>
                Portfolio Overview
              </h5>
              <div className="row g-3">
                <div className="col-6">
                  <div className="bg-success bg-opacity-10 rounded-3 p-3 border border-success">
                    <span className="text-secondary small">Total Deposits</span>
                    <h4 className="text-success fw-bold mb-0">₹{reportData.portfolio.totalDeposits.toLocaleString()}</h4>
                  </div>
                </div>
                <div className="col-6">
                  <div className="bg-danger bg-opacity-10 rounded-3 p-3 border border-danger">
                    <span className="text-secondary small">Total Withdrawals</span>
                    <h4 className="text-danger fw-bold mb-0">₹{reportData.portfolio.totalWithdrawals.toLocaleString()}</h4>
                  </div>
                </div>
                <div className="col-6">
                  <div className="bg-info bg-opacity-10 rounded-3 p-3 border border-info">
                    <span className="text-secondary small">Net Flow</span>
                    <h4 className={`fw-bold mb-0 ${reportData.portfolio.netFlow >= 0 ? "text-success" : "text-danger"}`}>
                      ₹{reportData.portfolio.netFlow.toLocaleString()}
                    </h4>
                  </div>
                </div>
                <div className="col-6">
                  <div className="bg-primary bg-opacity-10 rounded-3 p-3 border border-primary">
                    <span className="text-secondary small">Growth</span>
                    <h4 className="text-primary fw-bold mb-0">{reportData.portfolio.growth}%</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== DEPOSIT BY BRANCHES CHART ===== */}
      <div className="card bg-dark border-secondary">
        <div className="card-body">
          <DepositByBranchesChart branchData={reportData.branchPerformance} />
        </div>
      </div>

      <style>{`
        .text-purple { color: #8b5cf6; }
        .bg-purple { background-color: #8b5cf6; }
        .bg-purple.bg-opacity-10 { background-color: rgba(139, 92, 246, 0.1); }
        .table-dark {
          --bs-table-bg: transparent;
        }
        .table-dark td, .table-dark th {
          border-color: #2a2f3a;
        }
        .table-dark tbody tr:hover {
          background: rgba(255, 255, 255, 0.02);
        }
      `}</style>

    </div>
  );
}