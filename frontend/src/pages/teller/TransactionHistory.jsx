import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHistory } from "../../feature/features/transactionSlice";
import "./TransactionHistory.css";

export default function TransactionHistory() {
  const [accountNumber, setAccountNumber] = useState("");
  const dispatch = useDispatch();

  const { history, loading, error } = useSelector((state) => state.transaction);

  const handleSearch = () => {
    if (!accountNumber.trim()) {
      alert("Enter account number");
      return;
    }

    dispatch(fetchHistory(accountNumber));
  };

  return (
    <div className="teller-history-page">
      {/* ================= HEADER ================= */}

      <div className="teller-history-header">
        <div>
          <span className="teller-history-eyebrow">
            <i className="bi bi-clock-history"></i>
            Teller Operations
          </span>

          <h1>Transaction History</h1>

          <p>Search and review transaction records for a customer account.</p>
        </div>

        <div className="teller-history-header-icon">
          <i className="bi bi-receipt"></i>
        </div>
      </div>

      {/* ================= SEARCH CARD ================= */}

      <div className="teller-history-card">
        <div className="teller-history-section-header">
          <div className="teller-history-title">
            <div className="teller-history-title-icon">
              <i className="bi bi-search"></i>
            </div>

            <div>
              <h3>Find Account History</h3>

              <p>Enter the customer's account number to view transactions.</p>
            </div>
          </div>
        </div>

        <div className="teller-history-search">
          <div className="teller-history-input">
            <i className="bi bi-credit-card"></i>

            <input
              type="text"
              placeholder="Enter Account Number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </div>

          <button className="teller-history-search-btn" onClick={handleSearch}>
            <i className="bi bi-search"></i>
            Search History
          </button>
        </div>
      </div>

      {/* ================= ERROR ================= */}

      {error && (
        <div className="teller-history-error">
          <div className="teller-history-error-icon">
            <i className="bi bi-exclamation-triangle-fill"></i>
          </div>

          <div>
            <strong>Unable to load history</strong>

            <span>{error}</span>
          </div>
        </div>
      )}

      {/* ================= TRANSACTION TABLE ================= */}

      <div className="teller-history-card teller-history-table-card">
        <div className="teller-history-table-header">
          <div className="teller-history-title">
            <div className="teller-history-title-icon teller-history-blue">
              <i className="bi bi-list-ul"></i>
            </div>

            <div>
              <h3>Transaction Records</h3>

              <p>
                Account: <strong>{accountNumber || "Not selected"}</strong>
              </p>
            </div>
          </div>

          <div className="teller-history-count">
            <span>Records</span>

            <strong>{history.length}</strong>
          </div>
        </div>

        {loading ? (
          <div className="teller-history-loading">
            <div className="spinner-border" role="status"></div>

            <span>Loading transaction history...</span>
          </div>
        ) : (
          <div className="teller-history-table-wrapper">
            <table className="teller-history-table">
              <thead>
                <tr>
                  <th>Transaction Type</th>
                  <th>Amount</th>
                  <th>Date & Time</th>
                </tr>
              </thead>

              <tbody>
                {history.length > 0 ? (
                  history.map((t) => (
                    <tr key={t._id}>
                      <td>
                        <div className="teller-history-type">
                          <div
                            className={`teller-history-type-icon ${
                              t.type === "Deposit"
                                ? "history-deposit"
                                : "history-withdraw"
                            }`}
                          >
                            <i
                              className={`bi ${
                                t.type === "Deposit"
                                  ? "bi-arrow-down-left"
                                  : "bi-arrow-up-right"
                              }`}
                            ></i>
                          </div>

                          <div>
                            <strong>{t.type}</strong>

                            <small>Account transaction</small>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span
                          className={`teller-history-amount ${
                            t.type === "Deposit"
                              ? "amount-positive"
                              : "amount-negative"
                          }`}
                        >
                          {t.type === "Deposit" ? "+" : "-"}₹{t.amount}
                        </span>
                      </td>

                      <td>
                        <div className="teller-history-date">
                          <i className="bi bi-calendar3"></i>

                          <span>{new Date(t.createdAt).toLocaleString()}</span>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="teller-history-empty">
                      <div className="teller-history-empty-icon">
                        <i className="bi bi-receipt"></i>
                      </div>

                      <strong>No transaction records</strong>

                      <span>
                        Search an account to view its transaction history.
                      </span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ================= PRINT ================= */}

      <div className="teller-history-footer">
        <div className="teller-history-security">
          <i className="bi bi-shield-check"></i>

          <span>Transaction records are securely maintained.</span>
        </div>

        <button
          className="teller-history-print-btn"
          onClick={() => window.print()}
        >
          <i className="bi bi-printer"></i>
          Print / Save PDF
        </button>
      </div>
    </div>
  );
}
