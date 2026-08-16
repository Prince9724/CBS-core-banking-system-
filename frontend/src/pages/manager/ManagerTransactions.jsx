import { useEffect, useState } from "react";
import axios from "axios";

import "./ManagerTransactions.css";

export default function ManagerTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5003/cbs/customer/today-transactions",
        { withCredentials: true },
      );

      setTransactions(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const filtered = transactions.filter(
    (t) =>
      t.accountNumber?.toLowerCase().includes(search.toLowerCase()) ||
      t.customerName?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="manager-transactions-page">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="transactions-page-header">
        <div>
          <span className="transactions-eyebrow">
            <i className="bi bi-arrow-left-right"></i>
            Branch Activity
          </span>

          <h1>Today Transactions</h1>

          <p>Monitor all transactions performed by your branch today.</p>
        </div>

        <div className="transactions-header-actions">
          <div className="transactions-count-card">
            <div className="transactions-count-icon">
              <i className="bi bi-receipt"></i>
            </div>

            <div>
              <span>Total Today</span>

              <strong>{transactions.length}</strong>
            </div>
          </div>

          <button
            className="transactions-refresh-btn"
            onClick={fetchTransactions}
          >
            <i className="bi bi-arrow-clockwise"></i>
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* =====================================================
          SEARCH
      ===================================================== */}

      <div className="transactions-search-panel">
        <div className="transactions-search-title">
          <div className="transactions-search-icon">
            <i className="bi bi-search"></i>
          </div>

          <div>
            <h3>Find Transaction</h3>

            <p>Search by account number or customer name.</p>
          </div>
        </div>

        <div className="transactions-search-wrapper">
          <i className="bi bi-search"></i>

          <input
            type="text"
            className="transactions-search-input"
            placeholder="Search by account number or customer name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <button
              type="button"
              className="transactions-clear-btn"
              onClick={() => setSearch("")}
            >
              <i className="bi bi-x"></i>
            </button>
          )}
        </div>
      </div>

      {/* =====================================================
          TRANSACTION SUMMARY
      ===================================================== */}

      <div className="transactions-summary-grid">
        <div className="transactions-summary-card">
          <div className="transactions-summary-icon transactions-summary-blue">
            <i className="bi bi-list-check"></i>
          </div>

          <div>
            <span>All Transactions</span>

            <strong>{transactions.length}</strong>
          </div>
        </div>

        <div className="transactions-summary-card">
          <div className="transactions-summary-icon transactions-summary-green">
            <i className="bi bi-arrow-down-left"></i>
          </div>

          <div>
            <span>Deposits</span>

            <strong>
              {transactions.filter((t) => t.type === "Deposit").length}
            </strong>
          </div>
        </div>

        <div className="transactions-summary-card">
          <div className="transactions-summary-icon transactions-summary-orange">
            <i className="bi bi-arrow-up-right"></i>
          </div>

          <div>
            <span>Withdrawals</span>

            <strong>
              {transactions.filter((t) => t.type !== "Deposit").length}
            </strong>
          </div>
        </div>

        <div className="transactions-summary-card">
          <div className="transactions-summary-icon transactions-summary-purple">
            <i className="bi bi-funnel"></i>
          </div>

          <div>
            <span>Showing</span>

            <strong>{filtered.length}</strong>
          </div>
        </div>
      </div>

      {/* =====================================================
          TRANSACTION TABLE
      ===================================================== */}

      <div className="transactions-table-panel">
        <div className="transactions-panel-header">
          <div className="transactions-panel-title">
            <div className="transactions-panel-icon">
              <i className="bi bi-clock-history"></i>
            </div>

            <div>
              <h3>Transaction History</h3>

              <p>Latest branch transaction activity.</p>
            </div>
          </div>

          <div className="transactions-result-count">
            <span>Showing</span>

            <strong>{filtered.length}</strong>
          </div>
        </div>

        <div className="transactions-table-wrapper">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Account</th>
                <th>Customer</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Time</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="5" className="transactions-empty">
                    <div className="transactions-empty-icon">
                      <i className="bi bi-receipt"></i>
                    </div>

                    <strong>No transactions found</strong>

                    <span>
                      {search
                        ? "Try searching with another account number or customer name."
                        : "There are no transactions recorded for today."}
                    </span>
                  </td>
                </tr>
              ) : (
                filtered.map((t) => (
                  <tr key={t._id}>
                    {/* Account */}

                    <td>
                      <div className="transaction-account-cell">
                        <div className="transaction-account-icon">
                          <i className="bi bi-credit-card-2-front"></i>
                        </div>

                        <code>{t.accountNumber}</code>
                      </div>
                    </td>

                    {/* Customer */}

                    <td>
                      <div className="transaction-customer-cell">
                        <div className="transaction-customer-avatar">
                          <i className="bi bi-person-fill"></i>
                        </div>

                        <strong>{t.customerName}</strong>
                      </div>
                    </td>

                    {/* Type */}

                    <td>
                      <span
                        className={`transaction-type-badge ${
                          t.type === "Deposit"
                            ? "transaction-deposit"
                            : "transaction-withdraw"
                        }`}
                      >
                        <i
                          className={
                            t.type === "Deposit"
                              ? "bi bi-arrow-down-left"
                              : "bi bi-arrow-up-right"
                          }
                        ></i>

                        {t.type}
                      </span>
                    </td>

                    {/* Amount */}

                    <td>
                      <strong
                        className={`transaction-amount ${
                          t.type === "Deposit"
                            ? "transaction-amount-positive"
                            : "transaction-amount-negative"
                        }`}
                      >
                        {t.type === "Deposit" ? "+" : "-"}₹{t.amount}
                      </strong>
                    </td>

                    {/* Time */}

                    <td>
                      <div className="transaction-time-cell">
                        <i className="bi bi-clock"></i>

                        <span>
                          {new Date(t.createdAt).toLocaleTimeString()}
                        </span>
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
  );
}
