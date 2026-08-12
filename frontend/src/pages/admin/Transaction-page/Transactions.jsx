// transactions.jsx
import React from "react";
import "./transactions.css";
import {
  FiSearch,
  FiCalendar,
  FiChevronDown,
  FiDownload,
  FiEye,
  FiMoreVertical,
} from "react-icons/fi";
import {
  FaCreditCard,
  FaMoneyBillWave,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

const Transactions = () => {
  const transactions = [
    {
      id: "TXN10000001",
      date: "31 Jul 2024, 10:30 AM",
      account: "SA123456789",
      holder: "Rahul Patel",
      type: "Credit",
      amount: "25,000.00",
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
      amount: "12,500.00",
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
      amount: "50,000.00",
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
      amount: "15,000.00",
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
      amount: "1,00,000.00",
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
      amount: "8,750.00",
      status: "Pending",
      channel: "",
      remarks: "Online Transfer",
    },
    {
      id: "TXN10000007",
      date: "29 Jul 2024, 10:05 AM",
      account: "LA753159357",
      holder: "Sandeep Kumar",
      type: "Debit",
      amount: "22,000.00",
      status: "Failed",
      channel: "",
      remarks: "Loan Payment",
    },
    {
      id: "TXN10000008",
      date: "28 Jul 2024, 05:45 PM",
      account: "CA852963741",
      holder: "Anjali Verma",
      type: "Credit",
      amount: "30,000.00",
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
      amount: "5,500.00",
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
      amount: "18,200.00",
      status: "Completed",
      channel: "NEFT",
      remarks: "Interest Credit",
    },
  ];

  const kpiData = [
    {
      title: "Total Transactions",
      value: "12,846",
      change: "+8.6%",
      icon: <FaCreditCard />,
      color: "#4f46e5",
    },
    {
      title: "Total Credit Amount",
      value: "₹24,85,60,000",
      change: "+12.3%",
      icon: <FaArrowUp />,
      color: "#22c55e",
    },
    {
      title: "Total Debit Amount",
      value: "₹20,45,30,000",
      change: "+6.7%",
      icon: <FaArrowDown />,
      color: "#ef4444",
    },
    {
      title: "Net Transaction Amount",
      value: "₹4,40,30,000",
      change: "+10.5%",
      icon: <FaMoneyBillWave />,
      color: "#f59e0b",
    },
  ];

  const getStatusBadge = (status) => {
    if (status === "Completed")
      return <span className="badge badge-success">{status}</span>;
    if (status === "Pending")
      return <span className="badge badge-warning">{status}</span>;
    return <span className="badge badge-danger">{status}</span>;
  };

  const getTypeBadge = (type) => {
    if (type === "Credit")
      return <span className="badge badge-credit">{type}</span>;
    return <span className="badge badge-debit">{type}</span>;
  };

  const getAmountClass = (type) => {
    return type === "Credit" ? "text-credit" : "text-debit";
  };

  return (
    <div className="transactions-page">
      {/* Header */}
      <div className="header-section">
        <div className="header-left">
          <h1 className="page-title">Transactions</h1>
          <div className="breadcrumb">Dashboard &gt; Transactions</div>
        </div>
        <button className="btn-primary">+ New Transaction</button>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        {kpiData.map((kpi, index) => (
          <div className="kpi-card" key={index}>
            <div className="kpi-card-header">
              <span className="kpi-title">{kpi.title}</span>
              <div className="kpi-icon" style={{ backgroundColor: kpi.color }}>
                {kpi.icon}
              </div>
            </div>
            <div className="kpi-value">{kpi.value}</div>
            <div className="kpi-change">{kpi.change} from last month</div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="filter-section">
        <div className="filter-row">
          <div className="filter-item search-wrapper">
            <FiSearch className="filter-icon" />
            <input
              type="text"
              placeholder="Search by transaction ID, account number, or remark..."
              className="filter-input"
            />
          </div>
          <div className="filter-item date-wrapper">
            <FiCalendar className="filter-icon" />
            <input
              type="text"
              placeholder="Date Filter"
              className="filter-input"
            />
          </div>
          <div className="filter-item dropdown-wrapper">
            <select className="filter-select">
              <option>All Transaction Types</option>
              <option>Credit</option>
              <option>Debit</option>
            </select>
            <FiChevronDown className="dropdown-icon" />
          </div>
          <div className="filter-item dropdown-wrapper">
            <select className="filter-select">
              <option>All Accounts</option>
              <option>Savings</option>
              <option>Current</option>
              <option>Fixed Deposit</option>
              <option>Loan</option>
            </select>
            <FiChevronDown className="dropdown-icon" />
          </div>
          <button className="btn-export">
            <FiDownload /> Export
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="table-wrapper">
        <table className="transactions-table">
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn, index) => (
              <tr key={index}>
                <td data-label="Transaction ID">{txn.id}</td>
                <td data-label="Date & Time">{txn.date}</td>
                <td data-label="Account Number">{txn.account}</td>
                <td data-label="Account Holder">{txn.holder}</td>
                <td data-label="Type">{getTypeBadge(txn.type)}</td>
                <td data-label="Amount" className={getAmountClass(txn.type)}>
                  ₹{txn.amount}
                </td>
                <td data-label="Status">{getStatusBadge(txn.status)}</td>
                <td data-label="Channel">{txn.channel}</td>
                <td data-label="Remarks">{txn.remarks}</td>
                <td data-label="Actions">
                  <div className="action-buttons">
                    <button className="action-btn">
                      <FiEye />
                    </button>
                    <button className="action-btn">
                      <FiMoreVertical />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="table-footer">
        <div className="footer-info">
          Showing 1 to 10 of 12,846 transactions
        </div>
        <div className="pagination">
          <button className="page-btn nav-btn">‹</button>
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <button className="page-btn">4</button>
          <button className="page-btn">5</button>
          <button className="page-btn">...</button>
          <button className="page-btn page-number-wide">1285</button>
          <button className="page-btn nav-btn">›</button>
        </div>
      </div>

      {/* <div className="secure-banking">
        <span>🔒 Secure Banking</span>
        <span>All transactions are secure and encrypted</span>
      </div> */}
    </div>
  );
};

export default Transactions;
