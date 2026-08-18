import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers, addCustomer } from "../../feature/features/customerSlice";
import "./ManagerCustomers.css";

export default function ManagerCustomers() {
  const dispatch = useDispatch();

  const { customers, loading } = useSelector((state) => state.customer);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    aadhar: "",
    pan: "",
  });

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

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

    // Refresh customer list
    dispatch(fetchCustomers());

  } catch (error) {
    console.error("ADD CUSTOMER ERROR:", error);
  }
};

  return (
    <div className="manager-customers-page">
      {/* ================= HEADER ================= */}
      <div className="customers-page-header">
        <div>
          <span className="customers-eyebrow">
            <i className="bi bi-people-fill"></i>
              Customer Management
          </span>

          <h1>Customers</h1>

          <p>Manage branch customers and their basic information.</p>
        </div>

        <div className="customers-header-count">
          <div className="customers-count-icon">
            <i className="bi bi-people-fill"></i>
          </div>

          <div>
            <span>Total Customers</span>
            <strong>{(customers || []).length}</strong>
          </div>
        </div>
      </div>

      {/* ================= ADD CUSTOMER ================= */}
      <div className="customer-form-card">
        <div className="customer-section-header">
          <div className="customer-section-title">
            <div className="customer-title-icon">
              <i className="bi bi-person-plus-fill"></i>
            </div>

            <div>
              <h3>Add New Customer</h3>
              <p>Enter customer information to create a new record.</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="customer-form-grid">
            {/* Full Name */}
            <div className="customer-form-group">
              <label htmlFor="name">Full Name</label>

              <div className="customer-input-wrapper">
                <i className="bi bi-person"></i>

                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="customer-input"
                  placeholder="Enter full name"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="customer-form-group">
              <label htmlFor="email">Email Address</label>

              <div className="customer-input-wrapper">
                <i className="bi bi-envelope"></i>

                <input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="customer-input"
                  placeholder="Enter email address"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div className="customer-form-group">
              <label htmlFor="phone">Phone Number</label>

              <div className="customer-input-wrapper">
                <i className="bi bi-telephone"></i>

                <input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="customer-input"
                  placeholder="Enter phone number"
                  required
                />
              </div>
            </div>

            {/* Address */}
            <div className="customer-form-group">
              <label htmlFor="address">Address</label>

              <div className="customer-input-wrapper">
                <i className="bi bi-geo-alt"></i>

                <input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="customer-input"
                  placeholder="Enter address"
                  required
                />
              </div>
            </div>

            {/* Aadhar */}
            <div className="customer-form-group">
              <label htmlFor="aadhar">Aadhar Number</label>

              <div className="customer-input-wrapper">
                <i className="bi bi-person-vcard"></i>

                <input
                  id="aadhar"
                  name="aadhar"
                  value={formData.aadhar}
                  onChange={handleChange}
                  className="customer-input"
                  placeholder="Enter Aadhar number"
                  required
                />
              </div>
            </div>

            {/* PAN */}
            <div className="customer-form-group">
              <label htmlFor="pan">PAN Number</label>

              <div className="customer-input-wrapper">
                <i className="bi bi-card-text"></i>

                <input
                  id="pan"
                  name="pan"
                  value={formData.pan}
                  onChange={handleChange}
                  className="customer-input"
                  placeholder="Enter PAN number"
                  required
                />
              </div>
            </div>
          </div>

          <div className="customer-form-footer">
            <span className="customer-secure-note">
              <i className="bi bi-shield-check"></i>
              Customer information is securely stored.
            </span>

            <button className="customer-submit-btn" type="submit">
              <i className="bi bi-person-plus-fill"></i>
              Add Customer
            </button>
          </div>
        </form>
      </div>

      {/* ================= CUSTOMER LIST ================= */}
      <div className="customer-list-card">
        <div className="customer-section-header">
          <div className="customer-section-title">
            <div className="customer-title-icon">
              <i className="bi bi-list-ul"></i>
            </div>

            <div>
              <h3>Customer List</h3>
              <p>View customers registered with this branch.</p>
            </div>
          </div>

          <div className="customer-list-total">
            <span>Total</span>
            <strong>{(customers || []).length}</strong>
          </div>
        </div>

        {loading ? (
          <div className="customer-loading">
            <div className="spinner-border" role="status"></div>

            <span>Loading customers...</span>
          </div>
        ) : (
          <div className="customer-table-wrapper">
            <table className="customer-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Branch</th>
                </tr>
              </thead>

              <tbody>
                {(customers || []).length > 0 ? (
                  (customers || []).map((customer) => (
                    <tr key={customer._id}>
                      <td>
                        <div className="customer-name-cell">
                          <div className="customer-avatar">
                            <i className="bi bi-person-fill"></i>
                          </div>

                          <div>
                            <strong>{customer.name}</strong>

                            <small>Customer</small>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="customer-phone-cell">
                          <i className="bi bi-telephone-fill"></i>

                          <span>{customer.phone}</span>
                        </div>
                      </td>

                      <td>
                        <span className="customer-branch-badge">
                          <i className="bi bi-building"></i>

                          {customer.branchname}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="customer-empty">
                      <div className="customer-empty-icon">
                        <i className="bi bi-people"></i>
                      </div>

                      <strong>No customers found</strong>

                      <span>Add your first customer using the form above.</span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
