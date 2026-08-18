import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./branch.css";

export default function BranchDetails() {
  const { id } = useParams();
  const [branch, setBranch] = useState(null);
  const [manager, setManager] = useState(null);
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalAccounts: 0,
    totalBalance: 0,
    todayDeposit: 0,
    todayWithdraw: 0,
    todayTransactions: 0,
    totalTellers: 0,
  });
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const api = axios.create({
    baseURL: "http://localhost:5003",
    withCredentials: true,
  });

  useEffect(() => {
    fetchBranchDetails();
  }, [id]);

  const fetchBranchDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. Get branch details
      const branchRes = await api.get(`/cbs/branch/${id}`);
      console.log("🏢 Branch Details:", branchRes.data);

      if (branchRes.data.status) {
        const branchData = branchRes.data.data;
        setBranch(branchData);
        setManager(branchData.manager || null);

        // 2. Get branchcode for further API calls
        const branchcode = branchData.branchcode;

        // 3. Get customers
        const customerRes = await api.get(`/cbs/customer/get`);
        const allCustomers = customerRes.data.data || [];
        const branchCustomers = allCustomers.filter(
          (c) => c.branchcode === branchcode
        );

        // 4. Get accounts
        const accountRes = await api.get(`/cbs/customer/accounts`);
        const allAccounts = accountRes.data.data || [];
        const branchAccounts = allAccounts.filter(
          (a) => a.branchcode === branchcode
        );

        // 5. Calculate balance
        const totalBalance = branchAccounts.reduce(
          (sum, acc) => sum + (acc.balance || 0),
          0
        );

        // 6. Get today's transactions
        const todayRes = await api.get(
          `/cbs/customer/today-transactions?branchcode=${branchcode}`
        );
        const todayTxns = todayRes.data.data || [];

        const todayDeposit = todayTxns
          .filter((t) => t.type === "Deposit")
          .reduce((sum, t) => sum + (t.amount || 0), 0);

        const todayWithdraw = todayTxns
          .filter((t) => t.type === "Withdraw")
          .reduce((sum, t) => sum + (t.amount || 0), 0);

        // 7. Get tellers
        const userRes = await api.get(`/cbs/getusers`);
        const allUsers = userRes.data.data || [];
        const branchTellers = allUsers.filter(
          (u) =>
            u.branchcode === branchcode &&
            u.role?.toLowerCase() === "teller"
        );

        setStats({
          totalCustomers: branchCustomers.length,
          totalAccounts: branchAccounts.length,
          totalBalance: totalBalance,
          todayDeposit: todayDeposit,
          todayWithdraw: todayWithdraw,
          todayTransactions: todayTxns.length,
          totalTellers: branchTellers.length,
        });

        setRecentTransactions(todayTxns.slice(0, 10));
      } else {
        setError("Branch not found");
      }
    } catch (err) {
      console.error("❌ Error fetching branch details:", err);
      setError(err.response?.data?.message || "Failed to fetch branch details");
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
          <p className="text-secondary mt-2">Loading branch details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="card bg-dark border-danger">
          <div className="card-body text-center py-5">
            <i className="bi bi-exclamation-triangle-fill text-danger fs-1"></i>
            <h4 className="text-danger mt-3">Unable to load branch</h4>
            <p className="text-secondary">{error}</p>
            <Link to="/admin/branches" className="btn btn-primary">
              <i className="bi bi-arrow-left"></i> Back to Branches
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!branch) {
    return (
      <div className="container py-5">
        <div className="card bg-dark border-secondary">
          <div className="card-body text-center py-5">
            <i className="bi bi-building fs-1 text-secondary"></i>
            <h4 className="text-white mt-3">Branch not found</h4>
            <Link to="/admin/branches" className="btn btn-primary mt-3">
              <i className="bi bi-arrow-left"></i> Back to Branches
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-4 py-4 bg-dark min-vh-100">

      {/* ===== BACK BUTTON + HEADER ===== */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <Link to="/admin/branches" className="btn btn-outline-light d-flex align-items-center gap-2">
          <i className="bi bi-arrow-left"></i>
          Back to Branches
        </Link>
        <div className="vr text-secondary"></div>
        <div>
          <span className="badge bg-primary bg-opacity-10 text-primary mb-1">
            <i className="bi bi-building me-1"></i>
            Branch Details
          </span>
          <h1 className="text-white fw-bold mb-0">{branch.branchname}</h1>
          <p className="text-secondary m-0">Complete branch overview and statistics</p>
        </div>
      </div>

      {/* ===== BRANCH INFO CARD ===== */}
      <div className="row g-4 mb-4">
        <div className="col-md-8">
          <div className="card bg-dark border-secondary h-100">
            <div className="card-body">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="bg-primary bg-opacity-10 rounded-3 p-3">
                  <i className="bi bi-building fs-3 text-primary"></i>
                </div>
                <div>
                  <h4 className="text-white mb-0">{branch.branchname}</h4>
                  <span className="text-secondary">
                    <i className="bi bi-code-square me-1"></i>
                    {branch.branchcode}
                  </span>
                </div>
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <div className="bg-dark bg-opacity-50 rounded-3 p-3 border border-secondary">
                    <span className="text-secondary small d-block">
                      <i className="bi bi-geo-alt me-1"></i>
                      Address
                    </span>
                    <strong className="text-white">{branch.address || "N/A"}</strong>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="bg-dark bg-opacity-50 rounded-3 p-3 border border-secondary">
                    <span className="text-secondary small d-block">
                      <i className="bi bi-calendar3 me-1"></i>
                      Created At
                    </span>
                    <strong className="text-white">
                      {branch.createdAt
                        ? new Date(branch.createdAt).toLocaleDateString()
                        : "N/A"}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Manager Details */}
              {manager && (
                <div className="mt-3 bg-dark bg-opacity-50 rounded-3 p-3 border border-secondary">
                  <h6 className="text-white mb-2">
                    <i className="bi bi-person-badge me-2 text-warning"></i>
                    Branch Manager
                  </h6>
                  <div className="row g-2">
                    <div className="col-md-4">
                      <span className="text-secondary small d-block">Name</span>
                      <strong className="text-white">{manager.name}</strong>
                    </div>
                    <div className="col-md-4">
                      <span className="text-secondary small d-block">Email</span>
                      <strong className="text-white">{manager.email}</strong>
                    </div>
                    <div className="col-md-4">
                      <span className="text-secondary small d-block">Contact</span>
                      <strong className="text-white">{manager.contact || "N/A"}</strong>
                    </div>
                  </div>
                </div>
              )}

              {!manager && (
                <div className="mt-3 text-center text-secondary border border-secondary rounded-3 p-3">
                  <i className="bi bi-person-badge me-2"></i>
                  No manager assigned to this branch yet.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ===== QUICK STATS ===== */}
        <div className="col-md-4">
          <div className="card bg-dark border-secondary h-100">
            <div className="card-body">
              <h6 className="text-secondary mb-3">
                <i className="bi bi-graph-up me-2 text-primary"></i>
                Quick Stats
              </h6>
              <div className="d-flex flex-column gap-2">
                <div className="d-flex justify-content-between align-items-center bg-dark bg-opacity-50 rounded-3 p-2 border border-secondary">
                  <span className="text-secondary">
                    <i className="bi bi-people me-2 text-success"></i>
                    Customers
                  </span>
                  <strong className="text-white">{stats.totalCustomers}</strong>
                </div>
                <div className="d-flex justify-content-between align-items-center bg-dark bg-opacity-50 rounded-3 p-2 border border-secondary">
                  <span className="text-secondary">
                    <i className="bi bi-wallet2 me-2 text-warning"></i>
                    Accounts
                  </span>
                  <strong className="text-white">{stats.totalAccounts}</strong>
                </div>
                <div className="d-flex justify-content-between align-items-center bg-dark bg-opacity-50 rounded-3 p-2 border border-secondary">
                  <span className="text-secondary">
                    <i className="bi bi-cash-stack me-2 text-info"></i>
                    Branch Balance
                  </span>
                  <strong className="text-white">₹{stats.totalBalance.toLocaleString()}</strong>
                </div>
                <div className="d-flex justify-content-between align-items-center bg-dark bg-opacity-50 rounded-3 p-2 border border-secondary">
                  <span className="text-secondary">
                    <i className="bi bi-person-badge me-2 text-purple"></i>
                    Tellers
                  </span>
                  <strong className="text-white">{stats.totalTellers}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== TRANSACTION STATS ===== */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card bg-dark border-secondary">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="bg-success bg-opacity-10 rounded-3 p-3">
                <i className="bi bi-arrow-down-left fs-2 text-success"></i>
              </div>
              <div>
                <span className="text-secondary small">Today's Deposit</span>
                <h4 className="text-white fw-bold mb-0">₹{stats.todayDeposit.toLocaleString()}</h4>
                <small className="text-secondary">Today's deposits</small>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-dark border-secondary">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="bg-danger bg-opacity-10 rounded-3 p-3">
                <i className="bi bi-arrow-up-right fs-2 text-danger"></i>
              </div>
              <div>
                <span className="text-secondary small">Today's Withdraw</span>
                <h4 className="text-white fw-bold mb-0">₹{stats.todayWithdraw.toLocaleString()}</h4>
                <small className="text-secondary">Today's withdrawals</small>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-dark border-secondary">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="bg-info bg-opacity-10 rounded-3 p-3">
                <i className="bi bi-receipt fs-2 text-info"></i>
              </div>
              <div>
                <span className="text-secondary small">Today's Transactions</span>
                <h4 className="text-white fw-bold mb-0">{stats.todayTransactions}</h4>
                <small className="text-secondary">Total transactions</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== RECENT TRANSACTIONS ===== */}
      <div className="card bg-dark border-secondary">
        <div className="card-body">
          <h5 className="text-white mb-3">
            <i className="bi bi-clock-history me-2 text-info"></i>
            Recent Transactions
          </h5>

          {recentTransactions.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-dark table-hover">
                <thead>
                  <tr className="border-secondary">
                    <th>Account</th>
                    <th>Customer</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((t) => (
                    <tr key={t._id} className="border-secondary">
                      <td className="text-white">{t.accountNumber}</td>
                      <td className="text-white">{t.customerName}</td>
                      <td>
                        <span className={`badge ${t.type === "Deposit" ? "bg-success" : "bg-danger"}`}>
                          {t.type}
                        </span>
                      </td>
                      <td className={t.type === "Deposit" ? "text-success" : "text-danger"}>
                        {t.type === "Deposit" ? "+" : "-"}₹{t.amount}
                      </td>
                      <td className="text-secondary small">
                        {new Date(t.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-4 text-secondary">
              <i className="bi bi-receipt fs-1 d-block mb-2"></i>
              No transactions found for this branch
            </div>
          )}
        </div>
      </div>

      {/* ===== CUSTOM CSS ===== */}
      <style>{`
        .text-purple {
          color: #7c3aed;
        }
        .bg-purple {
          background-color: #7c3aed;
        }
        .bg-purple.bg-opacity-10 {
          background-color: rgba(124, 58, 237, 0.1);
        }
        .bg-dark.bg-opacity-50 {
          background-color: rgba(33, 37, 41, 0.5);
        }
      `}</style>

    </div>
  );
}