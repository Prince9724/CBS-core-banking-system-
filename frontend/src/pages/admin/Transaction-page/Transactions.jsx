import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiCalendar,
  FiChevronDown,
  FiDownload,
  FiEye,
  FiFilter,
  FiRefreshCw,
} from "react-icons/fi";
import {
  FaCreditCard,
  FaMoneyBillWave,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import "./transactions.css";

export default function AdminTransactions() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // ✅ Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  // ✅ Single Date - Start aur End ki jagah ek date
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const api = axios.create({
    baseURL: "http://localhost:5003",
    withCredentials: true,
  });

  // ✅ Fetch Transactions
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await api.get(
        `/cbs/customer/today-transactions?date=${selectedDate}`
      );
      setTransactions(res.data.data || []);
      console.log("📊 Transactions:", res.data.data);
    } catch (err) {
      console.error("❌ Error fetching transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch Branches
  const fetchBranches = async () => {
    try {
      const res = await api.get("/cbs/getbranch");
      setBranches(res.data.data || []);
    } catch (err) {
      console.error("❌ Error fetching branches:", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchBranches();
  }, [selectedDate]);

  // ✅ Filter Transactions
  const filteredTransactions = transactions.filter((txn) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      txn.accountNumber?.toLowerCase().includes(search) ||
      txn.customerName?.toLowerCase().includes(search) ||
      txn.transactionId?.toLowerCase().includes(search) ||
      txn._id?.toLowerCase().includes(search);

    const matchesBranch =
      selectedBranch === "All" || txn.branchcode === selectedBranch;

    const matchesType =
      selectedType === "All" || txn.type === selectedType;

    return matchesSearch && matchesBranch && matchesType;
  });

  // ✅ Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  // ✅ KPI Calculations
  const totalTransactions = filteredTransactions.length;
  const totalCredit = filteredTransactions
    .filter((t) => t.type === "Deposit")
    .reduce((sum, t) => sum + (t.amount || 0), 0);
  const totalDebit = filteredTransactions
    .filter((t) => t.type === "Withdraw")
    .reduce((sum, t) => sum + (t.amount || 0), 0);
  const netAmount = totalCredit - totalDebit;

  const kpiData = [
    {
      title: "Total Transactions",
      value: totalTransactions,
      change: `${totalTransactions} on ${selectedDate}`,
      icon: <FaCreditCard />,
      color: "#4f46e5",
    },
    {
      title: "Total Credit",
      value: `₹${totalCredit.toLocaleString()}`,
      change: "Deposits",
      icon: <FaArrowUp />,
      color: "#22c55e",
    },
    {
      title: "Total Debit",
      value: `₹${totalDebit.toLocaleString()}`,
      change: "Withdrawals",
      icon: <FaArrowDown />,
      color: "#ef4444",
    },
    {
      title: "Net Amount",
      value: `₹${netAmount.toLocaleString()}`,
      change: netAmount >= 0 ? "Positive Flow" : "Negative Flow",
      icon: <FaMoneyBillWave />,
      color: netAmount >= 0 ? "#22c55e" : "#ef4444",
    },
  ];

  const getStatusBadge = (status) => {
    const statusMap = {
      success: "badge-success",
      completed: "badge-success",
      pending: "badge-warning",
      failed: "badge-danger",
    };
    return (
      <span
        className={`badge ${
          statusMap[status?.toLowerCase()] || "badge-secondary"
        }`}
      >
        {status || "Completed"}
      </span>
    );
  };

  const getTypeBadge = (type) => {
    if (type === "Deposit" || type === "Credit") {
      return <span className="badge badge-credit">Deposit</span>;
    }
    return <span className="badge badge-debit">Withdraw</span>;
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedBranch("All");
    setSelectedType("All");
    setCurrentPage(1);
  };

  const exportCSV = () => {
    if (filteredTransactions.length === 0) {
      alert("No transactions to export");
      return;
    }
    const headers = [
      "Transaction ID",
      "Account",
      "Customer",
      "Type",
      "Amount",
      "Branch",
      "Date",
    ];
    const csvData = filteredTransactions.map((t) => [
      t.transactionId || t._id,
      t.accountNumber,
      t.customerName,
      t.type,
      t.amount,
      t.branchcode,
      new Date(t.createdAt).toLocaleString(),
    ]);
    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transactions_${selectedDate}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-secondary mt-2">Loading transactions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="transactions-page">
      {/* ===== HEADER ===== */}
      <div className="header-section">
        <div className="header-left">
          <h1 className="page-title">Transactions</h1>
          <div className="breadcrumb">
            Dashboard &gt; Transactions
            <span className="ms-2 text-secondary">
              ({filteredTransactions.length} transactions)
            </span>
          </div>
        </div>
        <div className="header-actions">
          <button
            className="btn-refresh"
            onClick={() => {
              fetchTransactions();
            }}
          >
            <FiRefreshCw /> Refresh
          </button>
          <button className="btn-export" onClick={exportCSV}>
            <FiDownload /> Export
          </button>
        </div>
      </div>

      {/* ===== KPI CARDS ===== */}
      <div className="kpi-grid">
        {kpiData.map((kpi, index) => (
          <div className="kpi-card" key={index}>
            <div className="kpi-card-header">
              <span className="kpi-title">{kpi.title}</span>
              <div className="kpi-icon" style={{ backgroundColor: kpi.color }}>
                {kpi.icon}
              </div>
            </div>
            <div className="kpi-value">{kpi.value}</div>
            <div className="kpi-change">{kpi.change}</div>
          </div>
        ))}
      </div>

      {/* ===== FILTERS ===== */}
      <div className="filter-section">
        <div className="filter-row">
          <div className="filter-item search-wrapper">
            <FiSearch className="filter-icon" />
            <input
              type="text"
              placeholder="Search by account, customer or ID..."
              className="filter-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-item dropdown-wrapper">
            <select
              className="filter-select"
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
            >
              <option value="All">All Branches</option>
              {branches.map((branch) => (
                <option key={branch._id} value={branch.branchcode}>
                  {branch.branchname} ({branch.branchcode})
                </option>
              ))}
            </select>
            <FiChevronDown className="dropdown-icon" />
          </div>

          <div className="filter-item dropdown-wrapper">
            <select
              className="filter-select"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Deposit">Deposit</option>
              <option value="Withdraw">Withdraw</option>
            </select>
            <FiChevronDown className="dropdown-icon" />
          </div>

          {/* ✅ SINGLE DATE FILTER - Sirf ek date */}
          <div className="filter-item date-wrapper">
            <FiCalendar className="filter-icon" />
            <input
              type="date"
              className="filter-input"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{ width: "160px" }}
            />
          </div>

          <button className="btn-reset" onClick={resetFilters}>
            <FiFilter /> Reset
          </button>
        </div>
      </div>

      {/* ===== TABLE ===== */}
      <div className="table-wrapper">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Account</th>
              <th>Customer</th>
              <th>Branch</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date &amp; Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-5 text-secondary">
                  <i className="bi bi-inbox fs-1 d-block mb-3"></i>
                  <h5>No transactions found</h5>
                  <p className="small">Try adjusting your filters</p>
                </td>
              </tr>
            ) : (
              currentTransactions.map((txn) => (
                <tr key={txn._id}>
                  <td data-label="Transaction ID">
                    <code className="txn-id">
                      {txn.transactionId || txn._id?.slice(-8)}
                    </code>
                  </td>
                  <td data-label="Account">{txn.accountNumber}</td>
                  <td data-label="Customer">{txn.customerName}</td>
                  <td data-label="Branch">
                    <span className="badge badge-branch">{txn.branchcode}</span>
                  </td>
                  <td data-label="Type">{getTypeBadge(txn.type)}</td>
                  <td
                    data-label="Amount"
                    className={txn.type === "Deposit" ? "text-credit" : "text-debit"}
                  >
                    {txn.type === "Deposit" ? "+" : "-"}₹
                    {txn.amount?.toLocaleString()}
                  </td>
                  <td data-label="Status">{getStatusBadge(txn.status)}</td>
                  <td data-label="Date & Time">
                    <div className="date-time">
                      <div>{new Date(txn.createdAt).toLocaleDateString()}</div>
                      <small>{new Date(txn.createdAt).toLocaleTimeString()}</small>
                    </div>
                  </td>
                  <td data-label="Actions">
                    <div className="action-buttons">
                      <button
                        className="action-btn"
                        title="View Details"
                        onClick={() => navigate(`/admin/transaction/${txn._id}`)}
                      >
                        <FiEye />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ===== PAGINATION ===== */}
      {filteredTransactions.length > itemsPerPage && (
        <div className="table-footer">
          <div className="footer-info">
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, filteredTransactions.length)} of{" "}
            {filteredTransactions.length} transactions
          </div>
          <div className="pagination">
            <button
              className="page-btn nav-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              ‹
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`page-btn ${
                  currentPage === i + 1 ? "active" : ""
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="page-btn nav-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}