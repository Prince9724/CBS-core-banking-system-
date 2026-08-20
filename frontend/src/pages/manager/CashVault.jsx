import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

export default function CashVault() {
  const { branchcode: urlBranchcode } = useParams();
  const { loggedinUser } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  
  const branchcode = urlBranchcode?.toUpperCase() || loggedinUser?.branchcode?.toUpperCase();

  const [vaultData, setVaultData] = useState({
    vaultBalance: 0,
    cashIn: 0,
    cashOut: 0,
    availableCash: 0,
    openingCash: 0,
    closingCash: 0,
    totalCustomers: 0,
    totalAccounts: 0,
    totalTellers: 0,
    vaultCapacity: 500000,
    recentMovements: [],
    tellers: [],
  });

  const api = axios.create({
    baseURL: "http://localhost:5003",
    withCredentials: true,
  });

  useEffect(() => {
    if (branchcode) {
      fetchVaultData();
    }
  }, [branchcode]);

  const fetchVaultData = async () => {
    try {
      setLoading(true);

      console.log("🔍 Fetching vault data for branch:", branchcode);

      // ============================================================
      // ✅ USE THE SAME API AS MANAGER DASHBOARD
      // ============================================================
      const dashboardRes = await api.get(
        `/cbs/customer/manager-dashboard/${branchcode}`
      );

      console.log("📊 Dashboard Response:", dashboardRes.data);

      const data = dashboardRes.data.data;

      if (data) {
        // ✅ Real data from dashboard API
        const vaultBalance = data.totalBranchBalance || 0;
        const cashIn = data.todayDeposit || 0;
        const cashOut = data.todayWithdraw || 0;
        const customers = data.totalCustomers || 0;
        const accounts = data.totalAccounts || 0;
        const tellers = data.tellers || 0;
        const transactions = data.recentTransactions || [];

        setVaultData({
          vaultBalance,
          cashIn,
          cashOut,
          availableCash: vaultBalance,
          openingCash: vaultBalance - cashIn + cashOut,
          closingCash: vaultBalance,
          totalCustomers: customers,
          totalAccounts: accounts,
          totalTellers: tellers,
          vaultCapacity: 500000,
          recentMovements: transactions.slice(0, 5),
          tellers: tellers > 0 ? [{ name: "Tellers", cashHeld: 0 }] : [],
        });
      }

    } catch (err) {
      console.error("❌ Vault Error:", err);
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
          <p className="text-secondary mt-2">Loading vault data...</p>
        </div>
      </div>
    );
  }

  const displayBranchName = loggedinUser?.branchname || branchcode || "Branch";

  return (
    <div className="container-fluid px-4 py-4 bg-dark min-vh-100">

      {/* ===== HEADER ===== */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <span className="badge bg-warning bg-opacity-10 text-warning mb-2">
            <i className="bi bi-safe2-fill me-1"></i>
            Branch Cash Management
          </span>
          <h1 className="text-white fw-bold mb-1">Cash & Vault</h1>
          <p className="text-secondary m-0">
            Branch: <strong className="text-white">{displayBranchName}</strong>
            <span className="ms-2 badge bg-secondary">{branchcode}</span>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex align-items-center gap-2 bg-success bg-opacity-10 px-3 py-2 rounded-pill">
            <span className="bg-success rounded-circle d-inline-block" style={{ width: "8px", height: "8px" }}></span>
            <span className="text-success">Vault Operational</span>
          </div>
          <button
            className="btn btn-outline-primary d-flex align-items-center gap-2"
            onClick={fetchVaultData}
          >
            <i className="bi bi-arrow-clockwise"></i>
            Refresh
          </button>
        </div>
      </div>

      {/* ===== CASH OVERVIEW ===== */}
      <div className="row g-3 mb-4">
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="card bg-dark border-secondary h-100">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="bg-primary bg-opacity-10 rounded-3 p-3">
                <i className="bi bi-safe2-fill fs-2 text-primary"></i>
              </div>
              <div>
                <p className="text-secondary small fw-semibold text-uppercase mb-0">Vault Balance</p>
                <h3 className="text-white fw-bold mb-0">₹{vaultData.vaultBalance.toLocaleString()}</h3>
                <small className="text-secondary">Current vault cash</small>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="card bg-dark border-secondary h-100">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="bg-success bg-opacity-10 rounded-3 p-3">
                <i className="bi bi-arrow-down-left fs-2 text-success"></i>
              </div>
              <div>
                <p className="text-secondary small fw-semibold text-uppercase mb-0">Cash In</p>
                <h3 className="text-white fw-bold mb-0">₹{vaultData.cashIn.toLocaleString()}</h3>
                <small className="text-secondary">Today's cash received</small>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="card bg-dark border-secondary h-100">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="bg-danger bg-opacity-10 rounded-3 p-3">
                <i className="bi bi-arrow-up-right fs-2 text-danger"></i>
              </div>
              <div>
                <p className="text-secondary small fw-semibold text-uppercase mb-0">Cash Out</p>
                <h3 className="text-white fw-bold mb-0">₹{vaultData.cashOut.toLocaleString()}</h3>
                <small className="text-secondary">Today's cash withdrawn</small>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="card bg-dark border-secondary h-100">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="bg-info bg-opacity-10 rounded-3 p-3">
                <i className="bi bi-cash-stack fs-2 text-info"></i>
              </div>
              <div>
                <p className="text-secondary small fw-semibold text-uppercase mb-0">Available Cash</p>
                <h3 className="text-white fw-bold mb-0">₹{vaultData.availableCash.toLocaleString()}</h3>
                <small className="text-secondary">Available for operations</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== CASH POSITION + VAULT STATUS ===== */}
      <div className="row g-4 mb-4">
        <div className="col-xl-6">
          <div className="card bg-dark border-secondary h-100">
            <div className="card-body">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="bg-primary bg-opacity-10 rounded-3 p-2">
                  <i className="bi bi-bar-chart-fill fs-4 text-primary"></i>
                </div>
                <div>
                  <h5 className="text-white mb-0">Cash Position</h5>
                  <p className="text-secondary small mb-0">Today's branch cash movement</p>
                </div>
              </div>

              <div className="d-flex flex-column gap-2">
                <div className="d-flex justify-content-between align-items-center bg-dark bg-opacity-50 p-3 rounded-3 border border-secondary">
                  <span className="text-secondary">
                    <span className="bg-primary rounded-circle d-inline-block me-2" style={{ width: "10px", height: "10px" }}></span>
                    Opening Cash
                  </span>
                  <strong className="text-white">₹{vaultData.openingCash.toLocaleString()}</strong>
                </div>

                <div className="d-flex justify-content-between align-items-center bg-dark bg-opacity-50 p-3 rounded-3 border border-secondary">
                  <span className="text-secondary">
                    <span className="bg-success rounded-circle d-inline-block me-2" style={{ width: "10px", height: "10px" }}></span>
                    Cash Received
                  </span>
                  <strong className="text-success">+₹{vaultData.cashIn.toLocaleString()}</strong>
                </div>

                <div className="d-flex justify-content-between align-items-center bg-dark bg-opacity-50 p-3 rounded-3 border border-secondary">
                  <span className="text-secondary">
                    <span className="bg-danger rounded-circle d-inline-block me-2" style={{ width: "10px", height: "10px" }}></span>
                    Cash Withdrawn
                  </span>
                  <strong className="text-danger">-₹{vaultData.cashOut.toLocaleString()}</strong>
                </div>

                <div className="border-bottom border-secondary my-1"></div>

                <div className="d-flex justify-content-between align-items-center bg-primary bg-opacity-10 p-3 rounded-3 border border-primary">
                  <span className="text-white">
                    <span className="bg-info rounded-circle d-inline-block me-2" style={{ width: "10px", height: "10px" }}></span>
                    Closing Cash
                  </span>
                  <strong className="text-white fs-5">₹{vaultData.closingCash.toLocaleString()}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-6">
          <div className="card bg-dark border-secondary h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-success bg-opacity-10 rounded-3 p-2">
                    <i className="bi bi-safe-fill fs-4 text-success"></i>
                  </div>
                  <div>
                    <h5 className="text-white mb-0">Vault Status</h5>
                    <p className="text-secondary small mb-0">Current branch vault information</p>
                  </div>
                </div>
                <span className="badge bg-success">
                  <i className="bi bi-check-circle-fill me-1"></i>
                  Secure
                </span>
              </div>

              <div className="d-flex flex-column gap-3">
                <div className="d-flex justify-content-between align-items-center bg-dark bg-opacity-50 p-3 rounded-3 border border-secondary">
                  <div>
                    <span className="text-secondary small">Vault Balance</span>
                    <strong className="text-white d-block">₹{vaultData.vaultBalance.toLocaleString()}</strong>
                  </div>
                  <i className="bi bi-safe2 fs-3 text-secondary"></i>
                </div>

                <div className="d-flex justify-content-between align-items-center bg-dark bg-opacity-50 p-3 rounded-3 border border-secondary">
                  <div>
                    <span className="text-secondary small">Maximum Limit</span>
                    <strong className="text-white d-block">₹{vaultData.vaultCapacity.toLocaleString()}</strong>
                  </div>
                  <i className="bi bi-speedometer2 fs-3 text-secondary"></i>
                </div>

                <div>
                  <div className="d-flex justify-content-between">
                    <span className="text-secondary small">Vault Capacity</span>
                    <strong className="text-white">
                      {((vaultData.vaultBalance / vaultData.vaultCapacity) * 100).toFixed(0)}%
                    </strong>
                  </div>
                  <div className="bg-dark border border-secondary rounded-3 overflow-hidden" style={{ height: "8px" }}>
                    <div
                      className="bg-primary h-100"
                      style={{
                        width: `${Math.min((vaultData.vaultBalance / vaultData.vaultCapacity) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-2 text-secondary small bg-dark bg-opacity-50 p-2 rounded-3 border border-secondary">
                  <i className="bi bi-clock-history"></i>
                  <span>Last updated: {new Date().toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== TELLER CASH ===== */}
      <div className="card bg-dark border-secondary mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-warning bg-opacity-10 rounded-3 p-2">
                <i className="bi bi-people-fill fs-4 text-warning"></i>
              </div>
              <div>
                <h5 className="text-white mb-0">Teller Cash Position</h5>
                <p className="text-secondary small mb-0">Cash currently assigned to branch tellers</p>
              </div>
            </div>
            <span className="badge bg-secondary">{vaultData.totalTellers} Active Tellers</span>
          </div>

          {vaultData.totalTellers === 0 ? (
            <div className="text-center py-4 text-secondary">
              <i className="bi bi-people fs-1 d-block mb-2"></i>
              <p>No tellers assigned to this branch</p>
            </div>
          ) : (
            <div className="row g-3">
              {[...Array(vaultData.totalTellers)].map((_, index) => (
                <div className="col-xl-3 col-lg-4 col-md-6" key={index}>
                  <div className="card bg-dark border-secondary">
                    <div className="card-body">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" style={{ width: "36px", height: "36px" }}>
                          <i className="bi bi-person-fill text-primary"></i>
                        </div>
                        <div>
                          <strong className="text-white">Teller {index + 1}</strong>
                          <span className="badge bg-success d-block text-start">Active</span>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between bg-dark bg-opacity-50 p-2 rounded-3 border border-secondary">
                        <span className="text-secondary small">Cash Held</span>
                        <strong className="text-white">₹0</strong>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ===== RECENT CASH MOVEMENT ===== */}
      <div className="card bg-dark border-secondary">
        <div className="card-body">
          <div className="d-flex align-items-center gap-3 mb-3">
            <div className="bg-purple bg-opacity-10 rounded-3 p-2">
              <i className="bi bi-clock-history fs-4 text-purple"></i>
            </div>
            <div>
              <h5 className="text-white mb-0">Recent Cash Movement</h5>
              <p className="text-secondary small mb-0">Latest cash and vault operations</p>
            </div>
          </div>

          {vaultData.recentMovements.length === 0 ? (
            <div className="text-center py-4 text-secondary">
              <i className="bi bi-receipt fs-1 d-block mb-2"></i>
              <p>No recent cash movements</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-dark table-hover">
                <thead>
                  <tr className="border-secondary">
                    <th>Reference</th>
                    <th>Operation</th>
                    <th>Amount</th>
                    <th>Performed By</th>
                    <th>Date & Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {vaultData.recentMovements.map((t, index) => (
                    <tr key={t._id || index} className="border-secondary">
                      <td>
                        <code className="bg-dark text-secondary">{t.transactionId || t._id?.slice(-8)}</code>
                      </td>
                      <td>
                        <span className={`badge ${t.type === "Deposit" ? "bg-success" : "bg-danger"}`}>
                          <i className={`bi ${t.type === "Deposit" ? "bi-arrow-down-left" : "bi-arrow-up-right"} me-1`}></i>
                          {t.type === "Deposit" ? "Cash In" : "Cash Out"}
                        </span>
                      </td>
                      <td className={t.type === "Deposit" ? "text-success" : "text-danger"}>
                        {t.type === "Deposit" ? "+" : "-"}₹{t.amount?.toLocaleString()}
                      </td>
                      <td>{t.performedBy || "N/A"}</td>
                      <td className="text-secondary small">
                        {new Date(t.createdAt).toLocaleString()}
                      </td>
                      <td>
                        <span className="text-success">
                          <i className="bi bi-check-circle-fill me-1"></i>
                          Completed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .text-purple { color: #8B5CF6; }
        .bg-purple { background-color: #8B5CF6; }
        .bg-purple.bg-opacity-10 { background-color: rgba(139, 92, 246, 0.1); }
        .table-dark { --bs-table-bg: transparent; }
        .table-dark td, .table-dark th { border-color: #2a2f3a; }
        .table-dark tbody tr:hover { background: rgba(255,255,255,0.02); }
        .bg-dark.bg-opacity-50 { background-color: rgba(33,37,41,0.5); }
      `}</style>

    </div>
  );
}