import { useEffect, useState } from "react";
import axios from "axios";
import "./ManagerTransactions.css";

export default function ManagerTransactions() {
  const [transactions, setTransactions] = useState([]);import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BsWallet2,
  BsBank,
  BsCreditCard2Front,
  BsFileEarmarkText,
  BsSearch,
  BsFilter,
  BsChevronLeft,
  BsChevronRight,
  BsEye,
  BsPencil,
  BsTrash,
} from "react-icons/bs";
import axios from "axios";
import "./accounts.css";

export default function AdminAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [typeFilter, setTypeFilter] = useState("All");
  const [branchFilter, setBranchFilter] = useState("All");

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:5003/cbs/customer/accounts",
        { withCredentials: true }
      );
      if (res.data.status) {
        setAccounts(res.data.data || []);
      }
    } catch (err) {
      console.error("Error fetching accounts:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBranches = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5003/cbs/getbranch",
        { withCredentials: true }
      );
      if (res.data.status) {
        setBranches(res.data.data || []);
      }
    } catch (err) {
      console.error("Error fetching branches:", err);
    }
  };

  useEffect(() => {
    fetchAccounts();
    fetchBranches();
  }, []);

  // ========== ✅ STATS - SAB UNIQUE NAMES ==========
  const totalAccounts = accounts.length;

  const savingsAccounts = accounts.filter(
    (a) => a.accountType?.toLowerCase() === "savings"
  );

  // ✅ FIXED: currentAccounts → currentTypeAccounts
  const currentTypeAccounts = accounts.filter(
    (a) => a.accountType?.toLowerCase() === "current"
  );

  const fdLoanAccounts = accounts.filter(
    (a) => a.accountType?.toLowerCase() === "fd" || 
           a.accountType?.toLowerCase() === "loan" ||
           a.accountType?.toLowerCase() === "fixed deposit"
  );

  const branchWiseAccounts = branches.map((branch) => ({
    name: branch.branchname,
    code: branch.branchcode,
    count: accounts.filter((a) => a.branchcode === branch.branchcode).length,
    balance: accounts
      .filter((a) => a.branchcode === branch.branchcode)
      .reduce((sum, acc) => sum + (acc.balance || 0), 0),
  }));

  const totalBranchBalance = accounts.reduce(
    (sum, acc) => sum + (acc.balance || 0),
    0
  );

  const stats = [
    {
      title: "Total Accounts",
      value: totalAccounts,
      growth: `${branches.length} branches`,
      icon: <BsWallet2 />,
      bg: "#1D4ED8",
      color: "#3B82F6",
    },
    {
      title: "Savings Accounts",
      value: savingsAccounts.length,
      growth: "Savings account holders",
      icon: <BsBank />,
      bg: "#166534",
      color: "#22C55E",
    },
    {
      title: "Current Accounts",
      // ✅ FIXED: currentAccounts → currentTypeAccounts
      value: currentTypeAccounts.length,
      growth: "Current account holders",
      icon: <BsCreditCard2Front />,
      bg: "#B45309",
      color: "#F59E0B",
    },
    {
      title: "FD / Loan Accounts",
      value: fdLoanAccounts.length,
      growth: "Fixed deposit holders",
      icon: <BsFileEarmarkText />,
      bg: "#6D28D9",
      color: "#8B5CF6",
    },
  ];

  const filteredAccounts = accounts.filter((account) => {
    const search = searchTerm.toLowerCase();
    const accNum = account.accountNumber?.toString().toLowerCase() || "";
    const custName = account.customerId?.name?.toString().toLowerCase() || "";
    const accType = account.accountType?.toString().toLowerCase() || "";

    const matchesSearch =
      accNum.includes(search) ||
      custName.includes(search) ||
      accType.includes(search);

    const matchesType =
      typeFilter === "All" ||
      account.accountType?.toLowerCase() === typeFilter.toLowerCase();

    const matchesBranch =
      branchFilter === "All" || account.branchcode === branchFilter;

    return matchesSearch && matchesType && matchesBranch;
  });

  // ========== ✅ FIXED: currentAccounts → paginatedAccounts ==========
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedAccounts = filteredAccounts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);

  return (
    <div className="accounts-page">
      <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
        <div>
          <h2 className="accounts-title">Accounts</h2>
          <p className="accounts-breadcrumb">
            <Link to="/admin" className="text-decoration-none">Dashboard</Link>
            <span>›</span> Accounts
          </p>
        </div>
      </div>

      <div className="row g-4">
        {stats.map((item, index) => (
          <div className="col-xl-3 col-lg-6 col-md-6 col-12" key={index}>
            <div className="account-stat-card">
              <div
                className="account-icon"
                style={{
                  background: `${item.color}20`,
                  color: item.color,
                }}
              >
                {item.icon}
              </div>
              <div className="account-content">
                <p className="account-label">{item.title}</p>
                <h3 className="account-value">{item.value.toLocaleString()}</h3>
                <div className="account-growth">
                  <span>{item.growth}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row mt-4 g-3">
        <div className="col-12">
          <div className="branch-wise-card">
            <h6 className="mb-3">
              <i className="bi bi-building me-2"></i>
              Branch-wise Accounts
            </h6>
            <div className="d-flex flex-wrap gap-3">
              <span className="branch-count-badge bg-primary">
                All: {totalAccounts} accounts
              </span>
              {branchWiseAccounts.map((branch, i) => (
                <span key={i} className="branch-count-badge bg-secondary">
                  {branch.name}: {branch.count} accounts
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-3 g-3">
        <div className="col-12">
          <div className="branch-wise-card bg-success bg-opacity-10 border-success">
            <h6 className="mb-0">
              <i className="bi bi-cash-stack me-2 text-success"></i>
              Total Bank Balance: <strong>₹{totalBranchBalance.toLocaleString()}</strong>
            </h6>
          </div>
        </div>
      </div>

      <div className="d-flex flex-wrap gap-3 mt-4">
        <div className="search-box">
          <BsSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by account number, customer name or type..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="form-control form-control-sm"
            style={{ width: "280px" }}
          />
        </div>

        <select
          className="form-select form-select-sm"
          style={{ width: "150px" }}
          value={typeFilter}
          onChange={(e) => {
            setTypeFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="All">All Types</option>
          <option value="Savings">Savings</option>
          <option value="Current">Current</option>
          <option value="FD">FD / Loan</option>
        </select>

        <select
          className="form-select form-select-sm"
          style={{ width: "180px" }}
          value={branchFilter}
          onChange={(e) => {
            setBranchFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="All">All Branches</option>
          {branches.map((branch) => (
            <option key={branch._id} value={branch.branchcode}>
              {branch.branchname} ({branch.branchcode})
            </option>
          ))}
        </select>

        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => {
            setSearchTerm("");
            setTypeFilter("All");
            setBranchFilter("All");
            setCurrentPage(1);
          }}
        >
          <BsFilter className="me-1" /> Reset
        </button>
      </div>

      <div className="mt-4">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th>S.No</th>
                <th>Account Number</th>
                <th>Customer Name</th>
                <th>Account Type</th>
                <th>Balance</th>
                <th>Branch</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : paginatedAccounts.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-muted">
                    <i className="bi bi-inbox fs-2 d-block mb-2"></i>
                    No accounts found
                  </td>
                </tr>
              ) : (
                paginatedAccounts.map((account, index) => (
                  <tr key={account._id}>
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td>
                      <code className="account-number">
                        {account.accountNumber}
                      </code>
                    </td>
                    <td>
                      <strong>{account.customerId?.name || account.customerName || "N/A"}</strong>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          account.accountType?.toLowerCase() === "savings"
                            ? "bg-success"
                            : account.accountType?.toLowerCase() === "current"
                            ? "bg-warning text-dark"
                            : "bg-info"
                        }`}
                      >
                        {account.accountType || "N/A"}
                      </span>
                    </td>
                    <td>
                      <strong>₹{account.balance?.toLocaleString() || 0}</strong>
                    </td>
                    <td>
                      <span className="badge bg-secondary">
                        {account.branchname || account.branchcode || "N/A"}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          account.status === "inactive" || account.status === "Inactive"
                            ? "bg-danger"
                            : "bg-success"
                        }`}
                      >
                        {account.status || "Active"}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-outline-primary" title="View">
                          <BsEye />
                        </button>
                        <button className="btn btn-sm btn-outline-warning" title="Edit">
                          <BsPencil />
                        </button>
                        <button className="btn btn-sm btn-outline-danger" title="Delete">
                          <BsTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {filteredAccounts.length > itemsPerPage && (
          <div className="d-flex justify-content-between align-items-center mt-3">
            <span className="text-muted small">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, filteredAccounts.length)} of{" "}
              {filteredAccounts.length} accounts
            </span>
            <nav>
              <ul className="pagination pagination-sm mb-0">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    <BsChevronLeft /> Previous
                  </button>
                </li>
                {[...Array(totalPages)].map((_, i) => (
                  <li
                    key={i}
                    className={`page-item ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next <BsChevronRight />
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:5003/cbs/customer/today-transactions?date=${selectedDate}`,
        {
          withCredentials: true,
        }
      );

      console.log("TRANSACTIONS RESPONSE:", res.data);

      setTransactions(res.data.data || []);
    } catch (err) {
      console.log(
        "TRANSACTION ERROR:",
        err.response?.data || err.message
      );

      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [selectedDate]);

  const filtered = transactions.filter((t) => {
    const account = String(t.accountNumber || "").toLowerCase();
    const customer = String(t.customerName || "").toLowerCase();
    const searchText = search.toLowerCase();

    return (
      account.includes(searchText) ||
      customer.includes(searchText)
    );
  });

  return (
    <div className="container py-4 text-dark">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>
            📄 Transaction History
          </h2>

          <p className="text-secondary mb-0">
            Branch transaction history
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={fetchTransactions}
        >
          🔄 Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="row g-3 mb-4">

        <div className="col-md-5">
          <label className="form-label fw-semibold">
            📅 Select Date
          </label>

          <input
            type="date"
            className="form-control"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <div className="col-md-7">
          <label className="form-label fw-semibold">
            🔍 Search
          </label>

          <input
            type="text"
            className="form-control"
            placeholder="Account number or customer name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

      </div>

      {/* Summary */}
      <div className="card bg-dark text-white mb-4">
        <div className="card-body">

          <h5 className="mb-1">
            📅 {selectedDate}
          </h5>

          <small className="text-secondary">
            Total Transactions: {filtered.length}
          </small>

        </div>
      </div>

      {/* Table */}
      {loading ? (

        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
          <p className="mt-3">
            Loading transactions...
          </p>
        </div>

      ) : filtered.length === 0 ? (

        <div className="alert alert-info">
          No transactions found for {selectedDate}.
        </div>

      ) : (

        <div className="table-responsive">

          <table className="table table-dark table-hover align-middle">

            <thead>
              <tr>
                <th>Account</th>
                <th>Customer</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Balance After</th>
                <th>Performed By</th>
                <th>Date & Time</th>
              </tr>
            </thead>

            <tbody>

              {filtered.map((t) => (

                <tr key={t._id}>

                  <td>
                    <strong>
                      {t.accountNumber}
                    </strong>
                  </td>

                  <td>
                    {t.customerName}
                  </td>

                  <td>

                    <span
                      className={
                        t.type === "Deposit"
                          ? "badge bg-success"
                          : "badge bg-warning text-dark"
                      }
                    >
                      {t.type}
                    </span>

                  </td>

                  <td>
                    ₹{t.amount}
                  </td>

                  <td>
                    ₹{t.balanceAfter}
                  </td>

                  <td>
                    {t.performedBy || "-"}
                    <br />

                    <small className="text-secondary">
                      {t.performedByRole || ""}
                    </small>
                  </td>

                  <td>
                    {t.createdAt
                      ? new Date(t.createdAt).toLocaleString()
                      : "-"}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}