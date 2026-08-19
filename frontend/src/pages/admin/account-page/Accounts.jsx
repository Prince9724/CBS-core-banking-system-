import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccounts } from "../../../feature/features/accountSlice.js";
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

export default function AdminAccounts() {
  const dispatch = useDispatch();
  const { accounts, loading: sliceLoading } = useSelector(
    (state) => state.account
  );

  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [typeFilter, setTypeFilter] = useState("All");
  const [branchFilter, setBranchFilter] = useState("All");
  const [editAccount, setEditAccount] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

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
    dispatch(fetchAccounts());
    fetchBranches();
  }, []);

  // ========== ✅ DELETE ACCOUNT ==========
  const handleDelete = async (id, accountNumber) => {
    if (!window.confirm(`Are you sure you want to delete account ${accountNumber}?`)) return;

    try {
      await axios.delete(`http://localhost:5003/cbs/customer/delete/${id}`, {
        withCredentials: true,
      });
      alert("✅ Account deleted successfully");
      dispatch(fetchAccounts());
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete account");
    }
  };

  // ========== ✅ UPDATE ACCOUNT ==========
  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5003/cbs/customer/update/${editAccount._id}`,
        editAccount,
        { withCredentials: true }
      );
      alert("✅ Account updated successfully");
      setShowEditModal(false);
      setEditAccount(null);
      dispatch(fetchAccounts());
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update account");
    }
  };

  // ========== ✅ REAL STATS ==========
  const totalAccounts = accounts.length;
  const savingsAccounts = accounts.filter(
    (a) => a.accountType?.toLowerCase() === "savings"
  );
  const currentAccounts = accounts.filter(
    (a) => a.accountType?.toLowerCase() === "current"
  );
  const loanAccounts = accounts.filter(
    (a) => a.accountType?.toLowerCase() === "loan" ||
           a.accountType?.toLowerCase() === "fd" ||
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
      value: currentAccounts.length,
      growth: "Current account holders",
      icon: <BsCreditCard2Front />,
      bg: "#B45309",
      color: "#F59E0B",
    },
    {
      title: "Loan / FD Accounts",
      value: loanAccounts.length,
      growth: "Loan & FD holders",
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAccountsList = filteredAccounts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);

  return (
    <div className="container-fluid px-4 py-4 bg-dark min-vh-100">

      {/* ===== BREADCRUMB ===== */}
      <div className="d-flex gap-2 justify-content-end" style={{ fontSize: "14px" }}>
        <Link className="text-primary text-decoration-none" to={"/admin"}>
          Dashboard
        </Link>
        <span className="text-secondary">›</span>
        <span className="text-secondary">Accounts</span>
      </div>

      {/* ===== HEADER ===== */}
      <div className="d-flex justify-content-between mt-3 mb-4">
        <div>
          <h1 className="text-white fw-bold mb-1">Accounts</h1>
          <p className="text-secondary m-0">Manage all bank accounts</p>
        </div>
        {/* <Link to={"/admin/accounts/open"} className="btn btn-primary d-flex align-items-center gap-2">
          <i className="bi bi-plus"></i> Open Account
        </Link> */}
      </div>

      {/* ===== STATS CARDS ===== */}
      <div className="row g-3 mb-4">
        {stats.map((item, i) => (
          <div className="col-xl-3 col-lg-4 col-md-6" key={i}>
            <div className="card bg-dark border-secondary h-100">
              <div className="card-body d-flex align-items-center gap-3">
                <div
                  className="rounded-3 p-3 d-flex align-items-center justify-content-center"
                  style={{ background: `${item.color}20`, color: item.color }}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="text-secondary small fw-semibold text-uppercase mb-0">{item.title}</p>
                  <h3 className="text-white fw-bold mb-0">{item.value}</h3>
                  <small className="text-secondary">{item.growth}</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== BRANCH WISE ACCOUNTS ===== */}
      <div className="card bg-dark border-secondary mb-4">
        <div className="card-body">
          <h6 className="text-white mb-3">
            <i className="bi bi-building me-2 text-primary"></i>
            Branch-wise Accounts
          </h6>
          <div className="d-flex flex-wrap gap-2">
            <span className="badge bg-primary px-3 py-2">
              All: {totalAccounts} accounts
            </span>
            {branchWiseAccounts.map((branch, i) => (
              <span key={i} className="badge bg-secondary px-3 py-2">
                {branch.name}: {branch.count} accounts
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ===== TOTAL BALANCE ===== */}
      <div className="card bg-dark border-secondary mb-4">
        <div className="card-body">
          <h6 className="text-white mb-0">
            <i className="bi bi-cash-stack me-2 text-success"></i>
            Total Bank Balance: <strong>₹{totalBranchBalance.toLocaleString()}</strong>
          </h6>
        </div>
      </div>

      {/* ===== FILTERS ===== */}
      <div className="d-flex flex-wrap gap-3 mb-4">
        <div className="d-flex align-items-center bg-dark border border-secondary rounded-3 px-3">
          <i className="bi bi-search text-secondary"></i>
          <input
            type="text"
            placeholder="Search by account number, customer name or type..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-transparent border-0 text-white py-2 px-2"
            style={{ width: "280px", outline: "none" }}
          />
        </div>

        <select
          className="form-select bg-dark text-white border-secondary"
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
          className="form-select bg-dark text-white border-secondary"
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
          className="btn btn-outline-secondary d-flex align-items-center gap-2"
          onClick={() => {
            setSearchTerm("");
            setTypeFilter("All");
            setBranchFilter("All");
            setCurrentPage(1);
          }}
        >
          <BsFilter /> Reset
        </button>
      </div>

      {/* ===== ACCOUNTS TABLE ===== */}
      <div className="card bg-dark border-secondary">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-dark table-hover align-middle mb-0">
              <thead>
                <tr className="border-secondary">
                  <th className="ps-4">S.No</th>
                  <th>Account Number</th>
                  <th>Customer Name</th>
                  <th>Account Type</th>
                  <th>Balance</th>
                  <th>Branch</th>
                  <th className="pe-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sliceLoading || loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : currentAccountsList.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5 text-secondary">
                      <i className="bi bi-inbox fs-1 d-block mb-3"></i>
                      <h5>No accounts found</h5>
                      <p className="small">Try adjusting your search or filters</p>
                    </td>
                  </tr>
                ) : (
                  currentAccountsList.map((account, index) => (
                    <tr key={account._id} className="border-secondary">
                      <td className="ps-4">{indexOfFirstItem + index + 1}</td>
                      <td>
                        <code className="bg-dark text-secondary px-2 py-1 rounded">
                          {account.accountNumber}
                        </code>
                      </td>
                      <td className="text-white">
                        {account.customerId?.name || account.customerName || "N/A"}
                      </td>
                      <td>
                        <span className={`badge ${
                          account.accountType?.toLowerCase() === "savings"
                            ? "bg-success bg-opacity-10 text-success"
                            : account.accountType?.toLowerCase() === "current"
                            ? "bg-warning bg-opacity-10 text-warning"
                            : "bg-info bg-opacity-10 text-info"
                        }`}>
                          {account.accountType || "N/A"}
                        </span>
                      </td>
                      <td>
                        <strong className="text-white">
                          ₹{account.balance?.toLocaleString() || 0}
                        </strong>
                      </td>
                      <td>
                        <span className="badge bg-secondary bg-opacity-10 text-secondary">
                          {account.branchname || account.branchcode || "N/A"}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex gap-2 justify-content-center">
                          {/* ✅ VIEW - Working */}
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => alert(
                              `Account Details:\nAccount No: ${account.accountNumber}\nCustomer: ${account.customerId?.name || account.customerName}\nType: ${account.accountType}\nBalance: ₹${account.balance?.toLocaleString()}\nBranch: ${account.branchname || account.branchcode}`
                            )}
                          >
                            <BsEye />
                          </button>
                          {/* ✅ EDIT - Working */}
                          <button
                            className="btn btn-sm btn-outline-warning"
                            onClick={() => {
                              setEditAccount({
                                _id: account._id,
                                accountNumber: account.accountNumber,
                                accountType: account.accountType,
                                balance: account.balance,
                                branchname: account.branchname,
                                branchcode: account.branchcode,
                                customerId: account.customerId,
                                customerName: account.customerName,
                              });
                              setShowEditModal(true);
                            }}
                          >
                            <BsPencil />
                          </button>
                          {/* ✅ DELETE - Working */}
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(account._id, account.accountNumber)}
                          >
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
        </div>
      </div>

      {/* ===== PAGINATION ===== */}
      {filteredAccounts.length > itemsPerPage && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span className="text-secondary small">
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, filteredAccounts.length)} of{" "}
            {filteredAccounts.length} accounts
          </span>
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link bg-dark border-secondary text-white"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  <BsChevronLeft /> Previous
                </button>
              </li>
              {[...Array(totalPages)].map((_, i) => (
                <li
                  key={i}
                  className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link bg-dark border-secondary text-white"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
              >
                <button
                  className="page-link bg-dark border-secondary text-white"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next <BsChevronRight />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* ===== EDIT MODAL ===== */}
      {showEditModal && editAccount && (
        <div className="modal d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.7)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-white border-secondary">
              <div className="modal-header border-secondary">
                <h5 className="modal-title">
                  <i className="bi bi-pencil-square me-2 text-warning"></i>
                  Edit Account
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditAccount(null);
                  }}
                ></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label text-secondary small">Account Number</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    value={editAccount.accountNumber || ""}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-secondary small">Customer Name</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    value={editAccount.customerName || editAccount.customerId?.name || ""}
                    onChange={(e) =>
                      setEditAccount({ ...editAccount, customerName: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-secondary small">Account Type</label>
                  <select
                    className="form-select bg-dark text-white border-secondary"
                    value={editAccount.accountType || "Savings"}
                    onChange={(e) =>
                      setEditAccount({ ...editAccount, accountType: e.target.value })
                    }
                  >
                    <option value="Savings">Savings</option>
                    <option value="Current">Current</option>
                    <option value="FD">Fixed Deposit</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label text-secondary small">Balance</label>
                  <input
                    type="number"
                    className="form-control bg-dark text-white border-secondary"
                    value={editAccount.balance || 0}
                    onChange={(e) =>
                      setEditAccount({ ...editAccount, balance: Number(e.target.value) })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-secondary small">Branch</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    value={editAccount.branchname || editAccount.branchcode || ""}
                    onChange={(e) =>
                      setEditAccount({ ...editAccount, branchname: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="modal-footer border-secondary">
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditAccount(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary d-flex align-items-center gap-2"
                  onClick={handleUpdate}
                >
                  <i className="bi bi-check-lg"></i>
                  Update Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .table-dark {
          --bs-table-bg: transparent;
        }
        .table-dark td, .table-dark th {
          border-color: #2a2f3a;
        }
        .table-dark tbody tr:hover {
          background: rgba(255, 255, 255, 0.02);
        }
        .form-select {
          cursor: pointer;
        }
        .form-select option {
          background: #1a2a42;
        }
        input::placeholder {
          color: #6b8aa8;
        }
        .page-link.bg-dark:hover {
          background: #2a3f5a !important;
        }
        .modal-content {
          border-radius: 12px;
        }
        .form-control:focus, .form-select:focus {
          border-color: #0d6efd;
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
        }
        .badge.bg-success.bg-opacity-10 {
          background: rgba(34, 197, 94, 0.15) !important;
          color: #22c55e !important;
        }
        .badge.bg-warning.bg-opacity-10 {
          background: rgba(245, 158, 11, 0.15) !important;
          color: #f59e0b !important;
        }
        .badge.bg-info.bg-opacity-10 {
          background: rgba(13, 202, 240, 0.15) !important;
          color: #0dcaf0 !important;
        }
        .badge.bg-secondary.bg-opacity-10 {
          background: rgba(108, 117, 125, 0.15) !important;
          color: #adb5bd !important;
        }
      `}</style>

    </div>
  );
}