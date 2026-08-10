import React from "react";
import {
  BsSearch,
  BsCalendar3,
  BsDownload,
  BsEye,
  BsPencil,
  BsTrash,
} from "react-icons/bs";
import "./customerTable.css";
export default function CustomerTable() {
  const customers = [
    {
      id: "CUST10001",
      name: "Rahul Patel",
      branch: "Surat Branch",
      accountType: "Savings Account",
      phone: "+91 98765 43210",
      balance: "₹52,450.00",
      status: "Active",
    },
    {
      id: "CUST10002",
      name: "Neha Sharma",
      branch: "Mumbai Branch",
      accountType: "Current Account",
      phone: "+91 98765 43211",
      balance: "₹1,25,000.00",
      status: "Active",
    },
    {
      id: "CUST10003",
      name: "Amit Singh",
      branch: "Delhi Branch",
      accountType: "Savings Account",
      phone: "+91 98765 43212",
      balance: "₹75,230.00",
      status: "Inactive",
    },
    {
      id: "CUST10004",
      name: "Priya Mehta",
      branch: "Surat Branch",
      accountType: "Fixed Deposit",
      phone: "+91 98765 43213",
      balance: "₹3,50,000.00",
      status: "Active",
    },
    {
      id: "CUST10005",
      name: "Vikram Joshi",
      branch: "Pune Branch",
      accountType: "Current Account",
      phone: "+91 98765 43214",
      balance: "₹25,450.00",
      status: "Active",
    },
    {
      id: "CUST10006",
      name: "Kavya Reddy",
      branch: "Hyderabad Branch",
      accountType: "Savings Account",
      phone: "+91 98765 43215",
      balance: "₹45,200.00",
      status: "Inactive",
    },
    {
      id: "CUST10007",
      name: "Sandeep Kumar",
      branch: "Mumbai Branch",
      accountType: "Loan Account",
      phone: "+91 98765 43216",
      balance: "₹1,80,000.00",
      status: "Active",
    },
  ];
  return (
    <div className="customer-table-card">
      <div className="filter-bar">
        <div className="search-box">
          <BsSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by name, phone or customer ID..."
          />
        </div>
        <select>
          <option>All Branches</option>
        </select>
        <select>
          <option>All Status</option>
        </select>
        <select>
          <option>All Account Types</option>
        </select>
        <button className="date-btn">
          <BsCalendar3 /> 01 Jul 2024 - 31 Jul 2024
        </button>
        <button className="export-btn">
          <BsDownload /> Export
        </button>
      </div>
      <div className="table-wrapper">
        <table className="customer-table">
          <thead>
            <tr>
              <th>Customer ID</th> <th>Customer Name</th> <th>Branch</th>
              <th>Account Type</th> <th>Phone Number</th> <th>Balance</th>
              <th>Status</th> <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td className="customer-id">{customer.id}</td>
                <td className="customer-name">{customer.name}</td>
                <td>{customer.branch}</td> <td>{customer.accountType}</td>
                <td>{customer.phone}</td>
                <td className="balance">{customer.balance}</td>
                <td>
                  <span
                    className={
                      customer.status === "Active"
                        ? "status-badge active"
                        : "status-badge inactive"
                    }
                  >
                    {customer.status}
                  </span>
                </td>
                <td>
                  <div className="action-group">
                    <button className="action-btn view">
                      <BsEye />
                    </button>
                    <button className="action-btn edit">
                      <BsPencil />
                    </button>
                    <button className="action-btn delete">
                      <BsTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-footer">
        <p>Showing 1 to 10 of 25,846 customers</p>
        <div className="pagination">
          <button>‹</button> <button className="active">1</button>
          <button>2</button> <button>3</button> <button>4</button>
          <button>5</button> <button>›</button>
        </div>
      </div>
    </div>
  );
}
