import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers, addCustomer } from "../../feature/features/customerSlice";
import "./ManagerCustomers.css";

export default function ManagerCustomers() {
  const dispatch = useDispatch();

  const { customers, loading } = useSelector((state) => state.customer);

  // ✅ Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  // ✅ Form Data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    aadhar: "",
    pan: "",
  });

  // ✅ Error State
  const [errors, setErrors] = useState({
    phone: "",
    aadhar: "",
    pan: "",
  });

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  // =====================================================
  // ✅ VALIDATION FUNCTIONS
  // =====================================================

  // ✅ Phone: Exactly 10 digits
  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phone) return "Phone number is required";
    if (!phoneRegex.test(phone)) return "Phone must be exactly 10 digits";
    return "";
  };

  // ✅ Aadhar: Exactly 12 digits
  const validateAadhar = (aadhar) => {
    const aadharRegex = /^[0-9]{12}$/;
    if (!aadhar) return "Aadhar number is required";
    if (!aadharRegex.test(aadhar)) return "Aadhar must be exactly 12 digits";
    return "";
  };

  // ✅ PAN: 10 characters (5 letters + 4 digits + 1 letter)
  const validatePan = (pan) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!pan) return "PAN number is required";
    if (!panRegex.test(pan.toUpperCase())) 
      return "PAN must be 10 characters (e.g., ABCDE1234F)";
    return "";
  };

  // ✅ Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  // ✅ Name validation
  const validateName = (name) => {
    if (!name) return "Name is required";
    if (name.length < 2) return "Name must be at least 2 characters";
    return "";
  };

  // =====================================================
  // ✅ HANDLE CHANGE WITH VALIDATION
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    // ✅ Update form data
    setFormData({
      ...formData,
      [name]: value,
    });

    // ✅ Real-time validation
    let error = "";
    if (name === "phone") {
      // ✅ Only allow digits
      const digitsOnly = value.replace(/\D/g, "");
      if (value !== digitsOnly) {
        // Remove non-digits
        setFormData((prev) => ({ ...prev, [name]: digitsOnly }));
        return;
      }
      error = validatePhone(digitsOnly);
    } else if (name === "aadhar") {
      // ✅ Only allow digits
      const digitsOnly = value.replace(/\D/g, "");
      if (value !== digitsOnly) {
        setFormData((prev) => ({ ...prev, [name]: digitsOnly }));
        return;
      }
      error = validateAadhar(digitsOnly);
    } else if (name === "pan") {
      // ✅ Auto uppercase
      const upperValue = value.toUpperCase();
      if (value !== upperValue) {
        setFormData((prev) => ({ ...prev, [name]: upperValue }));
        return;
      }
      error = validatePan(upperValue);
    } else if (name === "email") {
      error = validateEmail(value);
    } else if (name === "name") {
      error = validateName(value);
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  // =====================================================
  // ✅ HANDLE SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Final validation before submit
    const phoneError = validatePhone(formData.phone);
    const aadharError = validateAadhar(formData.aadhar);
    const panError = validatePan(formData.pan);
    const emailError = validateEmail(formData.email);
    const nameError = validateName(formData.name);

    if (phoneError || aadharError || panError || emailError || nameError) {
      setErrors({
        phone: phoneError,
        aadhar: aadharError,
        pan: panError,
        email: emailError,
        name: nameError,
      });
      alert("Please fix all errors before submitting");
      return;
    }

    console.log("FORM DATA:", formData);

    try {
      const result = await dispatch(addCustomer(formData)).unwrap();
      console.log("CUSTOMER CREATED:", result);

      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        aadhar: "",
        pan: "",
      });

      setErrors({ phone: "", aadhar: "", pan: "", email: "", name: "" });
      dispatch(fetchCustomers());
      setCurrentPage(1);

    } catch (error) {
      console.error("ADD CUSTOMER ERROR:", error);
      alert(error || "Failed to add customer");
    }
  };

  // ✅ Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomers = (customers || []).slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil((customers || []).length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container-fluid px-4 py-4 bg-dark min-vh-100">

      {/* ===== HEADER ===== */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <span className="badge bg-info bg-opacity-10 text-info mb-2">
            <i className="bi bi-people-fill me-1"></i>
            Customer Management
          </span>
          <h1 className="text-white fw-bold mb-1">Customers</h1>
          <p className="text-secondary m-0">
            Total: <strong className="text-white">{(customers || []).length}</strong> customers
          </p>
        </div>
        <div className="d-flex align-items-center gap-2 bg-dark border border-secondary rounded-3 px-3 py-2">
          <i className="bi bi-person-plus-fill text-primary"></i>
          <span className="text-white">{currentCustomers.length} / {(customers || []).length}</span>
        </div>
      </div>

      {/* ===== ADD CUSTOMER FORM ===== */}
      <div className="card bg-dark border-secondary mb-4">
        <div className="card-body">
          <div className="d-flex align-items-center gap-3 mb-3">
            <div className="bg-success bg-opacity-10 rounded-3 p-3">
              <i className="bi bi-person-plus-fill fs-4 text-success"></i>
            </div>
            <div>
              <h5 className="text-white mb-0">Add New Customer</h5>
              <p className="text-secondary small mb-0">Enter customer information to create a new record</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">

              {/* ===== NAME ===== */}
              <div className="col-md-6">
                <label className="form-label text-secondary small">Full Name <span className="text-danger">*</span></label>
                <input
                  type="text"
                  name="name"
                  className={`form-control bg-dark text-white border-secondary ${errors.name ? "border-danger" : ""}`}
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && (
                  <small className="text-danger">{errors.name}</small>
                )}
              </div>

              {/* ===== EMAIL ===== */}
              <div className="col-md-6">
                <label className="form-label text-secondary small">Email <span className="text-danger">*</span></label>
                <input
                  type="email"
                  name="email"
                  className={`form-control bg-dark text-white border-secondary ${errors.email ? "border-danger" : ""}`}
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && (
                  <small className="text-danger">{errors.email}</small>
                )}
              </div>

              {/* ===== PHONE - 10 Digits ===== */}
              <div className="col-md-4">
                <label className="form-label text-secondary small">Phone <span className="text-danger">*</span></label>
                <input
                  type="text"
                  name="phone"
                  className={`form-control bg-dark text-white border-secondary ${errors.phone ? "border-danger" : ""}`}
                  placeholder="10 digits (e.g., 9876543210)"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={10}
                  required
                />
                {errors.phone ? (
                  <small className="text-danger">{errors.phone}</small>
                ) : (
                  <small className="text-secondary">Exactly 10 digits</small>
                )}
              </div>

              {/* ===== AADHAR - 12 Digits ===== */}
              <div className="col-md-4">
                <label className="form-label text-secondary small">Aadhar <span className="text-danger">*</span></label>
                <input
                  type="text"
                  name="aadhar"
                  className={`form-control bg-dark text-white border-secondary ${errors.aadhar ? "border-danger" : ""}`}
                  placeholder="12 digits (e.g., 123456789012)"
                  value={formData.aadhar}
                  onChange={handleChange}
                  maxLength={12}
                  required
                />
                {errors.aadhar ? (
                  <small className="text-danger">{errors.aadhar}</small>
                ) : (
                  <small className="text-secondary">Exactly 12 digits</small>
                )}
              </div>

              {/* ===== PAN - 10 Characters ===== */}
              <div className="col-md-4">
                <label className="form-label text-secondary small">PAN <span className="text-danger">*</span></label>
                <input
                  type="text"
                  name="pan"
                  className={`form-control bg-dark text-white border-secondary ${errors.pan ? "border-danger" : ""}`}
                  placeholder="10 chars (e.g., ABCDE1234F)"
                  value={formData.pan}
                  onChange={handleChange}
                  maxLength={10}
                  required
                />
                {errors.pan ? (
                  <small className="text-danger">{errors.pan}</small>
                ) : (
                  <small className="text-secondary">5 letters + 4 digits + 1 letter</small>
                )}
              </div>

              {/* ===== ADDRESS ===== */}
              <div className="col-12">
                <label className="form-label text-secondary small">Address <span className="text-danger">*</span></label>
                <input
                  type="text"
                  name="address"
                  className="form-control bg-dark text-white border-secondary"
                  placeholder="Enter address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* ===== SUBMIT ===== */}
              <div className="col-12">
                <button
                  type="submit"
                  className="btn btn-success d-flex align-items-center gap-2"
                >
                  <i className="bi bi-person-plus-fill"></i>
                  Add Customer
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* ===== CUSTOMER LIST ===== */}
      <div className="card bg-dark border-secondary">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-dark table-hover align-middle mb-0">
              <thead>
                <tr className="border-secondary">
                  <th className="ps-4">#</th>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Branch</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : currentCustomers.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-5 text-secondary">
                      <i className="bi bi-people fs-1 d-block mb-3"></i>
                      <h5>No customers found</h5>
                      <p className="small">Add your first customer using the form above</p>
                    </td>
                  </tr>
                ) : (
                  currentCustomers.map((customer, index) => (
                    <tr key={customer._id} className="border-secondary">
                      <td className="ps-4 text-secondary">{indexOfFirstItem + index + 1}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center text-primary" style={{ width: "32px", height: "32px" }}>
                            {customer.name?.charAt(0) || "C"}
                          </div>
                          <div>
                            <strong className="text-white">{customer.name}</strong>
                            <small className="text-secondary d-block">{customer.email}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <i className="bi bi-telephone-fill text-secondary"></i>
                          <span className="text-white">{customer.phone}</span>
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-secondary bg-opacity-10 text-secondary">
                          <i className="bi bi-building me-1"></i>
                          {customer.branchname || customer.branchcode}
                        </span>
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
      {totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span className="text-secondary small">
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, (customers || []).length)} of{" "}
            {(customers || []).length} customers
          </span>
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button className="page-link bg-dark border-secondary text-white" onClick={prevPage}>
                  Previous
                </button>
              </li>
              {[...Array(totalPages)].map((_, i) => (
                <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                  <button
                    className={`page-link ${currentPage === i + 1 ? "bg-primary border-primary text-white" : "bg-dark border-secondary text-white"}`}
                    onClick={() => paginate(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button className="page-link bg-dark border-secondary text-white" onClick={nextPage}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      <style>{`
        .table-dark { --bs-table-bg: transparent; }
        .table-dark td, .table-dark th { border-color: #2a2f3a; }
        .table-dark tbody tr:hover { background: rgba(255,255,255,0.02); }
        .form-control:focus { border-color: #0d6efd; box-shadow: 0 0 0 0.25rem rgba(13,110,253,0.25); }
        .form-control::placeholder { color: #6b8aa8; }
        .page-link.bg-dark:hover { background: #2a3f5a !important; }
        .page-item.active .page-link { background-color: #0d6efd; border-color: #0d6efd; }
        .badge.bg-secondary.bg-opacity-10 { background: rgba(108,117,125,0.15) !important; }
        .border-danger { border-color: #dc3545 !important; }
        .text-danger { color: #dc3545 !important; }
      `}</style>

    </div>
  );
}