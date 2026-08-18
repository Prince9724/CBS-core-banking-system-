import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function TransactionDetail() {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const api = axios.create({
    baseURL: "http://localhost:5003",
    withCredentials: true,
  });

  useEffect(() => {
    fetchTransactionDetail();
  }, [id]);

  const fetchTransactionDetail = async () => {
    try {
      setLoading(true);
      // ✅ Fetch single transaction
      const res = await api.get(`/cbs/customer/transaction/${id}`);
      setTransaction(res.data.data || res.data);
      console.log("📊 Transaction Detail:", res.data);
    } catch (err) {
      console.error("❌ Error fetching transaction:", err);
      setError(err.response?.data?.message || "Transaction not found");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-secondary mt-2">Loading transaction details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="card bg-dark border-danger">
          <div className="card-body text-center py-5">
            <i className="bi bi-exclamation-triangle-fill text-danger fs-1"></i>
            <h4 className="text-danger mt-3">Unable to load transaction</h4>
            <p className="text-secondary">{error}</p>
            <Link to="/admin/transactions" className="btn btn-primary">
              <i className="bi bi-arrow-left"></i> Back to Transactions
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="container py-5">
        <div className="card bg-dark border-secondary">
          <div className="card-body text-center py-5">
            <i className="bi bi-inbox fs-1 text-secondary"></i>
            <h4 className="text-white mt-3">Transaction not found</h4>
            <Link to="/admin/transactions" className="btn btn-primary mt-3">
              <i className="bi bi-arrow-left"></i> Back to Transactions
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-4 py-4 bg-dark min-vh-100">

      {/* ===== BACK BUTTON ===== */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <Link to="/admin/transaction" className="btn btn-outline-light d-flex align-items-center gap-2">
          <i className="bi bi-arrow-left"></i>
          Back to Transactions
        </Link>
        <div className="vr text-secondary"></div>
        <div>
          <span className="badge bg-info bg-opacity-10 text-info mb-1">
            <i className="bi bi-receipt me-1"></i>
            Transaction Details
          </span>
          <h1 className="text-white fw-bold mb-0">
            {transaction.transactionId || transaction._id?.slice(-8)}
          </h1>
        </div>
      </div>

      {/* ===== TRANSACTION DETAILS ===== */}
      <div className="row g-4">
        {/* Left - Main Info */}
        <div className="col-md-8">
          <div className="card bg-dark border-secondary">
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="bg-dark bg-opacity-50 rounded-3 p-3 border border-secondary">
                    <span className="text-secondary small d-block">
                      <i className="bi bi-credit-card me-1"></i>
                      Account Number
                    </span>
                    <strong className="text-white">{transaction.accountNumber}</strong>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="bg-dark bg-opacity-50 rounded-3 p-3 border border-secondary">
                    <span className="text-secondary small d-block">
                      <i className="bi bi-person me-1"></i>
                      Customer Name
                    </span>
                    <strong className="text-white">{transaction.customerName}</strong>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="bg-dark bg-opacity-50 rounded-3 p-3 border border-secondary">
                    <span className="text-secondary small d-block">
                      <i className="bi bi-tag me-1"></i>
                      Transaction Type
                    </span>
                    <span className={`badge ${transaction.type === "Deposit" ? "bg-success" : "bg-danger"} fs-6`}>
                      {transaction.type}
                    </span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="bg-dark bg-opacity-50 rounded-3 p-3 border border-secondary">
                    <span className="text-secondary small d-block">
                      <i className="bi bi-currency-rupee me-1"></i>
                      Amount
                    </span>
                    <strong className={`fs-4 ${transaction.type === "Deposit" ? "text-success" : "text-danger"}`}>
                      {transaction.type === "Deposit" ? "+" : "-"}₹{transaction.amount?.toLocaleString()}
                    </strong>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="bg-dark bg-opacity-50 rounded-3 p-3 border border-secondary">
                    <span className="text-secondary small d-block">
                      <i className="bi bi-wallet2 me-1"></i>
                      Balance After
                    </span>
                    <strong className="text-white">₹{transaction.balanceAfter?.toLocaleString() || "N/A"}</strong>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="bg-dark bg-opacity-50 rounded-3 p-3 border border-secondary">
                    <span className="text-secondary small d-block">
                      <i className="bi bi-building me-1"></i>
                      Branch
                    </span>
                    <strong className="text-white">{transaction.branchcode || "N/A"}</strong>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="bg-dark bg-opacity-50 rounded-3 p-3 border border-secondary">
                    <span className="text-secondary small d-block">
                      <i className="bi bi-person-badge me-1"></i>
                      Performed By
                    </span>
                    <strong className="text-white">{transaction.performedBy || "N/A"}</strong>
                    <small className="text-secondary d-block">{transaction.performedByRole || ""}</small>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="bg-dark bg-opacity-50 rounded-3 p-3 border border-secondary">
                    <span className="text-secondary small d-block">
                      <i className="bi bi-calendar3 me-1"></i>
                      Date & Time
                    </span>
                    <strong className="text-white">
                      {new Date(transaction.createdAt).toLocaleString()}
                    </strong>
                  </div>
                </div>
                <div className="col-12">
                  <div className="bg-dark bg-opacity-50 rounded-3 p-3 border border-secondary">
                    <span className="text-secondary small d-block">
                      <i className="bi bi-info-circle me-1"></i>
                      Description / Remarks
                    </span>
                    <strong className="text-white">{transaction.description || "N/A"}</strong>
                  </div>
                </div>
                <div className="col-12">
                  <div className="bg-dark bg-opacity-50 rounded-3 p-3 border border-secondary">
                    <span className="text-secondary small d-block">
                      <i className="bi bi-check-circle me-1"></i>
                      Status
                    </span>
                    <span className={`badge ${transaction.status === "success" || transaction.status === "completed" ? "bg-success" : "bg-warning"} fs-6`}>
                      {transaction.status || "Completed"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Quick Actions */}
        <div className="col-md-4">
          <div className="card bg-dark border-secondary">
            <div className="card-body">
              <h6 className="text-secondary mb-3">
                <i className="bi bi-lightning me-2 text-warning"></i>
                Quick Actions
              </h6>
              <div className="d-flex flex-column gap-2">
                <button className="btn btn-outline-primary w-100" onClick={() => window.print()}>
                  <i className="bi bi-printer me-2"></i>
                  Print Receipt
                </button>
                <button className="btn btn-outline-success w-100">
                  <i className="bi bi-share me-2"></i>
                  Share Transaction
                </button>
                <Link to="/admin/transaction" className="btn btn-outline-secondary w-100">
                  <i className="bi bi-list me-2"></i>
                  View All Transactions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}