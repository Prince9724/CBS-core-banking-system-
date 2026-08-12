import React from "react";
import { BsSearch, BsEye } from "react-icons/bs";
import {
  FiFilter,
  FiSearch,
  FiCalendar,
  FiChevronDown,
  FiDownload,
  FiEye,
  FiMoreVertical,
} from "react-icons/fi";

import "./branchPerformanceSummary.css";

const branches = [
  {
    branch: "Surat Main Branch",
    region: "Surat",
    customers: "12,450",
    deposits: "₹125.60 Cr",
    loans: "₹82.35 Cr",
    recovery: "98.2%",
    npa: "1.1%",
    growth: "+12.5%",
    status: "Excellent",
  },
  {
    branch: "Navsari Branch",
    region: "Navsari",
    customers: "8,320",
    deposits: "₹74.25 Cr",
    loans: "₹51.20 Cr",
    recovery: "96.8%",
    npa: "1.8%",
    growth: "+8.3%",
    status: "Good",
  },
  {
    branch: "Vapi Branch",
    region: "Vapi",
    customers: "6,980",
    deposits: "₹58.40 Cr",
    loans: "₹47.10 Cr",
    recovery: "91.5%",
    npa: "3.9%",
    growth: "+3.2%",
    status: "Needs Review",
  },
  {
    branch: "Bharuch Branch",
    region: "Bharuch",
    customers: "6,250",
    deposits: "₹45.30 Cr",
    loans: "₹32.15 Cr",
    recovery: "95.1%",
    npa: "2.2%",
    growth: "+6.7%",
    status: "Good",
  },
];

export default function BranchPerformanceSummary() {
  return (
    <section className="branch-summary-section">
      {/* <div className="filter-section">
        <div className="filter-row">
          <div className="filter-item search-wrapper">
            <FiSearch className="filter-icon" />
            <input
              type="text"
              placeholder="Search by Branches"
              className="filter-input"
            />
          </div>
          <div className="filter-item dropdown-wrapper">
            <select className="filter-select">
              <option>All Regions</option>
              <option>Surat</option>
              <option>Amadabaad</option>
              <option>Badoda</option>
            </select>
            <FiChevronDown className="dropdown-icon" />
          </div>
          <div className="filter-item dropdown-wrapper">
            <select className="filter-select">
              <option>Branch Status</option>
              <option>Credit</option>
              <option>Debit</option>
            </select>
            <FiChevronDown className="dropdown-icon" />
          </div>
          <div className="filter-item dropdown-wrapper">
            <select className="filter-select">
              <option>Report Type</option>
              <option>Savings</option>
              <option>Current</option>
              <option>Fixed Deposit</option>
              <option>Loan</option>
            </select>
            <FiChevronDown className="dropdown-icon" />
          </div>
          <button className="btn-export">
             Search
          </button>
        </div>
      </div> */}
      <div className="summary-card">
        <div className="summary-header">
          <h5>Branch performance Reports</h5>
          <button className="view-all-btn">View all</button>
        </div>

        <div className="table-responsive">
          <table className="branch-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Branch Name</th>
                <th>Region</th>
                <th>Customers</th>
                <th>Deposits (₹)</th>
                <th>Loans (₹)</th>
                <th>Recovery %</th>
                <th>NPA %</th>
                <th>Growth %</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {branches.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="branch-name">{item.branch}</td>
                  <td>{item.region}</td>
                  <td>{item.customers}</td>
                  <td>{item.deposits}</td>
                  <td>{item.loans}</td>
                  <td>{item.recovery}</td>
                  <td className="npa-text">{item.npa}</td>
                  <td className="growth-text">{item.growth}</td>
                  <td>
                    <span
                      className={`status-badge ${item.status
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn">
                      <BsEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          <p>Showing 1 to 4 of 24 branches</p>

          <div className="pagination">
            <button className="page-btn">‹</button>
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <button className="page-btn">›</button>
          </div>
        </div>
      </div>
    </section>
  );
}
