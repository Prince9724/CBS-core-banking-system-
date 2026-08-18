import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchHistory } from "../../feature/features/transactionSlice";

export default function TransactionHistory() {
  const { branchcode } = useParams();
  const [accountNumber, setAccountNumber] = useState("");
  const dispatch = useDispatch();

  const { history, loading, error } = useSelector((state) => state.transaction);

  const handleSearch = () => {
    if (!accountNumber.trim()) {
      alert("Please enter account number");
      return;
    }
    dispatch(fetchHistory(accountNumber));
  };

  return (
    <div className="container-fluid px-4 py-4 bg-dark min-vh-100">

      {/* ===== BACK BUTTON + HEADER ===== */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <Link
          to={`/teller/${branchcode}`}
          className="btn btn-outline-light d-flex align-items-center gap-2"
        >
          <i className="bi bi-arrow-left"></i>
          Back to Dashboard
        </Link>
        <div className="vr text-secondary"></div>
        <div>
          <span className="badge bg-info bg-opacity-10 text-info mb-1">
            <i className="bi bi-clock-history me-1"></i>
            Teller Operations
          </span>
          <h1 className="text-white fw-bold mb-0">Transaction History</h1>
        </div>
      </div>

      {/* ===== BRANCH INFO ===== */}
      <div className="d-flex justify-content-end mb-4">
        <div className="d-flex align-items-center gap-2 bg-dark bg-opacity-50 border border-secondary px-3 py-2 rounded-3">
          <i className="bi bi-bank text-info"></i>
          <div>
            <small className="text-secondary d-block lh-1">Branch</small>
            <strong className="text-white">{branchcode}</strong>
          </div>
        </div>
      </div>

      {/* ===== SEARCH CARD ===== */}
      <div className="card bg-dark border-secondary mb-4">
        <div className="card-body">
          <div className="d-flex align-items-center gap-3 mb-3">
            <div className="bg-primary bg-opacity-10 rounded-3 p-3">
              <i className="bi bi-search fs-4 text-primary"></i>
            </div>
            <div>
              <h5 className="text-white mb-0">Find Account History</h5>
              <p className="text-secondary mb-0 small">Enter the customer's account number to view transactions</p>
            </div>
          </div>

          <div className="d-flex gap-3 flex-wrap">
            <div className="flex-grow-1 position-relative">
              <i className="bi bi-credit-card position-absolute text-secondary" style={{ left: "14px", top: "12px" }}></i>
              <input
                type="text"
                className="form-control bg-dark text-white border-secondary ps-5"
                placeholder="Enter Account Number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <button
              className="btn btn-info d-flex align-items-center gap-2"
              onClick={handleSearch}
            >
              <i className="bi bi-search"></i>
              Search History
            </button>
          </div>
        </div>
      </div>

      {/* ===== ERROR ===== */}
      {error && (
        <div className="card bg-danger bg-opacity-10 border-danger mb-4">
          <div className="card-body d-flex align-items-center gap-3">
            <i className="bi bi-exclamation-triangle-fill text-danger fs-4"></i>
            <div>
              <strong className="text-danger">Unable to load history</strong>
              <p className="text-danger mb-0 small">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* ===== TRANSACTION TABLE ===== */}
      <div className="card bg-dark border-secondary">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-info bg-opacity-10 rounded-3 p-3">
                <i className="bi bi-list-ul fs-4 text-info"></i>
              </div>
              <div>
                <h5 className="text-white mb-0">Transaction Records</h5>
                <p className="text-secondary mb-0 small">
                  Account: <strong className="text-white">{accountNumber || "Not selected"}</strong>
                </p>
              </div>
            </div>
            <div className="bg-dark bg-opacity-50 rounded-3 px-3 py-2 border border-secondary text-center">
              <span className="text-secondary small d-block">Records</span>
              <strong className="text-white fs-5">{history.length}</strong>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="text-secondary mt-2">Loading transaction history...</p>
            </div>
          ) : history.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-dark table-hover">
                <thead>
                  <tr className="border-secondary">
                    <th>Transaction Type</th>
                    <th>Amount</th>
                    <th>Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((t) => (
                    <tr key={t._id} className="border-secondary">
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div className={`rounded-3 p-2 ${t.type === "Deposit" ? "bg-success bg-opacity-10" : "bg-danger bg-opacity-10"}`}>
                            <i className={`bi ${t.type === "Deposit" ? "bi-arrow-down-left text-success" : "bi-arrow-up-right text-danger"} fs-5`}></i>
                          </div>
                          <div>
                            <strong className="text-white">{t.type}</strong>
                            <small className="text-secondary d-block">Account transaction</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`fs-5 fw-bold ${t.type === "Deposit" ? "text-success" : "text-danger"}`}>
                          {t.type === "Deposit" ? "+" : "-"}₹{t.amount}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2 text-secondary">
                          <i className="bi bi-calendar3"></i>
                          <span>{new Date(t.createdAt).toLocaleString()}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-5">
              <i className="bi bi-receipt fs-1 text-secondary d-block mb-3"></i>
              <h5 className="text-secondary">No transaction records</h5>
              <p className="text-secondary small">Search an account to view its transaction history</p>
            </div>
          )}
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-3">
        <div className="d-flex align-items-center gap-2 text-secondary small">
          <i className="bi bi-shield-check text-success"></i>
          <span>Transaction records are securely maintained.</span>
        </div>
        <button
          className="btn btn-outline-light d-flex align-items-center gap-2"
          onClick={() => window.print()}
        >
          <i className="bi bi-printer"></i>
          Print / Save PDF
        </button>
      </div>

      {/* ===== CUSTOM CSS ===== */}
      <style>{`
        .form-control:focus {
          border-color: #0dcaf0;
          box-shadow: 0 0 0 0.25rem rgba(13, 202, 240, 0.25);
        }
        .bg-dark.bg-opacity-50 {
          background-color: rgba(33, 37, 41, 0.5);
        }
        .table-dark {
          --bs-table-bg: transparent;
        }
        .table-dark td, .table-dark th {
          border-color: #2a2f3a;
        }
        .table-dark tbody tr:hover {
          background-color: rgba(255, 255, 255, 0.03);
        }
        @media print {
          .btn, .form-control, .btn-outline-light {
            display: none !important;
          }
          .card {
            border: 1px solid #ddd !important;
          }
          .text-white {
            color: #000 !important;
          }
          .bg-dark {
            background: #fff !important;
          }
          .table-dark {
            background: #fff !important;
          }
          .table-dark td, .table-dark th {
            color: #000 !important;
          }
        }
      `}</style>

    </div>
  );
}