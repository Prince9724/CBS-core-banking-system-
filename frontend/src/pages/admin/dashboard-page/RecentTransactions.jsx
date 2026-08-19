import React from "react";
import { Link } from "react-router-dom";

export default function RecentTransactions({ transactions = [] }) {
  // ✅ Limit to 5 recent transactions
  const recentTxns = transactions.slice(0, 5);

  // ✅ Format time
  const formatTime = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ✅ Get status badge
  const getStatusBadge = (status) => {
    const statusMap = {
      success: "success",
      completed: "success",
      pending: "warning",
      failed: "danger",
    };
    const color = statusMap[status?.toLowerCase()] || "secondary";
    return (
      <span className={`badge bg-${color}-subtle text-${color} rounded-pill px-3 py-2`}>
        {status || "Completed"}
      </span>
    );
  };

  // ✅ Get type badge
  const getTypeBadge = (type) => {
    if (type === "Deposit" || type === "Credit") {
      return (
        <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-2">
          <i className="bi bi-arrow-down-left me-1"></i>
          Deposit
        </span>
      );
    }
    if (type === "Withdraw" || type === "Debit") {
      return (
        <span className="badge bg-danger bg-opacity-10 text-danger rounded-pill px-3 py-2">
          <i className="bi bi-arrow-up-right me-1"></i>
          Withdraw
        </span>
      );
    }
    return (
      <span className="badge bg-info bg-opacity-10 text-info rounded-pill px-3 py-2">
        <i className="bi bi-arrow-left-right me-1"></i>
        {type || "N/A"}
      </span>
    );
  };

  // ✅ Empty state
  if (recentTxns.length === 0) {
    return (
      <div className="card bg-dark border-secondary h-100">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="fw-bold mb-0 text-white">
              <i className="bi bi-clock-history me-2 text-primary"></i>
              Recent Transactions
            </h5>
            <Link to="/admin/transactions" className="btn btn-outline-primary btn-sm px-3">
              View All
            </Link>
          </div>
          <div className="text-center py-5">
            <i className="bi bi-inbox fs-1 text-secondary d-block mb-3"></i>
            <p className="text-secondary">No recent transactions</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-dark border-secondary h-100">
      <div className="card-body">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold mb-0 text-white">
            <i className="bi bi-clock-history me-2 text-primary"></i>
            Recent Transactions
          </h5>
          <Link to="/admin/transactions" className="btn btn-outline-primary btn-sm px-3">
            View All
            <i className="bi bi-chevron-right ms-1"></i>
          </Link>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle">
            <thead>
              <tr className="border-secondary">
                <th className="text-secondary small fw-semibold">Txn ID</th>
                <th className="text-secondary small fw-semibold">Account No.</th>
                <th className="text-secondary small fw-semibold">Type</th>
                <th className="text-secondary small fw-semibold">Amount</th>
                <th className="text-secondary small fw-semibold">Branch</th>
                <th className="text-secondary small fw-semibold">Time</th>
                <th className="text-secondary small fw-semibold">Status</th>
              </tr>
            </thead>

            <tbody>
              {recentTxns.map((txn, index) => (
                <tr key={txn._id || index} className="border-secondary">
                  <td>
                    <code className="bg-dark text-secondary px-2 py-1 rounded small">
                      {txn.transactionId || txn._id?.slice(-8) || "N/A"}
                    </code>
                  </td>
                  <td className="text-white">{txn.accountNumber || "N/A"}</td>
                  <td>{getTypeBadge(txn.type)}</td>
                  <td className={txn.type === "Deposit" ? "text-success fw-semibold" : "text-danger fw-semibold"}>
                    {txn.type === "Deposit" ? "+" : "-"}₹{txn.amount?.toLocaleString() || 0}
                  </td>
                  <td>
                    <span className="badge bg-secondary bg-opacity-25 text-secondary">
                      {txn.branchname || txn.branchcode || "N/A"}
                    </span>
                  </td>
                  <td className="text-secondary">
                    <i className="bi bi-clock me-1"></i>
                    {formatTime(txn.createdAt)}
                  </td>
                  <td>{getStatusBadge(txn.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ✅ Footer - Total Count */}
        {transactions.length > 5 && (
          <div className="text-center mt-3">
            <span className="text-secondary small">
              Showing 5 of {transactions.length} transactions
            </span>
          </div>
        )}
      </div>
    </div>
  );
}