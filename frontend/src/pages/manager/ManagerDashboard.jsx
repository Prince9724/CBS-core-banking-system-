import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import "./ManagerDashboard.css";

export default function ManagerDashboard() {
  const { branchcode } = useParams();

  const { loggedinUser } = useSelector((state) => state.auth);

  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalAccounts: 0,
    todayDeposit: 0,
    todayWithdraw: 0,
    todayTransactions: 0,
    totalBranchBalance: 0,
    totalTellers: 0,
  });

  const [recentTransactions, setRecentTransactions] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, [branchcode]);

  const fetchDashboard = async () => {
    try {
      const dashboardRes = await axios.get(
        `http://localhost:5003/cbs/customer/manager-dashboard/${branchcode}`,
        {
          withCredentials: true,
        },
      );

      const data = dashboardRes.data.data;

      console.log("Dashboard API Response:", dashboardRes.data);
      console.log("Dashboard Data:", data);

      setStats({
        totalCustomers: data.totalCustomers || 0,
        totalAccounts: data.totalAccounts || 0,
        todayDeposit: data.todayDeposit || 0,
        todayWithdraw: data.todayWithdraw || 0,
        todayTransactions: data.todayTransactionsCount || 0,
        totalBranchBalance: data.branchBalance || 0,
        totalTellers: data.tellers || 0,
      });

      setRecentTransactions(data.recentTransactions || []);
    } catch (err) {
      console.log("Dashboard Error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="manager-dashboard">
      {/* ================= HEADER ================= */}
      <div className="manager-dashboard-header">
        <div className="manager-dashboard-heading">
          <span className="manager-dashboard-eyebrow">
            <i className="bi bi-grid-1x2-fill"></i>
            Branch Overview
          </span>

          <h1>{loggedinUser?.branchname || "Branch"} Dashboard</h1>

          <p>
            Welcome back, <strong>{loggedinUser?.name}</strong>
          </p>
        </div>

        <div className="manager-dashboard-actions">
          <Link
            to={`/manager/${branchcode}/customers`}
            className="manager-action-btn manager-action-primary"
          >
            <i className="bi bi-person-plus-fill"></i>
            <span>Add Customer</span>
          </Link>

          <Link
            to={`/manager/${branchcode}/accounts`}
            className="manager-action-btn manager-action-secondary"
          >
            <i className="bi bi-wallet2"></i>
            <span>Open Account</span>
          </Link>
        </div>
      </div>

      {/* ================= TOP STATS ================= */}
      <div className="manager-stats-grid">
        {/* Total Customers */}
        <div className="manager-stat-card">
          <div className="manager-stat-top">
            <div className="manager-stat-icon manager-icon-blue">
              <i className="bi bi-people-fill"></i>
            </div>

            <span className="manager-stat-label">Customers</span>
          </div>

          <div className="manager-stat-value">{stats.totalCustomers}</div>

          <div className="manager-stat-footer">
            <span>Branch customers</span>
            <i className="bi bi-arrow-up-right"></i>
          </div>
        </div>

        {/* Total Accounts */}
        <div className="manager-stat-card">
          <div className="manager-stat-top">
            <div className="manager-stat-icon manager-icon-purple">
              <i className="bi bi-wallet-fill"></i>
            </div>

            <span className="manager-stat-label">Accounts</span>
          </div>

          <div className="manager-stat-value">{stats.totalAccounts}</div>

          <div className="manager-stat-footer">
            <span>Total active accounts</span>
            <i className="bi bi-arrow-up-right"></i>
          </div>
        </div>

        {/* Branch Balance */}
        <div className="manager-stat-card">
          <div className="manager-stat-top">
            <div className="manager-stat-icon manager-icon-green">
              <i className="bi bi-cash-stack"></i>
            </div>

            <span className="manager-stat-label">Branch Balance</span>
          </div>

          <div className="manager-stat-value manager-money-value">
            ₹{stats.totalBranchBalance}
          </div>

          <div className="manager-stat-footer">
            <span>Current branch balance</span>
            <i className="bi bi-arrow-up-right"></i>
          </div>
        </div>

        {/* Active Tellers */}
        <div className="manager-stat-card">
          <div className="manager-stat-top">
            <div className="manager-stat-icon manager-icon-orange">
              <i className="bi bi-person-badge-fill"></i>
            </div>

            <span className="manager-stat-label">Active Tellers</span>
          </div>

          <div className="manager-stat-value">{stats.totalTellers}</div>

          <div className="manager-stat-footer">
            <span>Branch staff</span>
            <i className="bi bi-arrow-up-right"></i>
          </div>
        </div>
      </div>

      {/* ================= TRANSACTION STATS ================= */}
      <div className="manager-transaction-grid">
        {/* Deposit */}
        <div className="manager-transaction-card manager-deposit-card">
          <div className="manager-transaction-icon">
            <i className="bi bi-arrow-down-left"></i>
          </div>

          <div className="manager-transaction-content">
            <span>Today Deposit</span>

            <strong>₹{stats.todayDeposit}</strong>

            <small>
              <i className="bi bi-graph-up-arrow"></i>
              Today's deposit volume
            </small>
          </div>
        </div>

        {/* Withdraw */}
        <div className="manager-transaction-card manager-withdraw-card">
          <div className="manager-transaction-icon">
            <i className="bi bi-arrow-up-right"></i>
          </div>

          <div className="manager-transaction-content">
            <span>Today Withdraw</span>

            <strong>₹{stats.todayWithdraw}</strong>

            <small>
              <i className="bi bi-graph-down-arrow"></i>
              Today's withdrawal volume
            </small>
          </div>
        </div>

        {/* Transactions */}
        <div className="manager-transaction-card manager-transactions-card">
          <div className="manager-transaction-icon">
            <i className="bi bi-arrow-left-right"></i>
          </div>

          <div className="manager-transaction-content">
            <span>Today Transactions</span>

            <strong>{stats.todayTransactions}</strong>

            <small>
              <i className="bi bi-activity"></i>
              Total transactions today
            </small>
          </div>
        </div>
      </div>

      {/* ================= RECENT TRANSACTIONS ================= */}
      <div className="manager-panel manager-transactions-panel">
        <div className="manager-panel-header">
          <div>
            <span className="manager-panel-eyebrow">Activity</span>

            <h3>Recent Transactions</h3>
          </div>

          <Link
            to={`/teller/${branchcode}/history`}
            className="manager-view-btn"
          >
            View All
            <i className="bi bi-arrow-right"></i>
          </Link>
        </div>

        <div className="manager-table-wrapper">
          <table className="manager-table">
            <thead>
              <tr>
                <th>Account</th>
                <th>Customer</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Balance After</th>
                <th>Performed By</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {recentTransactions.length > 0 ? (
                recentTransactions.map((t) => (
                  <tr key={t._id}>
                    <td>
                      <span className="manager-account-number">
                        {t.accountNumber}
                      </span>
                    </td>

                    <td>
                      <span className="manager-customer-name">
                        {t.customerName}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`manager-type-badge ${
                          t.type === "Deposit"
                            ? "manager-badge-deposit"
                            : "manager-badge-withdraw"
                        }`}
                      >
                        <i
                          className={
                            t.type === "Deposit"
                              ? "bi bi-arrow-down-left"
                              : "bi bi-arrow-up-right"
                          }
                        ></i>

                        {t.type}
                      </span>
                    </td>

                    <td>
                      <strong className="manager-amount">₹{t.amount}</strong>
                    </td>

                    <td>₹{t.balanceAfter}</td>

                    <td>
                      <div className="manager-performer">
                        <span>{t.performedBy}</span>

                        <small>{t.performedByRole}</small>
                      </div>
                    </td>

                    <td>
                      <span className="manager-date">
                        {new Date(t.createdAt).toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="manager-empty-state">
                    <i className="bi bi-receipt"></i>

                    <span>No recent transactions found</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= BOTTOM SECTION ================= */}
      <div className="manager-bottom-grid">
        {/* Quick Actions */}
        <div className="manager-panel">
          <div className="manager-panel-header manager-panel-header-simple">
            <div>
              <span className="manager-panel-eyebrow">Shortcuts</span>

              <h3>Quick Actions</h3>
            </div>

            <div className="manager-heading-icon">
              <i className="bi bi-lightning-charge-fill"></i>
            </div>
          </div>

          <div className="manager-quick-actions">
            <Link
              to={`/manager/${branchcode}/customers`}
              className="manager-quick-action"
            >
              <div className="manager-quick-icon manager-icon-blue">
                <i className="bi bi-person-plus-fill"></i>
              </div>

              <div>
                <strong>Add New Customer</strong>
                <span>Create and manage customer records</span>
              </div>

              <i className="bi bi-chevron-right"></i>
            </Link>

            <Link
              to={`/manager/${branchcode}/accounts`}
              className="manager-quick-action"
            >
              <div className="manager-quick-icon manager-icon-purple">
                <i className="bi bi-wallet2"></i>
              </div>

              <div>
                <strong>Open Account</strong>
                <span>Create a new customer account</span>
              </div>

              <i className="bi bi-chevron-right"></i>
            </Link>

            <Link
              to={`/teller/${branchcode}/history`}
              className="manager-quick-action"
            >
              <div className="manager-quick-icon manager-icon-cyan">
                <i className="bi bi-clock-history"></i>
              </div>

              <div>
                <strong>Transaction History</strong>
                <span>Review branch transaction activity</span>
              </div>

              <i className="bi bi-chevron-right"></i>
            </Link>
          </div>
        </div>

        {/* Branch Summary */}
        <div className="manager-panel">
          <div className="manager-panel-header manager-panel-header-simple">
            <div>
              <span className="manager-panel-eyebrow">Overview</span>

              <h3>Branch Summary</h3>
            </div>

            <div className="manager-heading-icon">
              <i className="bi bi-bank2"></i>
            </div>
          </div>

          <div className="manager-summary-list">
            <div className="manager-summary-item">
              <div className="manager-summary-label">
                <span className="manager-summary-icon">
                  <i className="bi bi-people-fill"></i>
                </span>

                <span>Total Customers</span>
              </div>

              <strong>{stats.totalCustomers}</strong>
            </div>

            <div className="manager-summary-item">
              <div className="manager-summary-label">
                <span className="manager-summary-icon">
                  <i className="bi bi-wallet-fill"></i>
                </span>

                <span>Total Accounts</span>
              </div>

              <strong>{stats.totalAccounts}</strong>
            </div>

            <div className="manager-summary-item">
              <div className="manager-summary-label">
                <span className="manager-summary-icon">
                  <i className="bi bi-arrow-down-left"></i>
                </span>

                <span>Today Deposit</span>
              </div>

              <strong className="manager-summary-success">
                ₹{stats.todayDeposit}
              </strong>
            </div>

            <div className="manager-summary-item">
              <div className="manager-summary-label">
                <span className="manager-summary-icon">
                  <i className="bi bi-arrow-up-right"></i>
                </span>

                <span>Today Withdraw</span>
              </div>

              <strong className="manager-summary-danger">
                ₹{stats.todayWithdraw}
              </strong>
            </div>

            <div className="manager-summary-item">
              <div className="manager-summary-label">
                <span className="manager-summary-icon">
                  <i className="bi bi-person-badge-fill"></i>
                </span>

                <span>Active Tellers</span>
              </div>

              <strong>{stats.totalTellers}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
