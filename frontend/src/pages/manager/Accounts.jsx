import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Accounts.css";

export default function Accounts() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [accountType, setAccountType] = useState("Savings");
  const [openingBalance, setOpeningBalance] = useState(1000);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔍 Auto Search
  useEffect(() => {
    if (search.trim().length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // 🔍 Search Customer
  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5003/cbs/customer/search?search=${search}`,
        { withCredentials: true },
      );

      setResults(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // 📋 Fetch Accounts
  const fetchAccounts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5003/cbs/customer/accounts",
        { withCredentials: true },
      );

      setAccounts(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  // 💳 Open Account
  const handleOpenAccount = async () => {
    if (!selectedCustomer) return alert("Please select customer");

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5003/cbs/customer/openaccount",
        {
          customerId: selectedCustomer._id,
          accountType,
          openingBalance: Number(openingBalance),
        },
        { withCredentials: true },
      );

      alert(
        `Account Created Successfully!\nAccount No: ${res.data.data.accountNumber}`,
      );

      // reset
      setSelectedCustomer(null);
      setSearch("");
      setResults([]);
      setOpeningBalance(1000);

      // refresh accounts list
      fetchAccounts();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to open account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="manager-accounts-page">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="accounts-page-header">
        <div>
          <span className="accounts-eyebrow">
            <i className="bi bi-wallet2"></i>
            Account Management
          </span>

          <h1>Accounts</h1>

          <p>Search customers, open accounts and manage branch accounts.</p>
        </div>

        <div className="accounts-count-card">
          <div className="accounts-count-icon">
            <i className="bi bi-bank2"></i>
          </div>

          <div>
            <span>Branch Accounts</span>

            <strong>{accounts.length}</strong>
          </div>
        </div>
      </div>

      {/* =====================================================
          SEARCH CUSTOMER
      ===================================================== */}

      <div className="accounts-panel">
        <div className="accounts-panel-header">
          <div className="accounts-section-title">
            <div className="accounts-section-icon accounts-icon-blue">
              <i className="bi bi-search"></i>
            </div>

            <div>
              <h3>Search Customer</h3>

              <p>Find a customer by name, email or Aadhar number.</p>
            </div>
          </div>
        </div>

        <div className="accounts-search-area">
          <div className="accounts-search-wrapper">
            <i className="bi bi-search"></i>

            <input
              type="text"
              className="accounts-search-input"
              placeholder="Search by Name, Email or Aadhar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button
                type="button"
                className="accounts-search-clear"
                onClick={() => {
                  setSearch("");
                  setResults([]);
                }}
              >
                <i className="bi bi-x"></i>
              </button>
            )}
          </div>

          {/* Search Results */}

          {results.length > 0 && (
            <div className="accounts-search-results">
              <div className="accounts-results-header">
                <span>Search Results</span>

                <small>{results.length} found</small>
              </div>

              {results.map((customer) => (
                <div
                  key={customer._id}
                  className="accounts-result-item"
                  onClick={() => {
                    setSelectedCustomer(customer);
                    setResults([]);
                    setSearch(customer.name);
                  }}
                >
                  <div className="accounts-result-avatar">
                    <i className="bi bi-person-fill"></i>
                  </div>

                  <div className="accounts-result-info">
                    <strong>{customer.name}</strong>

                    <div>
                      <span>
                        <i className="bi bi-envelope"></i>
                        {customer.email}
                      </span>

                      <span>
                        <i className="bi bi-person-vcard"></i>
                        {customer.aadhar}
                      </span>
                    </div>
                  </div>

                  <i className="bi bi-chevron-right accounts-result-arrow"></i>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          SELECTED CUSTOMER
      ===================================================== */}

      {selectedCustomer && (
        <div className="accounts-panel selected-customer-panel">
          <div className="accounts-panel-header">
            <div className="accounts-section-title">
              <div className="accounts-section-icon accounts-icon-green">
                <i className="bi bi-person-check-fill"></i>
              </div>

              <div>
                <h3>Selected Customer</h3>

                <p>Confirm customer details before opening the account.</p>
              </div>
            </div>

            <span className="selected-status">
              <i className="bi bi-check-circle-fill"></i>
              Selected
            </span>
          </div>

          {/* Customer Information */}

          <div className="selected-customer-info">
            <div className="selected-customer-profile">
              <div className="selected-customer-avatar">
                <i className="bi bi-person-fill"></i>
              </div>

              <div>
                <h4>{selectedCustomer.name}</h4>

                <span>Customer</span>
              </div>
            </div>

            <div className="selected-customer-details">
              <div className="customer-detail-item">
                <span>
                  <i className="bi bi-envelope"></i>
                  Email
                </span>

                <strong>{selectedCustomer.email}</strong>
              </div>

              <div className="customer-detail-item">
                <span>
                  <i className="bi bi-person-vcard"></i>
                  Aadhar
                </span>

                <strong>{selectedCustomer.aadhar}</strong>
              </div>

              <div className="customer-detail-item">
                <span>
                  <i className="bi bi-building"></i>
                  Branch
                </span>

                <strong>{selectedCustomer.branchname}</strong>
              </div>
            </div>
          </div>

          {/* Account Form */}

          <div className="open-account-form">
            <div className="account-form-group">
              <label>Account Type</label>

              <div className="account-input-wrapper">
                <i className="bi bi-wallet2"></i>

                <select
                  className="account-form-input"
                  value={accountType}
                  onChange={(e) => setAccountType(e.target.value)}
                >
                  <option value="Savings">Savings</option>

                  <option value="Current">Current</option>
                </select>
              </div>
            </div>

            <div className="account-form-group">
              <label>Opening Balance</label>

              <div className="account-input-wrapper">
                <i className="bi bi-currency-rupee"></i>

                <input
                  type="number"
                  className="account-form-input"
                  value={openingBalance}
                  onChange={(e) => setOpeningBalance(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Open Account Button */}

          <div className="open-account-footer">
            <div className="account-security-note">
              <i className="bi bi-shield-check"></i>

              <span>Account creation is securely processed.</span>
            </div>

            <button
              className="open-account-btn"
              onClick={handleOpenAccount}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                  ></span>
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
      )}

      {/* =====================================================
          ACCOUNTS LIST
      ===================================================== */}

      <div className="accounts-panel accounts-list-panel">
        <div className="accounts-panel-header">
          <div className="accounts-section-title">
            <div className="accounts-section-icon accounts-icon-purple">
              <i className="bi bi-list-ul"></i>
            </div>

            <div>
              <h3>Branch Accounts</h3>

              <p>View all accounts registered under this branch.</p>
            </div>
          </div>

          <div className="accounts-total-badge">
            <span>Total</span>

            <strong>{accounts.length}</strong>
          </div>
        </div>

        <div className="accounts-table-wrapper">
          <table className="accounts-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Account Number</th>
                <th>Type</th>
                <th>Balance</th>
              </tr>
            </thead>

            <tbody>
              {accounts.length === 0 ? (
                <tr>
                  <td colSpan="4" className="accounts-empty">
                    <div className="accounts-empty-icon">
                      <i className="bi bi-wallet2"></i>
                    </div>

                    <strong>No accounts found</strong>

                    <span>
                      Accounts created for this branch will appear here.
                    </span>
                  </td>
                </tr>
              ) : (
                accounts.map((acc) => (
                  <tr key={acc._id}>
                    {/* Customer */}

                    <td>
                      <div className="account-customer-cell">
                        <div className="account-customer-avatar">
                          <i className="bi bi-person-fill"></i>
                        </div>

                        <div>
                          <strong>{acc.customerId?.name || "-"}</strong>

                          <small>Account Holder</small>
                        </div>
                      </div>
                    </td>

                    {/* Account Number */}

                    <td>
                      <div className="account-number-cell">
                        <i className="bi bi-credit-card-2-front"></i>

                        <code>{acc.accountNumber}</code>
                      </div>
                    </td>

                    {/* Account Type */}

                    <td>
                      <span
                        className={`account-type-badge ${
                          acc.accountType === "Savings"
                            ? "account-type-savings"
                            : "account-type-current"
                        }`}
                      >
                        <i
                          className={
                            acc.accountType === "Savings"
                              ? "bi bi-piggy-bank"
                              : "bi bi-building"
                          }
                        ></i>

                        {acc.accountType}
                      </span>
                    </td>

                    {/* Balance */}

                    <td>
                      <strong className="account-balance">
                        ₹{acc.balance.toLocaleString()}
                      </strong>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
