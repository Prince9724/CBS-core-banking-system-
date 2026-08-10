import React from "react";
import {
  BsArrowDownCircle,
  BsArrowUpCircle,
  BsArrowLeftRight,
  BsDownload,
  BsSearch,
  BsCalendar3,
  BsEye,
  BsThreeDotsVertical,
  BsPlus,
} from "react-icons/bs";
import "./transactions.css";

export default function Transactions() {
  const transactions = [
    {
      id: "TXN10000001",
      date: "31 Jul 2024, 10:30 AM",
      account: "SA123456789",
      holder: "Rahul Patel",
      type: "Credit",
      amount: "₹25,000.00",
      status: "Completed",
      channel: "NEFT",
      remarks: "Salary Credit",
    },
    {
      id: "TXN10000002",
      date: "31 Jul 2024, 09:15 AM",
      account: "CA987654321",
      holder: "Neha Sharma",
      type: "Debit",
      amount: "₹12,500.00",
      status: "Completed",
      channel: "IMPS",
      remarks: "Online Transfer",
    },
    {
      id: "TXN10000003",
      date: "30 Jul 2024, 06:45 PM",
      account: "SA456789123",
      holder: "Amit Singh",
      type: "Credit",
      amount: "₹50,000.00",
      status: "Completed",
      channel: "NEFT",
      remarks: "Fixed Deposit",
    },
    {
      id: "TXN10000004",
      date: "30 Jul 2024, 04:20 PM",
      account: "CA321654987",
      holder: "Priya Mehta",
      type: "Debit",
      amount: "₹15,000.00",
      status: "Completed",
      channel: "UPI",
      remarks: "Bill Payment",
    },
    {
      id: "TXN10000005",
      date: "30 Jul 2024, 11:30 AM",
      account: "FD789123456",
      holder: "Vikram Joshi",
      type: "Credit",
      amount: "₹1,00,000.00",
      status: "Completed",
      channel: "NEFT",
      remarks: "FD Maturity",
    },
    {
      id: "TXN10000006",
      date: "29 Jul 2024, 03:10 PM",
      account: "SA159357753",
      holder: "Kavya Reddy",
      type: "Debit",
      amount: "₹8,750.00",
      status: "Pending",
      channel: "IMPS",
      remarks: "Online Transfer",
    },
    {
      id: "TXN10000007",
      date: "29 Jul 2024, 10:05 AM",
      account: "LA753159357",
      holder: "Sandeep Kumar",
      type: "Debit",
      amount: "₹22,000.00",
      status: "Failed",
      channel: "NEFT",
      remarks: "Loan Payment",
    },
    {
      id: "TXN10000008",
      date: "28 Jul 2024, 05:45 PM",
      account: "CA852963741",
      holder: "Anjali Verma",
      type: "Credit",
      amount: "₹30,000.00",
      status: "Completed",
      channel: "UPI",
      remarks: "Refund",
    },
    {
      id: "TXN10000009",
      date: "28 Jul 2024, 01:20 PM",
      account: "SA963852741",
      holder: "Rohan Das",
      type: "Debit",
      amount: "₹5,500.00",
      status: "Completed",
      channel: "IMPS",
      remarks: "Shopping",
    },
    {
      id: "TXN10000010",
      date: "28 Jul 2024, 11:00 AM",
      account: "CA741852963",
      holder: "Meera Nair",
      type: "Credit",
      amount: "₹18,200.00",
      status: "Completed",
      channel: "NEFT",
      remarks: "Interest Credit",
    },
  ];

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <div>
          <h2 className="text-white fw-bold mb-1">Transactions</h2>
          <p className="text-secondary mb-0">
            Dashboard &gt; Transactions
          </p>
        </div>

        <button className="btn btn-primary px-4 py-2 rounded-3">
          <BsPlus className="me-2" />
          New Transaction
        </button>
      </div>

      {/* KPI Cards */}
      <div className="row g-4 mb-4">
        <div className="col-xl-3 col-md-6">
          <div className="stat-card">
            <div className="stat-icon blue">
              <BsArrowLeftRight />
            </div>
            <div>
              <p className="text-secondary mb-1">Total Transactions</p>
              <h3 className="text-white fw-bold mb-1">12,846</h3>
              <span className="text-success">+8.6% from last month</span>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="stat-card">
            <div className="stat-icon green">
              <BsArrowDownCircle />
            </div>
            <div>
              <p className="text-secondary mb-1">Total Credit Amount</p>
              <h3 className="text-white fw-bold mb-1">₹24,85,60,000</h3>
              <span className="text-success">+12.3% from last month</span>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="stat-card">
            <div className="stat-icon red">
              <BsArrowUpCircle />
            </div>
            <div>
              <p className="text-secondary mb-1">Total Debit Amount</p>
              <h3 className="text-white fw-bold mb-1">₹20,45,30,000</h3>
              <span className="text-success">+6.7% from last month</span>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="stat-card">
            <div className="stat-icon orange">
              <BsArrowLeftRight />
            </div>
            <div>
              <p className="text-secondary mb-1">Net Transaction Amount</p>
              <h3 className="text-white fw-bold mb-1">₹4,40,30,000</h3>
              <span className="text-success">+10.5% from last month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="table-card">
        {/* Filters */}
        <div className="row g-3 mb-4">
          <div className="col-xl-4 col-lg-6">
            <div className="search-box">
              <BsSearch className="search-icon" />
              <input
                type="text"
                className="form-control"
                placeholder="Search by transaction ID, account number, or remarks..."
              />
            </div>
          </div>

          <div className="col-xl-2 col-lg-3 col-md-6">
            <button className="filter-btn w-100">
              <BsCalendar3 className="me-2" />
              Jul 2024
            </button>
          </div>

          <div className="col-xl-2 col-lg-3 col-md-6">
            <select className="form-select dark-select">
              <option>All Types</option>
            </select>
          </div>

          <div className="col-xl-2 col-lg-3 col-md-6">
            <select className="form-select dark-select">
              <option>All Accounts</option>
            </select>
          </div>

          <div className="col-xl-2 col-lg-3 col-md-6">
            <button className="filter-btn w-100">
              <BsDownload className="me-2" />
              Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table transaction-table align-middle">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Date &amp; Time</th>
                <th>Account Number</th>
                <th>Account Holder</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Channel</th>
                <th>Remarks</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td className="fw-semibold text-white">{tx.id}</td>
                  <td className="text-secondary">{tx.date}</td>
                  <td className="text-white">{tx.account}</td>
                  <td className="text-white">{tx.holder}</td>
                  <td>
                    <span
                      className={`type-badge ${
                        tx.type === "Credit" ? "credit" : "debit"
                      }`}
                    >
                      {tx.type === "Credit" ? (
                        <BsArrowDownCircle className="me-1" />
                      ) : (
                        <BsArrowUpCircle className="me-1" />
                      )}
                      {tx.type}
                    </span>
                  </td>
                  <td
                    className={
                      tx.type === "Credit" ? "text-success fw-semibold" : "text-danger fw-semibold"
                    }
                  >
                    {tx.amount}
                  </td>
                  <td>
                    <span
                      className={`status-badge ${
                        tx.status === "Completed"
                          ? "completed"
                          : tx.status === "Pending"
                          ? "pending"
                          : "failed"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td>
                    <span className="channel-badge">{tx.channel}</span>
                  </td>
                  <td className="text-secondary">{tx.remarks}</td>
                  <td className="text-end">
                    <div className="d-flex justify-content-end gap-2">
                      <button className="action-btn">
                        <BsEye />
                      </button>
                      <button className="action-btn">
                        <BsThreeDotsVertical />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mt-4 gap-3">
          <p className="text-secondary mb-0">
            Showing 1 to 10 of 12,846 transactions
          </p>

          <nav>
            <ul className="pagination pagination-dark mb-0">
              <li className="page-item">
                <a className="page-link" href="#">
                  ‹
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  ›
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
