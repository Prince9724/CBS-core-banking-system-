import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./customers.css";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [branchFilter, setBranchFilter] = useState("All");

  // ========== ✅ FETCH CUSTOMERS ==========
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:5003/cbs/customer/get",
        { withCredentials: true }
      );

      console.log("👥 Customers Response:", res.data);

      if (res.data.status) {
        setCustomers(res.data.data || []);
      }
    } catch (err) {
      console.error("Error fetching customers:", err);
    } finally {
      setLoading(false);
    }
  };

  // ========== ✅ FETCH BRANCHES ==========
  const fetchBranches = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5003/cbs/getbranch",
        { withCredentials: true }
      );

      if (res.data.status) {
        setBranches(res.data.data || []);
      }
    } catch (err) {
      console.error("Error fetching branches:", err);
    }
  };

  useEffect(() => {
    fetchCustomers();
    fetchBranches();
  }, []);

  // ========== ✅ REAL STATS ==========
  const activeCustomers = customers.filter((c) => c.status === "active" || !c.status);
  const inactiveCustomers = customers.filter((c) => c.status === "inactive");

  // ========== ✅ BRANCH WISE COUNT ==========
  const branchWiseCount = branches.map((branch) => ({
    name: branch.branchname,
    code: branch.branchcode,
    count: customers.filter((c) => c.branchcode === branch.branchcode).length,
  }));

  // ========== ✅ STATS CARDS - REAL DATA ==========
  const customerStatusGrid = [
    {
      icon: "bi bi-people-fill",
      iconsBg: "#152350",
      iconColor: "#5C5CF4",
      label: "Total Customers",
      value: customers.length,
      subtext: "Total customers",
    },
    {
      icon: "bi bi-shield-fill-check",
      label: "Active Customers",
      iconsBg: "#11351D",
      iconColor: "#42CB46",
      value: activeCustomers.length,
      subtext: "Active customers",
    },
    {
      icon: "bi bi-shield-fill-exclamation",
      label: "Inactive Customers",
      iconsBg: "#322710",
      iconColor: "#F39F00",
      value: inactiveCustomers.length,
      subtext: "Inactive customers",
    },
    {
      icon: "bi bi-building",
      label: "Total Branches",
      iconsBg: "#0E2138",
      iconColor: "#1C7AEB",
      value: branches.length,
      subtext: "Available branches",
    },
  ];

  // ========== ✅ FILTER CUSTOMERS - FIXED ==========
  const filteredCustomers = customers.filter((customer) => {
    // ✅ Safely convert to string before using toLowerCase
    const name = customer.name?.toString().toLowerCase() || "";
    const email = customer.email?.toString().toLowerCase() || "";
    const phone = customer.phone?.toString().toLowerCase() || "";
    const aadhar = customer.aadhar?.toString().toLowerCase() || "";
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      name.includes(search) ||
      email.includes(search) ||
      phone.includes(search) ||
      aadhar.includes(search);

    const matchesBranch =
      branchFilter === "All" || customer.branchcode === branchFilter;

    return matchesSearch && matchesBranch;
  });

  // ========== ✅ PAGINATION ==========
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  return (
    <div className="customer-bigparent">
      {/* ===== BREADCRUMB ===== */}
      <div className="d-flex gap-2 justify-content-end" style={{ fontSize: "14px" }}>
        <Link className="text-primary" to={"/admin"}>
          Dashboard
        </Link>
        <span>›</span>
        <span>Customers</span>
      </div>

      {/* ===== HEADER ===== */}
      <div className="d-flex justify-content-between mt-3">
        <div className="d-flex flex-column">
          <h4>Customers</h4>
          <p className="gray-text">Manage all bank customers their information</p>
        </div>
        <div>
          <Link to={"/admin/customers/add"} className="btn btn-primary">
            <i className="bi bi-plus"></i> Add Customers
          </Link>
        </div>
      </div>

      {/* ===== STATS CARDS - REAL DATA ===== */}
      <div className="customers-details-grid mt-4">
        {customerStatusGrid.map((customer, i) => (
          <div className="customer-card" key={i}>
            <div className="customer-icon" style={{ background: customer.iconsBg }}>
              <i className={customer.icon} style={{ color: customer.iconColor }}></i>
            </div>
            <div className="customer-info">
              <p className="customer-label">{customer.label}</p>
              <h2 className="customer-value">{customer.value}</h2>
              <div className="customer-sub">
                <span className="sub-text">{customer.subtext}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== BRANCH WISE CUSTOMER COUNT ===== */}
      <div className="row mt-4 g-3">
        <div className="col-12">
          <div className="branch-wise-card">
            <h6 className="mb-3">
              <i className="bi bi-building me-2"></i>
              Branch-wise Customer Count
            </h6>
            <div className="d-flex flex-wrap gap-3">
              <span className="branch-count-badge bg-primary">
                All: {customers.length}
              </span>
              {branchWiseCount.map((branch, i) => (
                <span key={i} className="branch-count-badge bg-secondary">
                  {branch.name}: {branch.count}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== FILTERS ===== */}
      <div className="d-flex flex-wrap gap-3 mt-4">
        <div className="search-box">
          <i className="bi bi-search"></i>
          <input
            type="text"
            placeholder="Search by name, email, phone or aadhar..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="form-control form-control-sm"
            style={{ width: "300px" }}
          />
        </div>

        <select
          className="form-select form-select-sm"
          style={{ width: "200px" }}
          value={branchFilter}
          onChange={(e) => {
            setBranchFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="All">All Branches</option>
          {branches.map((branch) => (
            <option key={branch._id} value={branch.branchcode}>
              {branch.branchname} ({branch.branchcode})
            </option>
          ))}
        </select>

        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => {
            setSearchTerm("");
            setBranchFilter("All");
            setCurrentPage(1);
          }}
        >
          <i className="bi bi-arrow-counterclockwise"></i> Reset
        </button>
      </div>

      {/* ===== CUSTOMERS TABLE ===== */}
      <div className="mt-4">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Aadhar</th>
                <th>Branch</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : currentCustomers.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-muted">
                    <i className="bi bi-inbox fs-2 d-block mb-2"></i>
                    No customers found
                  </td>
                </tr>
              ) : (
                currentCustomers.map((customer, index) => (
                  <tr key={customer._id}>
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div className="customer-avatar">
                          {customer.name?.charAt(0) || "C"}
                        </div>
                        <strong>{customer.name}</strong>
                      </div>
                    </td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.aadhar || "N/A"}</td>
                    <td>
                      <span className="badge bg-info">
                        {customer.branchname || customer.branchcode}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          customer.status === "inactive"
                            ? "bg-danger"
                            : "bg-success"
                        }`}
                      >
                        {customer.status || "Active"}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-outline-primary">
                          <i className="bi bi-eye"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-warning">
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-danger">
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ===== PAGINATION ===== */}
        {filteredCustomers.length > itemsPerPage && (
          <div className="d-flex justify-content-between align-items-center mt-3">
            <span className="text-muted small">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, filteredCustomers.length)} of{" "}
              {filteredCustomers.length} customers
            </span>
            <nav>
              <ul className="pagination pagination-sm mb-0">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </button>
                </li>
                {[...Array(totalPages)].map((_, i) => (
                  <li
                    key={i}
                    className={`page-item ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}