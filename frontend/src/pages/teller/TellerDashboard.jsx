import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../feature/features/authSlice";
import { useEffect, useState } from "react";
import axios from "axios";

export default function TellerDashboard() {
  const { branchcode } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedinUser } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  
  // ✅ Stats State
  const [stats, setStats] = useState({
    totalDeposit: 0,
    totalWithdraw: 0,
    totalTransactions: 0,
  });

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // ✅ Fetch Today's Data
  const fetchTodayData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5003/cbs/customer/today-transactions?branchcode=${branchcode}`,
        { withCredentials: true }
      );

      console.log("📊 Today Transactions:", res.data);

      const transactions = res.data.data || [];

      // ✅ Calculate stats
      const totalDeposit = transactions
        .filter((t) => t.type === "Deposit")
        .reduce((sum, t) => sum + (t.amount || 0), 0);

      const totalWithdraw = transactions
        .filter((t) => t.type === "Withdraw")
        .reduce((sum, t) => sum + (t.amount || 0), 0);

      setStats({
        totalDeposit,
        totalWithdraw,
        totalTransactions: transactions.length,
      });

    } catch (err) {
      console.error("❌ Error fetching today data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (branchcode) {
      fetchTodayData();
    }
  }, [branchcode]);

  // Loading State
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-secondary">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-4 py-4 bg-light min-vh-100">

      {/* ===== HEADER ===== */}
      <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
        <div>
          <span className="badge bg-primary bg-opacity-10 text-primary mb-2">
            <i className="bi bi-person-badge-fill me-1"></i>
            Teller Operations
          </span>
          <h1 className="fw-bold text-dark mb-1">Teller Dashboard</h1>
          <p className="text-secondary m-0">Manage customer cash transactions and branch activities.</p>
        </div>

        <div className="d-flex flex-wrap align-items-center gap-3">
          <div className="d-flex align-items-center gap-2 bg-white px-3 py-2 rounded-3 shadow-sm">
            <i className="bi bi-bank text-primary"></i>
            <div>
              <small className="text-secondary d-block lh-1">Branch</small>
              <strong>{loggedinUser?.branchname || branchcode}</strong>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2 bg-white px-3 py-2 rounded-3 shadow-sm">
            <i className="bi bi-person-circle text-primary"></i>
            <div>
              <small className="text-secondary d-block lh-1">Welcome</small>
              <strong>{loggedinUser?.name || "Teller"}</strong>
            </div>
          </div>

          <button
            className="btn btn-danger d-flex align-items-center gap-2"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right"></i>
            Logout
          </button>
        </div>
      </div>

      {/* ===== WELCOME CARD ===== */}
      <div className="card text-white border-0 mb-4" style={{ background: "linear-gradient(135deg, #1a2a42, #2a3f5a)" }}>
        <div className="card-body d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div className="d-flex align-items-center gap-3">
            <div className="bg-white bg-opacity-10 rounded-3 p-3">
              <i className="bi bi-person-workspace fs-1 text-info"></i>
            </div>
            <div>
              <span className="text-light-emphasis">Branch Teller</span>
              <h2 className="text-white mb-1">Ready for today's transactions?</h2>
              <p className="text-light-emphasis mb-0">Select an operation below to continue.</p>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2 bg-success bg-opacity-25 px-3 py-2 rounded-pill">
            <span className="bg-success rounded-circle d-inline-block" style={{ width: "8px", height: "8px" }}></span>
            <span className="text-success fw-semibold">Active</span>
          </div>
        </div>
      </div>

      {/* ===== TODAY'S SUMMARY - REAL DATA ===== */}
      <div className="mb-3">
        <h5 className="fw-bold text-dark mb-1">Today's Summary</h5>
        <p className="text-secondary m-0">Branch activity overview for today</p>
      </div>

      <div className="row g-3 mb-4">
        {/* Total Deposit */}
        <div className="col-xl-4 col-lg-4 col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="bg-success bg-opacity-10 rounded-3 p-3">
                <i className="bi bi-arrow-down-circle fs-2 text-success"></i>
              </div>
              <div>
                <span className="text-secondary small">Total Deposit</span>
                <h4 className="fw-bold mb-0">₹{stats.totalDeposit.toLocaleString()}</h4>
                <small className="text-secondary">Today's deposits</small>
              </div>
            </div>
          </div>
        </div>

        {/* Total Withdraw */}
        <div className="col-xl-4 col-lg-4 col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="bg-danger bg-opacity-10 rounded-3 p-3">
                <i className="bi bi-arrow-up-circle fs-2 text-danger"></i>
              </div>
              <div>
                <span className="text-secondary small">Total Withdraw</span>
                <h4 className="fw-bold mb-0">₹{stats.totalWithdraw.toLocaleString()}</h4>
                <small className="text-secondary">Today's withdrawals</small>
              </div>
            </div>
          </div>
        </div>

        {/* Total Transactions */}
        <div className="col-xl-4 col-lg-4 col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="bg-primary bg-opacity-10 rounded-3 p-3">
                <i className="bi bi-receipt fs-2 text-primary"></i>
              </div>
              <div>
                <span className="text-secondary small">Total Transactions</span>
                <h4 className="fw-bold mb-0">{stats.totalTransactions}</h4>
                <small className="text-secondary">Today's transactions</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== QUICK ACTIONS ===== */}
      <div className="mb-3">
        <h5 className="fw-bold text-dark mb-1">Quick Actions</h5>
        <p className="text-secondary m-0">Frequently used teller operations</p>
      </div>

      <div className="row g-3">
        {/* DEPOSIT */}
        <div className="col-xl-4 col-lg-4 col-md-6">
          <Link to={`/teller/${branchcode}/deposit`} className="text-decoration-none">
            <div className="card h-100 shadow-sm hover-shadow transition border-0">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="bg-success bg-opacity-10 rounded-3 p-3">
                    <i className="bi bi-arrow-down-left fs-3 text-success"></i>
                  </div>
                  <i className="bi bi-arrow-up-right text-secondary opacity-50"></i>
                </div>
                <h5 className="fw-bold text-dark mb-1">Deposit</h5>
                <p className="text-secondary small mb-3">Deposit cash into a customer's account</p>
                <div className="border-top pt-2 d-flex justify-content-between align-items-center">
                  <span className="text-primary fw-semibold small">Start Deposit</span>
                  <i className="bi bi-chevron-right text-secondary"></i>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* WITHDRAW */}
        <div className="col-xl-4 col-lg-4 col-md-6">
          <Link to={`/teller/${branchcode}/withdraw`} className="text-decoration-none">
            <div className="card h-100 shadow-sm hover-shadow transition border-0">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="bg-warning bg-opacity-10 rounded-3 p-3">
                    <i className="bi bi-arrow-up-right fs-3 text-warning"></i>
                  </div>
                  <i className="bi bi-arrow-up-right text-secondary opacity-50"></i>
                </div>
                <h5 className="fw-bold text-dark mb-1">Withdraw</h5>
                <p className="text-secondary small mb-3">Withdraw cash from a customer's account</p>
                <div className="border-top pt-2 d-flex justify-content-between align-items-center">
                  <span className="text-primary fw-semibold small">Start Withdrawal</span>
                  <i className="bi bi-chevron-right text-secondary"></i>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* TRANSACTIONS */}
        <div className="col-xl-4 col-lg-4 col-md-6">
          <Link to={`/teller/${branchcode}/history`} className="text-decoration-none">
            <div className="card h-100 shadow-sm hover-shadow transition border-0">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="bg-primary bg-opacity-10 rounded-3 p-3">
                    <i className="bi bi-clock-history fs-3 text-primary"></i>
                  </div>
                  <i className="bi bi-arrow-up-right text-secondary opacity-50"></i>
                </div>
                <h5 className="fw-bold text-dark mb-1">Transaction History</h5>
                <p className="text-secondary small mb-3">View and export transaction records</p>
                <div className="border-top pt-2 d-flex justify-content-between align-items-center">
                  <span className="text-primary fw-semibold small">View History</span>
                  <i className="bi bi-chevron-right text-secondary"></i>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* ===== INFO CARDS ===== */}
      <div className="row g-3 mt-2">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="bg-primary bg-opacity-10 rounded-3 p-3">
                <i className="bi bi-shield-check fs-2 text-primary"></i>
              </div>
              <div>
                <h6 className="fw-bold mb-1">Secure Transactions</h6>
                <p className="text-secondary small mb-0">All teller operations are protected by your authenticated session</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="bg-success bg-opacity-10 rounded-3 p-3">
                <i className="bi bi-clock-history fs-2 text-success"></i>
              </div>
              <div>
                <h6 className="fw-bold mb-1">Transaction History</h6>
                <p className="text-secondary small mb-0">Review previous transactions and maintain accurate records</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="bg-purple bg-opacity-10 rounded-3 p-3">
                <i className="bi bi-bank fs-2 text-purple"></i>
              </div>
              <div>
                <h6 className="fw-bold mb-1">Branch Operations</h6>
                <p className="text-secondary small mb-0">All activities are performed for branch {loggedinUser?.branchname || branchcode}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== CUSTOM CSS FOR HOVER EFFECT ===== */}
      <style>{`
        .hover-shadow:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.08) !important;
          transition: all 0.3s ease;
        }
        .transition {
          transition: all 0.3s ease;
        }
        .text-purple {
          color: #7c3aed;
        }
        .bg-purple {
          background-color: #7c3aed;
        }
        .bg-purple.bg-opacity-10 {
          background-color: rgba(124, 58, 237, 0.1);
        }
      `}</style>

    </div>
  );
}