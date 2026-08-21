import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Accounts.css";

export default function ManagerAccounts() {
  const { branchcode } = useParams();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [accountType, setAccountType] = useState("Savings");
  const [openingBalance, setOpeningBalance] = useState(1000);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // ✅ Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // ✅ Account Password State
  const [accountPassword, setAccountPassword] = useState("");
  const [showPasswordField, setShowPasswordField] = useState(false);

  // ✅ Customer Form State
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [customerForm, setCustomerForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    aadhar: "",
    pan: ""
  });

  // 🔍 Search Customer
  const handleSearch = async () => {
    if (search.length < 2) {
      setResults([]);
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:5003/cbs/customer/search?search=${search}`,
        { withCredentials: true }
      );
      setResults(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch();
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // 📋 Fetch Accounts - NEW ACCOUNTS FIRST
  const fetchAccounts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5003/cbs/customer/accounts",
        { withCredentials: true }
      );
      const sortedAccounts = (res.data.data || []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setAccounts(sortedAccounts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  // ✅ ADD CUSTOMER
  const handleAddCustomer = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5003/cbs/customer/add",
        customerForm,
        { withCredentials: true }
      );

      alert("✅ Customer added successfully!");
      setShowCustomerForm(false);
      setCustomerForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        aadhar: "",
        pan: ""
      });
      
      if (search.length >= 2) {
        handleSearch();
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add customer");
    } finally {
      setLoading(false);
    }
  };

  // 💳 Open Account - WITH PASSWORD
  const handleOpenAccount = async () => {
    if (!selectedCustomer) return alert("Please select customer");

    setLoading(true);
    try {
      const payload = {
        customerId: selectedCustomer._id,
        accountType,
        openingBalance: Number(openingBalance),
      };

      if (accountPassword && accountPassword.trim() !== "") {
        payload.accountPassword = accountPassword;
      }

      const res = await axios.post(
        "http://localhost:5003/cbs/customer/openaccount",
        payload,
        { withCredentials: true }
      );

      alert(`✅ Account Created Successfully!\nAccount No: ${res.data.data.accountNumber}`);

      setSelectedCustomer(null);
      setSearch("");
      setResults([]);
      setOpeningBalance(1000);
      setAccountPassword("");
      setShowPasswordField(false);
      fetchAccounts();

    } catch (err) {
      alert(err.response?.data?.message || "Failed to open account");
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE ACCOUNT - NEW FUNCTION
  const handleDeleteAccount = async (accountId, accountNumber) => {
    if (!window.confirm(`Are you sure you want to delete account ${accountNumber}?`)) {
      return;
    }

    try {
      setLoading(true);
      await axios.delete(
        `http://localhost:5003/cbs/customer/account/${accountId}`,
        { withCredentials: true }
      );
      
      alert(`✅ Account ${accountNumber} deleted successfully!`);
      fetchAccounts(); // Refresh list
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete account");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Branch-wise accounts (sorted - newest first)
  const branchAccounts = accounts.filter((a) => a.branchcode === branchcode);

  // ✅ Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAccounts = branchAccounts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(branchAccounts.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container-fluid px-4 py-4 bg-dark min-vh-100">

      {/* ===== HEADER ===== */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <span className="badge bg-info bg-opacity-10 text-info mb-2">
            <i className="bi bi-wallet2 me-1"></i>
            Account Management
          </span>
          <h1 className="text-white fw-bold mb-1">Accounts</h1>
          <p className="text-secondary m-0">
            Total: <strong className="text-white">{branchAccounts.length}</strong> accounts
          </p>
        </div>
        <div className="d-flex align-items-center gap-2 bg-dark border border-secondary rounded-3 px-3 py-2">
          <i className="bi bi-bank2 text-primary"></i>
          <span className="text-white">{currentAccounts.length} / {branchAccounts.length}</span>
        </div>
      </div>

      {/* ===== SEARCH + ADD CUSTOMER ===== */}
      <div className="card bg-dark border-secondary mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-primary bg-opacity-10 rounded-3 p-3">
                <i className="bi bi-search fs-4 text-primary"></i>
              </div>
              <div>
                <h5 className="text-white mb-0">Search Customer</h5>
                <p className="text-secondary small mb-0">Find a customer by name, email or Aadhar number</p>
              </div>
            </div>
          </div>

          <div className="d-flex gap-3 flex-wrap">
            <div className="flex-grow-1 position-relative">
              <i className="bi bi-search position-absolute text-secondary" style={{ left: "14px", top: "12px" }}></i>
              <input
                type="text"
                className="form-control bg-dark text-white border-secondary ps-5"
                placeholder="Search by Name, Email or Aadhar"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button
              className="btn btn-primary d-flex align-items-center gap-2"
              onClick={handleSearch}
            >
              <i className="bi bi-search"></i>
              Search
            </button>
          </div>

          {/* ✅ ADD CUSTOMER FORM */}
          {showCustomerForm && (
            <div className="mt-3 p-3 bg-dark bg-opacity-50 rounded-3 border border-secondary">
              <h6 className="text-white mb-3">
                <i className="bi bi-person-plus-fill me-2 text-success"></i>
                Add New Customer
              </h6>
              <div className="row g-2">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    placeholder="Full Name *"
                    value={customerForm.name}
                    onChange={(e) => setCustomerForm({ ...customerForm, name: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="email"
                    className="form-control bg-dark text-white border-secondary"
                    placeholder="Email *"
                    value={customerForm.email}
                    onChange={(e) => setCustomerForm({ ...customerForm, email: e.target.value })}
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    placeholder="Phone *"
                    value={customerForm.phone}
                    onChange={(e) => setCustomerForm({ ...customerForm, phone: e.target.value })}
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    placeholder="Aadhar"
                    value={customerForm.aadhar}
                    onChange={(e) => setCustomerForm({ ...customerForm, aadhar: e.target.value })}
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    placeholder="PAN"
                    value={customerForm.pan}
                    onChange={(e) => setCustomerForm({ ...customerForm, pan: e.target.value })}
                  />
                </div>
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    placeholder="Address"
                    value={customerForm.address}
                    onChange={(e) => setCustomerForm({ ...customerForm, address: e.target.value })}
                  />
                </div>
                <div className="col-12">
                  <button
                    className="btn btn-success w-100"
                    onClick={handleAddCustomer}
                    disabled={loading}
                  >
                    {loading ? "Adding..." : "Add Customer"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Search Results */}
          {results.length > 0 && (
            <div className="mt-3 p-2 bg-dark bg-opacity-50 rounded-3 border border-secondary">
              <div className="d-flex justify-content-between align-items-center px-2 py-1">
                <span className="text-secondary small">Search Results</span>
                <small className="text-secondary">{results.length} found</small>
              </div>
              {results.map((customer) => (
                <div
                  key={customer._id}
                  className="d-flex align-items-center gap-3 p-2 rounded-3 hover-bg"
                  onClick={() => {
                    setSelectedCustomer(customer);
                    setResults([]);
                    setSearch(customer.name);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" style={{ width: "36px", height: "36px" }}>
                    <i className="bi bi-person-fill text-primary"></i>
                  </div>
                  <div className="flex-grow-1">
                    <strong className="text-white">{customer.name}</strong>
                    <div className="text-secondary small">
                      <span className="me-3"><i className="bi bi-envelope me-1"></i>{customer.email}</span>
                      <span><i className="bi bi-person-vcard me-1"></i>{customer.aadhar || customer.aadhaar}</span>
                    </div>
                  </div>
                  <i className="bi bi-chevron-right text-secondary"></i>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ===== SELECTED CUSTOMER ===== */}
      {selectedCustomer && (
        <div className="card bg-dark border-secondary mb-4">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center gap-3">
                <div className="bg-success bg-opacity-10 rounded-3 p-3">
                  <i className="bi bi-person-check-fill fs-4 text-success"></i>
                </div>
                <div>
                  <h5 className="text-white mb-0">Selected Customer</h5>
                  <p className="text-secondary small mb-0">Confirm customer details before opening the account</p>
                </div>
              </div>
              <span className="badge bg-success">
                <i className="bi bi-check-circle-fill me-1"></i>
                Selected
              </span>
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-4">
                <div className="bg-dark bg-opacity-50 rounded-3 p-3 border border-secondary">
                  <span className="text-secondary small">Customer Name</span>
                  <strong className="text-white d-block">{selectedCustomer.name}</strong>
                </div>
              </div>
              <div className="col-md-4">
                <div className="bg-dark bg-opacity-50 rounded-3 p-3 border border-secondary">
                  <span className="text-secondary small">Email</span>
                  <strong className="text-white d-block">{selectedCustomer.email}</strong>
                </div>
              </div>
              <div className="col-md-4">
                <div className="bg-dark bg-opacity-50 rounded-3 p-3 border border-secondary">
                  <span className="text-secondary small">Aadhar</span>
                  <strong className="text-white d-block">{selectedCustomer.aadhar || selectedCustomer.aadhaar}</strong>
                </div>
              </div>
            </div>

            {/* Account Form */}
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label text-secondary small">Account Type</label>
                <select
                  className="form-select bg-dark text-white border-secondary"
                  value={accountType}
                  onChange={(e) => setAccountType(e.target.value)}
                >
                  <option value="Savings">Savings</option>
                  <option value="Current">Current</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label text-secondary small">Opening Balance</label>
                <div className="position-relative">
                  <span className="position-absolute text-secondary" style={{ left: "14px", top: "12px" }}>₹</span>
                  <input
                    type="number"
                    className="form-control bg-dark text-white border-secondary ps-5"
                    value={openingBalance}
                    onChange={(e) => setOpeningBalance(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <label className="form-label text-secondary small">
                  Account Password <span className="text-secondary">(Optional)</span>
                </label>
                <div className="d-flex gap-2">
                  <div className="position-relative flex-grow-1">
                    <i className="bi bi-lock position-absolute text-secondary" style={{ left: "14px", top: "12px" }}></i>
                    <input
                      type={showPasswordField ? "text" : "password"}
                      className="form-control bg-dark text-white border-secondary ps-5"
                      placeholder="Leave empty for no password"
                      value={accountPassword}
                      onChange={(e) => setAccountPassword(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPasswordField(!showPasswordField)}
                  >
                    <i className={showPasswordField ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-3 d-flex justify-content-end">
              <button
                className="btn btn-success d-flex align-items-center gap-2 px-4"
                onClick={handleOpenAccount}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status"></span>
                    Opening...
                  </>
                ) : (
                  <>
                    <i className="bi bi-wallet-fill"></i>
                    Open Account
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== ACCOUNTS LIST - NEWEST FIRST ===== */}
      <div className="card bg-dark border-secondary">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-dark table-hover align-middle mb-0">
              <thead>
                <tr className="border-secondary">
                  <th className="ps-4">#</th>
                  <th>Account Number</th>
                  <th>Customer</th>
                  <th>Type</th>
                  <th>Balance</th>
                  <th>Password</th>
                  <th className="text-center">Action</th> {/* ✅ NEW COLUMN */}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : currentAccounts.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5 text-secondary">
                      <i className="bi bi-wallet2 fs-1 d-block mb-3"></i>
                      <h5>No accounts found</h5>
                      <p className="small">Open an account for a customer</p>
                    </td>
                  </tr>
                ) : (
                  currentAccounts.map((acc, index) => (
                    <tr key={acc._id} className="border-secondary">
                      <td className="ps-4 text-secondary">{indexOfFirstItem + index + 1}</td>
                      <td>
                        <code className="bg-dark text-secondary px-2 py-1 rounded">
                          {acc.accountNumber}
                        </code>
                      </td>
                      <td>
                        <strong className="text-white">
                          {acc.customerId?.name || acc.customerName || "-"}
                        </strong>
                      </td>
                      <td>
                        <span className={`badge ${
                          acc.accountType === "Savings" 
                            ? "bg-success bg-opacity-10 text-success" 
                            : "bg-warning bg-opacity-10 text-warning"
                        }`}>
                          {acc.accountType}
                        </span>
                      </td>
                      <td>
                        <strong className="text-white">₹{acc.balance?.toLocaleString() || 0}</strong>
                      </td>
                      <td>
                        <span className={`badge ${acc.accountPassword ? "bg-warning bg-opacity-10 text-warning" : "bg-secondary bg-opacity-10 text-secondary"}`}>
                          {acc.accountPassword ? "🔒 Yes" : "No"}
                        </span>
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-danger btn-sm d-flex align-items-center gap-1 mx-auto"
                          onClick={() => handleDeleteAccount(acc._id, acc.accountNumber)}
                          disabled={loading}
                          title="Delete Account"
                        >
                          <i className="bi bi-trash3"></i>
                         
                        </button>
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
      {totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span className="text-secondary small">
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, branchAccounts.length)} of{" "}
            {branchAccounts.length} accounts
          </span>
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button className="page-link bg-dark border-secondary text-white" onClick={prevPage}>
                  Previous
                </button>
              </li>
              {[...Array(totalPages)].map((_, i) => (
                <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                  <button
                    className={`page-link ${currentPage === i + 1 ? "bg-primary border-primary text-white" : "bg-dark border-secondary text-white"}`}
                    onClick={() => paginate(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button className="page-link bg-dark border-secondary text-white" onClick={nextPage}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      <style>{`
        .table-dark { --bs-table-bg: transparent; }
        .table-dark td, .table-dark th { border-color: #2a2f3a; }
        .table-dark tbody tr:hover { background: rgba(255,255,255,0.02); }
        .form-control:focus { border-color: #0d6efd; box-shadow: 0 0 0 0.25rem rgba(13,110,253,0.25); }
        .form-control::placeholder { color: #6b8aa8; }
        .page-link.bg-dark:hover { background: #2a3f5a !important; }
        .page-item.active .page-link { background-color: #0d6efd; border-color: #0d6efd; }
        .hover-bg:hover { background: rgba(255,255,255,0.03); }
        .badge.bg-success.bg-opacity-10 { background: rgba(34,197,94,0.15) !important; color: #22c55e !important; }
        .badge.bg-warning.bg-opacity-10 { background: rgba(245,158,11,0.15) !important; color: #f59e0b !important; }
        .badge.bg-secondary.bg-opacity-10 { background: rgba(108,117,125,0.15) !important; color: #adb5bd !important; }
        .btn-danger.btn-sm {
          padding: 4px 10px;
          font-size: 12px;
        }
      `}</style>

    </div>
  );
} 