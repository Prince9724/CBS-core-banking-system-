import React, { useEffect, useState } from "react";
import axios from "axios";

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
        { withCredentials: true }
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
        { withCredentials: true }
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
        { withCredentials: true }
      );

      alert(`Account Created Successfully!\\nAccount No: ${res.data.data.accountNumber}`);

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
    <div className="container py-4 text-dark">
      <h2 className="mb-4">🏦 Account Management</h2>

      {/* Search Box */}
      <div className="card  p-4 mb-4">
        <h5 className="mb-3">Search Customer</h5>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search by Name, Email or Aadhar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {results.length > 0 && (
          <div className="border rounded p-2 bg-secondary-subtle">
            {results.map((customer) => (
              <div
                key={customer._id}
                className="border-bottom p-2 cursor-pointer text-dark"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSelectedCustomer(customer);
                  setResults([]);
                  setSearch(customer.name);
                }}
              >
                <strong>{customer.name}</strong>
                <br />
                📧 {customer.email} | 🆔 {customer.aadhar}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selected Customer */}
      {selectedCustomer && (
        <div className="card p-4 mb-4">
          <h5 className="mb-3">Selected Customer</h5>

          <div className="row">
            <div className="col-md-6">
              <p><b>Name:</b> {selectedCustomer.name}</p>
              <p><b>Email:</b> {selectedCustomer.email}</p>
            </div>

            <div className="col-md-6">
              <p><b>Aadhar:</b> {selectedCustomer.aadhar}</p>
              <p><b>Branch:</b> {selectedCustomer.branchname}</p>
            </div>
          </div>

          <div className="row g-3 mt-2">
            <div className="col-md-6">
              <label className="form-label">Account Type</label>
              <select
                className="form-select"
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
              >
                <option value="Savings">Savings</option>
                <option value="Current">Current</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Opening Balance</label>
              <input
                type="number"
                className="form-control"
                value={openingBalance}
                onChange={(e) => setOpeningBalance(e.target.value)}
              />
            </div>
          </div>

          <button
            className="btn btn-success mt-4"
            onClick={handleOpenAccount}
            disabled={loading}
          >
            {loading ? "Opening..." : "💳 Open Account"}
          </button>
        </div>
      )}

      {/* Accounts List */}
      <div className="card  p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">📋 Branch Accounts</h5>
          <span className="badge bg-primary">{accounts.length} Accounts</span>
        </div>

        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle">
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
                  <td colSpan="4" className="text-center text-secondary py-4">
                    No accounts found
                  </td>
                </tr>
              ) : (
                accounts.map((acc) => (
                  <tr key={acc._id}>
                    <td>{acc.customerId?.name || "-"}</td>
                    <td><code>{acc.accountNumber}</code></td>
                    <td>
                      <span
                        className={`badge ${
                          acc.accountType === "Savings"
                            ? "bg-success"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {acc.accountType}
                      </span>
                    </td>
                    <td>₹{acc.balance.toLocaleString()}</td>
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