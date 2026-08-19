import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [branchFilter, setBranchFilter] = useState("All");
  const [editCustomer, setEditCustomer] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

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

  // ========== ✅ DELETE CUSTOMER ==========
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) return;

    try {
      await axios.delete(`http://localhost:5003/cbs/customer/delete/${id}`, {
        withCredentials: true,
      });
      alert("✅ Customer deleted successfully");
      fetchCustomers();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete customer");
    }
  };

  // ========== ✅ UPDATE CUSTOMER ==========
  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5003/cbs/customer/update/${editCustomer._id}`,
        editCustomer,
        { withCredentials: true }
      );
      alert("✅ Customer updated successfully");
      setShowEditModal(false);
      setEditCustomer(null);
      fetchCustomers();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update customer");
    }
  };

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

  // ========== ✅ FILTER CUSTOMERS ==========
  const filteredCustomers = customers.filter((customer) => {
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
    <div className="container-fluid px-4 py-4 bg-dark min-vh-100">

      {/* ===== BREADCRUMB ===== */}
      <div className="d-flex gap-2 justify-content-end" style={{ fontSize: "14px" }}>
        <Link className="text-primary text-decoration-none" to={"/admin"}>
          Dashboard
        </Link>
        <span className="text-secondary">›</span>
        <span className="text-secondary">Customers</span>
      </div>

      {/* ===== HEADER ===== */}
      <div className="d-flex justify-content-between mt-3 mb-4">
        <div>
          <h1 className="text-white fw-bold mb-1">Customers</h1>
          <p className="text-secondary m-0">Manage all bank customers their information</p>
        </div>
      </div>

      {/* ===== STATS CARDS - REAL DATA ===== */}
      <div className="row g-3 mb-4">
        {customerStatusGrid.map((customer, i) => (
          <div className="col-xl-3 col-lg-4 col-md-6" key={i}>
            <div className="card bg-dark border-secondary h-100">
              <div className="card-body d-flex align-items-center gap-3">
                <div
                  className="rounded-3 p-3 d-flex align-items-center justify-content-center"
                  style={{ background: customer.iconsBg, color: customer.iconColor }}
                >
                  <i className={customer.icon} style={{ fontSize: "24px" }}></i>
                </div>
                <div>
                  <p className="text-secondary small fw-semibold text-uppercase mb-0">
                    {customer.label}
                  </p>
                  <h3 className="text-white fw-bold mb-0">{customer.value}</h3>
                  <small className="text-secondary">{customer.subtext}</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== BRANCH WISE CUSTOMER COUNT ===== */}
      <div className="card bg-dark border-secondary mb-4">
        <div className="card-body">
          <h6 className="text-white mb-3">
            <i className="bi bi-building me-2 text-primary"></i>
            Branch-wise Customer Count
          </h6>
          <div className="d-flex flex-wrap gap-2">
            <span className="badge bg-primary px-3 py-2">
              All: {customers.length}
            </span>
            {branchWiseCount.map((branch, i) => (
              <span key={i} className="badge bg-secondary px-3 py-2">
                {branch.name}: {branch.count}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ===== FILTERS ===== */}
      <div className="d-flex flex-wrap gap-3 mb-4">
        <div className="d-flex align-items-center bg-dark border border-secondary rounded-3 px-3">
          <i className="bi bi-search text-secondary"></i>
          <input
            type="text"
            placeholder="Search by name, email, phone or aadhar..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-transparent border-0 text-white py-2 px-2"
            style={{ width: "280px", outline: "none" }}
          />
        </div>

        <select
          className="form-select bg-dark text-white border-secondary"
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
          className="btn btn-outline-secondary d-flex align-items-center gap-2"
          onClick={() => {
            setSearchTerm("");
            setBranchFilter("All");
            setCurrentPage(1);
          }}
        >
          <i className="bi bi-arrow-counterclockwise"></i>
          Reset
        </button>
      </div>

      {/* ===== CUSTOMERS TABLE ===== */}
      <div className="card bg-dark border-secondary">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-dark table-hover align-middle mb-0">
              <thead>
                <tr className="border-secondary">
                  <th className="ps-4">S.No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Aadhar</th>
                  <th>Branch</th>
                  {/* ✅ STATUS COLUMN REMOVED */}
                  <th className="pe-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : currentCustomers.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5 text-secondary">
                      <i className="bi bi-inbox fs-1 d-block mb-3"></i>
                      <h5>No customers found</h5>
                      <p className="small">Try adjusting your search or filters</p>
                    </td>
                  </tr>
                ) : (
                  currentCustomers.map((customer, index) => (
                    <tr key={customer._id} className="border-secondary">
                      <td className="ps-4">{indexOfFirstItem + index + 1}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center text-primary" style={{ width: "32px", height: "32px" }}>
                            {customer.name?.charAt(0) || "C"}
                          </div>
                          <strong className="text-white">{customer.name}</strong>
                        </div>
                      </td>
                      <td className="text-secondary">{customer.email}</td>
                      <td className="text-secondary">{customer.phone}</td>
                      <td className="text-secondary">{customer.aadhar || "N/A"}</td>
                      <td>
                        <span className="badge bg-info bg-opacity-10 text-info">
                          {customer.branchname || customer.branchcode}
                        </span>
                      </td>
                      {/* ✅ STATUS COLUMN REMOVED */}
                      <td>
                        <div className="d-flex gap-2 justify-content-center">
                          {/* ✅ VIEW BUTTON - Working */}
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => alert(`Customer Details:\nName: ${customer.name}\nEmail: ${customer.email}\nPhone: ${customer.phone}\nAadhar: ${customer.aadhar}\nBranch: ${customer.branchname}`)}
                          >
                            <i className="bi bi-eye"></i>
                          </button>
                          {/* ✅ EDIT BUTTON - Working */}
                          <button
                            className="btn btn-sm btn-outline-warning"
                            onClick={() => {
                              setEditCustomer(customer);
                              setShowEditModal(true);
                            }}
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          {/* ✅ DELETE BUTTON - Working */}
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(customer._id, customer.name)}
                          >
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
        </div>
      </div>

      {/* ===== PAGINATION ===== */}
      {filteredCustomers.length > itemsPerPage && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span className="text-secondary small">
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, filteredCustomers.length)} of{" "}
            {filteredCustomers.length} customers
          </span>
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link bg-dark border-secondary text-white"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </button>
              </li>
              {[...Array(totalPages)].map((_, i) => (
                <li
                  key={i}
                  className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link bg-dark border-secondary text-white"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
              >
                <button
                  className="page-link bg-dark border-secondary text-white"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* ===== EDIT MODAL ===== */}
      {showEditModal && editCustomer && (
        <div className="modal d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.7)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-white border-secondary">
              <div className="modal-header border-secondary">
                <h5 className="modal-title">
                  <i className="bi bi-pencil-square me-2 text-warning"></i>
                  Edit Customer
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditCustomer(null);
                  }}
                ></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label text-secondary small">Full Name</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    value={editCustomer.name || ""}
                    onChange={(e) =>
                      setEditCustomer({ ...editCustomer, name: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-secondary small">Email</label>
                  <input
                    type="email"
                    className="form-control bg-dark text-white border-secondary"
                    value={editCustomer.email || ""}
                    onChange={(e) =>
                      setEditCustomer({ ...editCustomer, email: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-secondary small">Phone</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    value={editCustomer.phone || ""}
                    onChange={(e) =>
                      setEditCustomer({ ...editCustomer, phone: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-secondary small">Address</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    value={editCustomer.address || ""}
                    onChange={(e) =>
                      setEditCustomer({ ...editCustomer, address: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-secondary small">Aadhar</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    value={editCustomer.aadhar || ""}
                    onChange={(e) =>
                      setEditCustomer({ ...editCustomer, aadhar: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="modal-footer border-secondary">
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditCustomer(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary d-flex align-items-center gap-2"
                  onClick={handleUpdate}
                >
                  <i className="bi bi-check-lg"></i>
                  Update Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .table-dark {
          --bs-table-bg: transparent;
        }
        .table-dark td, .table-dark th {
          border-color: #2a2f3a;
        }
        .table-dark tbody tr:hover {
          background: rgba(255, 255, 255, 0.02);
        }
        .form-select {
          cursor: pointer;
        }
        .form-select option {
          background: #1a2a42;
        }
        input::placeholder {
          color: #6b8aa8;
        }
        .page-link.bg-dark:hover {
          background: #2a3f5a !important;
        }
        .modal-content {
          border-radius: 12px;
        }
        .form-control:focus {
          border-color: #0d6efd;
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
        }
      `}</style>

    </div>
  );
}