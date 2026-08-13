
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logoutUser } from "../../App/features/authSlice";

export default function ManagerDashboard() {
    const { branchcode } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await dispatch(logoutUser()).unwrap();
        } catch (error) {
            console.log("Logout failed:", error);
        } finally {
            navigate("/login", { replace: true });
        }
    };
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
    // const [tellers, setTellers] = useState(0);

    useEffect(() => {
        fetchDashboard();
    }, [branchcode]);
    const fetchDashboard = async () => {
        try {
            const dashboardRes = await axios.get(
                `http://localhost:5003/cbs/customer/manager-dashboard/${branchcode}`,
                {
                    withCredentials: true
                }
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
            console.log(
                "Dashboard Error:",
                err.response?.data || err.message
            );
        }
    };
    return (
        <div className="d-flex min-vh-100 bg-light">
            {/* Sidebar */}
            <div
                className="bg-dark text-white p-4 shadow-lg"
                style={{ width: "280px", borderRadius: "0 24px 24px 0" }}
            >
                <h2 className="fw-bold mb-1">Dindoli</h2>
                <p className="text-secondary mb-4">{branchcode}</p>

                <hr className="border-secondary" />

                <div className="d-grid gap-3 mt-4">
                    <Link
                        to={`/manager/${branchcode}`}
                        className="btn btn-primary text-start py-3 px-4 rounded-4 fw-semibold"
                    >
                        📊 Dashboard
                    </Link>

                    <Link
                        to={`/manager/${branchcode}/customers`}
                        className="btn btn-outline-light text-start py-3 px-4 rounded-4"
                    >
                        👥 Customers
                    </Link>

                    <Link
                        to={`/manager/${branchcode}/accounts`}
                        className="btn btn-outline-primary rounded-3 px-4"
                    >
                        💳 Open Account
                    </Link>

                    <Link to={`/manager/${branchcode}/transactions`}>
                        <div className="card bg-info text-dark p-4 shadow h-100">
                            <h4>📄 Transactions</h4>
                            <p className="mb-0">View today live transactions</p>
                        </div>
                    </Link>
                    <button className="btn btn-danger" onClick={handleLogout}>
                        Logout
                    </button>
                </div>

                {/* Extra Feature */}
                <div className="mt-5 p-3 rounded-4 bg-secondary bg-opacity-25">
                    <h6 className="fw-bold mb-2">🏦 Branch Status</h6>
                    <p className="mb-1 text-success fw-semibold">● Active</p>
                    <small className="text-secondary">
                        Last updated: {new Date().toLocaleTimeString()}
                    </small>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow-1 p-4 p-lg-5">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                    <div>
                        <h1 className="fw-bold mb-1">🏦 Dindoli Dashboard</h1>
                        <p className="text-muted mb-0">
                            Welcome back! Here is today’s branch overview.
                        </p>
                    </div>

                    <div className="d-flex gap-2 flex-wrap">
                        <Link
                            to={`/manager/${branchcode}/customers`}
                            className="btn btn-primary rounded-3 px-4"
                        >
                            ➕ Add Customer
                        </Link>

                        <Link
                            to="/manager/accounts"
                            className="btn btn-outline-primary rounded-3 px-4"
                        >
                            💳 Open Account
                        </Link>
                    </div>
                </div>

                {/* Top Stats */}
                <div className="row g-4 mb-4">
                    <div className="col-md-6 col-xl-3">
                        <div className="card border-0 shadow-sm rounded-4 h-100">
                            <div className="card-body p-4 text-center">
                                <div className="fs-2 mb-2">👥</div>
                                <h6 className="text-muted mb-2">Total Customers</h6>
                                <h2 className="fw-bold mb-0">{stats.totalCustomers}</h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-xl-3">
                        <div className="card border-0 shadow-sm rounded-4 h-100">
                            <div className="card-body p-4 text-center">
                                <div className="fs-2 mb-2">💳</div>
                                <h6 className="text-muted mb-2">Total Accounts</h6>
                                <h2 className="fw-bold mb-0">{stats.totalAccounts}</h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-xl-3">
                        <div className="card border-0 shadow-sm rounded-4 h-100">
                            <div className="card-body p-4 text-center">
                                <div className="fs-2 mb-2">💰</div>
                                <h6 className="text-muted mb-2">Branch Balance</h6>
                                <h4 className="fw-bold text-success mb-0">
                                    ₹{stats.totalBranchBalance}
                                </h4>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-xl-3">
                        <div className="card border-0 shadow-sm rounded-4 h-100">
                            <div className="card-body p-4 text-center">
                                <div className="fs-2 mb-2">👨‍💼</div>
                                <h6 className="text-muted mb-2">Active Tellers</h6>
                                <h2 className="fw-bold mb-0">{stats.totalTellers}</h2>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transaction Stats */}
                <div className="row g-4 mb-4">
                    <div className="col-md-4">
                        <div className="card border-0 shadow-sm rounded-4 h-100 bg-success text-white">
                            <div className="card-body p-4">
                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <h6 className="text-white-50 mb-2">Today Deposit</h6>
                                        <h3 className="fw-bold mb-0">₹{stats.todayDeposit}</h3>
                                    </div>
                                    <div className="fs-2">⬇️</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card border-0 shadow-sm rounded-4 h-100 bg-warning text-dark">
                            <div className="card-body p-4">
                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <h6 className="text-dark-50 mb-2">Today Withdraw</h6>
                                        <h3 className="fw-bold mb-0">₹{stats.todayWithdraw}</h3>
                                    </div>
                                    <div className="fs-2">⬆️</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card border-0 shadow-sm rounded-4 h-100 bg-primary text-white">
                            <div className="card-body p-4">
                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <h6 className="text-white-50 mb-2">
                                            Today Transactions
                                        </h6>
                                        <h3 className="fw-bold mb-0">{stats.todayTransactions}</h3>
                                    </div>
                                    <div className="fs-2">🔄</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="card border-0 shadow-sm rounded-4 mb-4">
                    <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center py-3">
                        <h5 className="fw-bold mb-0">📄 Recent Transactions</h5>
                        <Link
                            to={`/teller/${branchcode}/history`}
                            className="btn btn-sm btn-outline-primary rounded-3"
                        >
                            View All
                        </Link>
                    </div>

                    <div className="table-responsive">
                        <table className="table align-middle">
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
                                {recentTransactions.map((t) => (
                                    <tr key={t._id}>
                                        <td>{t.accountNumber}</td>

                                        <td>{t.customerName}</td>

                                        <td>
                                            <span
                                                className={`badge ${t.type === "Deposit"
                                                    ? "bg-success"
                                                    : "bg-warning text-dark"
                                                    }`}
                                            >
                                                {t.type}
                                            </span>
                                        </td>

                                        <td>₹{t.amount}</td>

                                        <td>₹{t.balanceAfter}</td>

                                        <td>
                                            {t.performedBy}
                                            <br />
                                            <small className="text-muted">
                                                {t.performedByRole}
                                            </small>
                                        </td>

                                        <td>
                                            {new Date(t.createdAt).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Extra Features */}
                <div className="row g-4">
                    <div className="col-lg-6">
                        <div className="card border-0 shadow-sm rounded-4 h-100">
                            <div className="card-body p-4">
                                <h5 className="fw-bold mb-3">⚡ Quick Actions</h5>

                                <div className="d-grid gap-3">
                                    <Link
                                        to={`/manager/${branchcode}/customers`}
                                        className="btn btn-outline-primary rounded-3 py-2"
                                    >
                                        ➕ Add New Customer
                                    </Link>

                                    <Link
                                        to="/manager/accounts"
                                        className="btn btn-outline-success rounded-3 py-2"
                                    >
                                        💳 Open New Account
                                    </Link>

                                    <Link
                                        to={`/teller/${branchcode}/history`}
                                        className="btn btn-outline-info rounded-3 py-2"
                                    >
                                        📄 View Transaction History
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="card border-0 shadow-sm rounded-4 h-100">
                            <div className="card-body p-4">
                                <h5 className="fw-bold mb-3">📊 Branch Insights</h5>

                                <div className="d-flex flex-column gap-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span>Customers Growth</span>
                                        <span className="fw-semibold text-success">+12%</span>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <span>Deposit Performance</span>
                                        <span className="fw-semibold text-success">+8%</span>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <span>Withdraw Ratio</span>
                                        <span className="fw-semibold text-warning">32%</span>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <span>Branch Health</span>
                                        <span className="fw-semibold text-success">Excellent</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

