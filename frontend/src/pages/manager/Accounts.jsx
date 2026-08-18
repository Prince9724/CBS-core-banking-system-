// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   BsWallet2,
//   BsBank,
//   BsCreditCard2Front,
//   BsFileEarmarkText,
//   BsSearch,
//   BsFilter,
//   BsChevronLeft,
//   BsChevronRight,
//   BsEye,
//   BsPencil,
//   BsTrash,
// } from "react-icons/bs";
// import axios from "axios";
// import "./accounts.css";

// export default function AdminAccounts() {
//   const [accounts, setAccounts] = useState([]);
//   const [branches, setBranches] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);
//   const [typeFilter, setTypeFilter] = useState("All");
//   const [branchFilter, setBranchFilter] = useState("All");

//   const fetchAccounts = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(
//         "http://localhost:5003/cbs/customer/accounts",
//         { withCredentials: true }
//       );
//       if (res.data.status) {
//         setAccounts(res.data.data || []);
//       }
//     } catch (err) {
//       console.error("Error fetching accounts:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchBranches = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:5003/cbs/getbranch",
//         { withCredentials: true }
//       );
//       if (res.data.status) {
//         setBranches(res.data.data || []);
//       }
//     } catch (err) {
//       console.error("Error fetching branches:", err);
//     }
//   };

//   useEffect(() => {
//     fetchAccounts();
//     fetchBranches();
//   }, []);

//   // ========== ✅ STATS - SAB UNIQUE NAMES ==========
//   const totalAccounts = accounts.length;

//   const savingsAccounts = accounts.filter(
//     (a) => a.accountType?.toLowerCase() === "savings"
//   );

//   // ✅ FIXED: currentAccounts → currentTypeAccounts
//   const currentTypeAccounts = accounts.filter(
//     (a) => a.accountType?.toLowerCase() === "current"
//   );

//   const fdLoanAccounts = accounts.filter(
//     (a) => a.accountType?.toLowerCase() === "fd" || 
//            a.accountType?.toLowerCase() === "loan" ||
//            a.accountType?.toLowerCase() === "fixed deposit"
//   );

//   const branchWiseAccounts = branches.map((branch) => ({
//     name: branch.branchname,
//     code: branch.branchcode,
//     count: accounts.filter((a) => a.branchcode === branch.branchcode).length,
//     balance: accounts
//       .filter((a) => a.branchcode === branch.branchcode)
//       .reduce((sum, acc) => sum + (acc.balance || 0), 0),
//   }));

//   const totalBranchBalance = accounts.reduce(
//     (sum, acc) => sum + (acc.balance || 0),
//     0
//   );

//   const stats = [
//     {
//       title: "Total Accounts",
//       value: totalAccounts,
//       growth: `${branches.length} branches`,
//       icon: <BsWallet2 />,
//       bg: "#1D4ED8",
//       color: "#3B82F6",
//     },
//     {
//       title: "Savings Accounts",
//       value: savingsAccounts.length,
//       growth: "Savings account holders",
//       icon: <BsBank />,
//       bg: "#166534",
//       color: "#22C55E",
//     },
//     {
//       title: "Current Accounts",
//       // ✅ FIXED: currentAccounts → currentTypeAccounts
//       value: currentTypeAccounts.length,
//       growth: "Current account holders",
//       icon: <BsCreditCard2Front />,
//       bg: "#B45309",
//       color: "#F59E0B",
//     },
//     {
//       title: "FD / Loan Accounts",
//       value: fdLoanAccounts.length,
//       growth: "Fixed deposit holders",
//       icon: <BsFileEarmarkText />,
//       bg: "#6D28D9",
//       color: "#8B5CF6",
//     },
//   ];

//   const filteredAccounts = accounts.filter((account) => {
//     const search = searchTerm.toLowerCase();
//     const accNum = account.accountNumber?.toString().toLowerCase() || "";
//     const custName = account.customerId?.name?.toString().toLowerCase() || "";
//     const accType = account.accountType?.toString().toLowerCase() || "";

//     const matchesSearch =
//       accNum.includes(search) ||
//       custName.includes(search) ||
//       accType.includes(search);

//     const matchesType =
//       typeFilter === "All" ||
//       account.accountType?.toLowerCase() === typeFilter.toLowerCase();

//     const matchesBranch =
//       branchFilter === "All" || account.branchcode === branchFilter;

//     return matchesSearch && matchesType && matchesBranch;
//   });

//   // ========== ✅ FIXED: currentAccounts → paginatedAccounts ==========
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const paginatedAccounts = filteredAccounts.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);

//   return (
//     <div className="accounts-page">
//       <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
//         <div>
//           <h2 className="accounts-title">Accounts</h2>
//           <p className="accounts-breadcrumb">
//             <Link to="/admin" className="text-decoration-none">Dashboard</Link>
//             <span>›</span> Accounts
//           </p>
//         </div>
//       </div>

//       <div className="row g-4">
//         {stats.map((item, index) => (
//           <div className="col-xl-3 col-lg-6 col-md-6 col-12" key={index}>
//             <div className="account-stat-card">
//               <div
//                 className="account-icon"
//                 style={{
//                   background: `${item.color}20`,
//                   color: item.color,
//                 }}
//               >
//                 {item.icon}
//               </div>
//               <div className="account-content">
//                 <p className="account-label">{item.title}</p>
//                 <h3 className="account-value">{item.value.toLocaleString()}</h3>
//                 <div className="account-growth">
//                   <span>{item.growth}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="row mt-4 g-3">
//         <div className="col-12">
//           <div className="branch-wise-card">
//             <h6 className="mb-3">
//               <i className="bi bi-building me-2"></i>
//               Branch-wise Accounts
//             </h6>
//             <div className="d-flex flex-wrap gap-3">
//               <span className="branch-count-badge bg-primary">
//                 All: {totalAccounts} accounts
//               </span>
//               {branchWiseAccounts.map((branch, i) => (
//                 <span key={i} className="branch-count-badge bg-secondary">
//                   {branch.name}: {branch.count} accounts
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="row mt-3 g-3">
//         <div className="col-12">
//           <div className="branch-wise-card bg-success bg-opacity-10 border-success">
//             <h6 className="mb-0">
//               <i className="bi bi-cash-stack me-2 text-success"></i>
//               Total Bank Balance: <strong>₹{totalBranchBalance.toLocaleString()}</strong>
//             </h6>
//           </div>
//         </div>
//       </div>

//       <div className="d-flex flex-wrap gap-3 mt-4">
//         <div className="search-box">
//           <BsSearch className="search-icon" />
//           <input
//             type="text"
//             placeholder="Search by account number, customer name or type..."
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//               setCurrentPage(1);
//             }}
//             className="form-control form-control-sm"
//             style={{ width: "280px" }}
//           />
//         </div>

//         <select
//           className="form-select form-select-sm"
//           style={{ width: "150px" }}
//           value={typeFilter}
//           onChange={(e) => {
//             setTypeFilter(e.target.value);
//             setCurrentPage(1);
//           }}
//         >
//           <option value="All">All Types</option>
//           <option value="Savings">Savings</option>
//           <option value="Current">Current</option>
//           <option value="FD">FD / Loan</option>
//         </select>

//         <select
//           className="form-select form-select-sm"
//           style={{ width: "180px" }}
//           value={branchFilter}
//           onChange={(e) => {
//             setBranchFilter(e.target.value);
//             setCurrentPage(1);
//           }}
//         >
//           <option value="All">All Branches</option>
//           {branches.map((branch) => (
//             <option key={branch._id} value={branch.branchcode}>
//               {branch.branchname} ({branch.branchcode})
//             </option>
//           ))}
//         </select>

//         <button
//           className="btn btn-sm btn-outline-secondary"
//           onClick={() => {
//             setSearchTerm("");
//             setTypeFilter("All");
//             setBranchFilter("All");
//             setCurrentPage(1);
//           }}
//         >
//           <BsFilter className="me-1" /> Reset
//         </button>
//       </div>

//       <div className="mt-4">
//         <div className="table-responsive">
//           <table className="table table-hover">
//             <thead className="table-dark">
//               <tr>
//                 <th>S.No</th>
//                 <th>Account Number</th>
//                 <th>Customer Name</th>
//                 <th>Account Type</th>
//                 <th>Balance</th>
//                 <th>Branch</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="8" className="text-center py-4">
//                     <div className="spinner-border text-primary" role="status">
//                       <span className="visually-hidden">Loading...</span>
//                     </div>
//                   </td>
//                 </tr>
//               ) : paginatedAccounts.length === 0 ? (
//                 <tr>
//                   <td colSpan="8" className="text-center py-4 text-muted">
//                     <i className="bi bi-inbox fs-2 d-block mb-2"></i>
//                     No accounts found
//                   </td>
//                 </tr>
//               ) : (
//                 paginatedAccounts.map((account, index) => (
//                   <tr key={account._id}>
//                     <td>{indexOfFirstItem + index + 1}</td>
//                     <td>
//                       <code className="account-number">
//                         {account.accountNumber}
//                       </code>
//                     </td>
//                     <td>
//                       <strong>{account.customerId?.name || account.customerName || "N/A"}</strong>
//                     </td>
//                     <td>
//                       <span
//                         className={`badge ${
//                           account.accountType?.toLowerCase() === "savings"
//                             ? "bg-success"
//                             : account.accountType?.toLowerCase() === "current"
//                             ? "bg-warning text-dark"
//                             : "bg-info"
//                         }`}
//                       >
//                         {account.accountType || "N/A"}
//                       </span>
//                     </td>
//                     <td>
//                       <strong>₹{account.balance?.toLocaleString() || 0}</strong>
//                     </td>
//                     <td>
//                       <span className="badge bg-secondary">
//                         {account.branchname || account.branchcode || "N/A"}
//                       </span>
//                     </td>
//                     <td>
//                       <span
//                         className={`badge ${
//                           account.status === "inactive" || account.status === "Inactive"
//                             ? "bg-danger"
//                             : "bg-success"
//                         }`}
//                       >
//                         {account.status || "Active"}
//                       </span>
//                     </td>
//                     <td>
//                       <div className="d-flex gap-2">
//                         <button className="btn btn-sm btn-outline-primary" title="View">
//                           <BsEye />
//                         </button>
//                         <button className="btn btn-sm btn-outline-warning" title="Edit">
//                           <BsPencil />
//                         </button>
//                         <button className="btn btn-sm btn-outline-danger" title="Delete">
//                           <BsTrash />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {filteredAccounts.length > itemsPerPage && (
//           <div className="d-flex justify-content-between align-items-center mt-3">
//             <span className="text-muted small">
//               Showing {indexOfFirstItem + 1} to{" "}
//               {Math.min(indexOfLastItem, filteredAccounts.length)} of{" "}
//               {filteredAccounts.length} accounts
//             </span>
//             <nav>
//               <ul className="pagination pagination-sm mb-0">
//                 <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
//                   <button
//                     className="page-link"
//                     onClick={() => setCurrentPage(currentPage - 1)}
//                   >
//                     <BsChevronLeft /> Previous
//                   </button>
//                 </li>
//                 {[...Array(totalPages)].map((_, i) => (
//                   <li
//                     key={i}
//                     className={`page-item ${
//                       currentPage === i + 1 ? "active" : ""
//                     }`}
//                   >
//                     <button
//                       className="page-link"
//                       onClick={() => setCurrentPage(i + 1)}
//                     >
//                       {i + 1}
//                     </button>
//                   </li>
//                 ))}
//                 <li
//                   className={`page-item ${
//                     currentPage === totalPages ? "disabled" : ""
//                   }`}
//                 >
//                   <button
//                     className="page-link"
//                     onClick={() => setCurrentPage(currentPage + 1)}
//                   >
//                     Next <BsChevronRight />
//                   </button>
//                 </li>
//               </ul>
//             </nav>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Accounts.css";

export default function ManagerAccounts() {
  const { branchcode } = useParams();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [accountType, setAccountType] = useState("Savings");
  const [openingBalance, setOpeningBalance] = useState(1000);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // ✅ Customer Form State
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [customerForm, setCustomerForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    aadhar: "",
    pan: ""
  });

  // 🔍 Search Customer
  const handleSearch = async () => {
    if (search.length < 2) {
      setResults([]);
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:5003/cbs/customer/search?search=${search}`,
        { withCredentials: true }
      );
      setResults(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch();
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // 📋 Fetch Accounts
  const fetchAccounts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5003/cbs/customer/accounts",
        { withCredentials: true }
      );
      setAccounts(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  // ✅ ADD CUSTOMER
  const handleAddCustomer = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5003/cbs/customer/add",
        customerForm,
        { withCredentials: true }
      );

      alert("✅ Customer added successfully!");
      setShowCustomerForm(false);
      setCustomerForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        aadhar: "",
        pan: ""
      });
      
      // Refresh search results
      if (search.length >= 2) {
        handleSearch();
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add customer");
    } finally {
      setLoading(false);
    }
  };

  // 💳 Open Account
  const handleOpenAccount = async () => {
    if (!selectedCustomer) return alert("Please select customer");

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5003/cbs/customer/openaccount",
        {
          customerId: selectedCustomer._id,
          accountType,
          openingBalance: Number(openingBalance),
        },
        { withCredentials: true }
      );

      alert(`✅ Account Created Successfully!\nAccount No: ${res.data.data.accountNumber}`);

      setSelectedCustomer(null);
      setSearch("");
      setResults([]);
      setOpeningBalance(1000);
      fetchAccounts();

    } catch (err) {
      alert(err.response?.data?.message || "Failed to open account");
    } finally {
      setLoading(false);
    }
  };

  // Branch-wise accounts
  const branchAccounts = accounts.filter((a) => a.branchcode === branchcode);

  return (
    <div className="manager-accounts-page">
      <div className="accounts-page-header">
        <div>
          <span className="accounts-eyebrow">
            <i className="bi bi-wallet2"></i>
            Account Management
          </span>
          <h1>Accounts</h1>
          <p>Search customers, add new customers and open accounts</p>
        </div>
        <div className="accounts-count-card">
          <div className="accounts-count-icon">
            <i className="bi bi-bank2"></i>
          </div>
          <div>
            <span>Branch Accounts</span>
            <strong>{branchAccounts.length}</strong>
          </div>
        </div>
      </div>

      {/* ===== SEARCH + ADD CUSTOMER ===== */}
      <div className="accounts-panel">
        <div className="accounts-panel-header">
          <div className="accounts-section-title">
            <div className="accounts-section-icon accounts-icon-blue">
              <i className="bi bi-search"></i>
            </div>
            <div>
              <h3>Search Customer</h3>
              <p>Find a customer by name, email or Aadhar number</p>
            </div>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setShowCustomerForm(!showCustomerForm)}
          >
            <i className="bi bi-person-plus-fill"></i>
            {showCustomerForm ? "Close" : "Add Customer"}
          </button>
        </div>

        <div className="accounts-search-area">
          <div className="accounts-search-wrapper">
            <i className="bi bi-search"></i>
            <input
              type="text"
              className="accounts-search-input"
              placeholder="Search by Name, Email or Aadhar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                type="button"
                className="accounts-search-clear"
                onClick={() => {
                  setSearch("");
                  setResults([]);
                }}
              >
                <i className="bi bi-x"></i>
              </button>
            )}
          </div>

          {/* ✅ ADD CUSTOMER FORM */}
          {showCustomerForm && (
            <div className="add-customer-form">
              <h5><i className="bi bi-person-plus-fill"></i> Add New Customer</h5>
              <div className="row g-2">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name *"
                    value={customerForm.name}
                    onChange={(e) => setCustomerForm({ ...customerForm, name: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email *"
                    value={customerForm.email}
                    onChange={(e) => setCustomerForm({ ...customerForm, email: e.target.value })}
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone *"
                    value={customerForm.phone}
                    onChange={(e) => setCustomerForm({ ...customerForm, phone: e.target.value })}
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Aadhar"
                    value={customerForm.aadhar}
                    onChange={(e) => setCustomerForm({ ...customerForm, aadhar: e.target.value })}
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="PAN"
                    value={customerForm.pan}
                    onChange={(e) => setCustomerForm({ ...customerForm, pan: e.target.value })}
                  />
                </div>
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Address"
                    value={customerForm.address}
                    onChange={(e) => setCustomerForm({ ...customerForm, address: e.target.value })}
                  />
                </div>
                <div className="col-12">
                  <button
                    className="btn btn-success w-100"
                    onClick={handleAddCustomer}
                    disabled={loading}
                  >
                    {loading ? "Adding..." : "Add Customer"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Search Results */}
          {results.length > 0 && (
            <div className="accounts-search-results">
              <div className="accounts-results-header">
                <span>Search Results</span>
                <small>{results.length} found</small>
              </div>
              {results.map((customer) => (
                <div
                  key={customer._id}
                  className="accounts-result-item"
                  onClick={() => {
                    setSelectedCustomer(customer);
                    setResults([]);
                    setSearch(customer.name);
                  }}
                >
                  <div className="accounts-result-avatar">
                    <i className="bi bi-person-fill"></i>
                  </div>
                  <div className="accounts-result-info">
                    <strong>{customer.name}</strong>
                    <div>
                      <span><i className="bi bi-envelope"></i>{customer.email}</span>
                      <span><i className="bi bi-person-vcard"></i>{customer.aadhar || customer.aadhaar}</span>
                    </div>
                  </div>
                  <i className="bi bi-chevron-right accounts-result-arrow"></i>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ===== SELECTED CUSTOMER ===== */}
      {selectedCustomer && (
        <div className="accounts-panel selected-customer-panel">
          <div className="accounts-panel-header">
            <div className="accounts-section-title">
              <div className="accounts-section-icon accounts-icon-green">
                <i className="bi bi-person-check-fill"></i>
              </div>
              <div>
                <h3>Selected Customer</h3>
                <p>Confirm customer details before opening the account</p>
              </div>
            </div>
            <span className="selected-status">
              <i className="bi bi-check-circle-fill"></i> Selected
            </span>
          </div>

          <div className="selected-customer-info">
            <div className="selected-customer-profile">
              <div className="selected-customer-avatar">
                <i className="bi bi-person-fill"></i>
              </div>
              <div>
                <h4>{selectedCustomer.name}</h4>
                <span>Customer</span>
              </div>
            </div>
            <div className="selected-customer-details">
              <div className="customer-detail-item">
                <span><i className="bi bi-envelope"></i> Email</span>
                <strong>{selectedCustomer.email}</strong>
              </div>
              <div className="customer-detail-item">
                <span><i className="bi bi-person-vcard"></i> Aadhar</span>
                <strong>{selectedCustomer.aadhar || selectedCustomer.aadhaar}</strong>
              </div>
              <div className="customer-detail-item">
                <span><i className="bi bi-building"></i> Branch</span>
                <strong>{selectedCustomer.branchname}</strong>
              </div>
            </div>
          </div>

          {/* Account Form */}
          <div className="open-account-form">
            <div className="account-form-group">
              <label>Account Type</label>
              <div className="account-input-wrapper">
                <i className="bi bi-wallet2"></i>
                <select
                  className="account-form-input"
                  value={accountType}
                  onChange={(e) => setAccountType(e.target.value)}
                >
                  <option value="Savings">Savings</option>
                  <option value="Current">Current</option>
                </select>
              </div>
            </div>
            <div className="account-form-group">
              <label>Opening Balance</label>
              <div className="account-input-wrapper">
                <i className="bi bi-currency-rupee"></i>
                <input
                  type="number"
                  className="account-form-input"
                  value={openingBalance}
                  onChange={(e) => setOpeningBalance(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="open-account-footer">
            <div className="account-security-note">
              <i className="bi bi-shield-check"></i>
              <span>Account creation is securely processed</span>
            </div>
            <button
              className="open-account-btn"
              onClick={handleOpenAccount}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status"></span>
                  Opening...
                </>
              ) : (
                <>
                  <i className="bi bi-wallet-fill"></i>
                  Open Account
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ===== ACCOUNTS LIST ===== */}
      <div className="accounts-panel accounts-list-panel">
        <div className="accounts-panel-header">
          <div className="accounts-section-title">
            <div className="accounts-section-icon accounts-icon-purple">
              <i className="bi bi-list-ul"></i>
            </div>
            <div>
              <h3>Branch Accounts</h3>
              <p>View all accounts registered under this branch</p>
            </div>
          </div>
          <div className="accounts-total-badge">
            <span>Total</span>
            <strong>{branchAccounts.length}</strong>
          </div>
        </div>

        <div className="accounts-table-wrapper">
          <table className="accounts-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Account Number</th>
                <th>Type</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {branchAccounts.length === 0 ? (
                <tr>
                  <td colSpan="4" className="accounts-empty">
                    <div className="accounts-empty-icon">
                      <i className="bi bi-wallet2"></i>
                    </div>
                    <strong>No accounts found</strong>
                    <span>Accounts created for this branch will appear here</span>
                  </td>
                </tr>
              ) : (
                branchAccounts.map((acc) => (
                  <tr key={acc._id}>
                    <td>
                      <div className="account-customer-cell">
                        <div className="account-customer-avatar">
                          <i className="bi bi-person-fill"></i>
                        </div>
                        <div>
                          <strong>{acc.customerId?.name || acc.customerName || "-"}</strong>
                          <small>Account Holder</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="account-number-cell">
                        <i className="bi bi-credit-card-2-front"></i>
                        <code>{acc.accountNumber}</code>
                      </div>
                    </td>
                    <td>
                      <span className={`account-type-badge ${acc.accountType === "Savings" ? "account-type-savings" : "account-type-current"}`}>
                        <i className={acc.accountType === "Savings" ? "bi bi-piggy-bank" : "bi bi-building"}></i>
                        {acc.accountType}
                      </span>
                    </td>
                    <td>
                      <strong className="account-balance">₹{acc.balance?.toLocaleString() || 0}</strong>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}