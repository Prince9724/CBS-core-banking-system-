import React from "react";
import "./searchfilter.css"
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

export default function Searchfilter() {
  return (
    <>
      <div className="filter-section">
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
          <button className="btn-export">Search</button>
        </div>
      </div>
    </>
  );
}
