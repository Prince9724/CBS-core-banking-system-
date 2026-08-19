import { useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

export default function Deposit() {
  const { branchcode } = useParams();

  const [search, setSearch] = useState("");
  const [account, setAccount] = useState(null);
  const [amount, setAmount] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const handleSearch = async () => {
    if (!search) {
      return alert("Please enter account number or Aadhar");
    }

    try {
      setSearchLoading(true);
      const res = await axios.get(
        `http://localhost:5003/cbs/customer/account-search?search=${search}`,
        { withCredentials: true }
      );

      setAccount(res.data.data);
      setPassword(""); // Reset password on new search
    } catch (err) {
      alert(err.response?.data?.message || "Account not found");
      setAccount(null);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleDeposit = async () => {
    if (!amount || Number(amount) <= 0) {
      return alert("Enter valid amount");
    }

    // ✅ If account has password, validate
    if (account?.hasPassword && !password) {
      return alert("Account password is required for this account");
    }

    try {
      setLoading(true);
      await axios.post(
        "http://localhost:5003/cbs/customer/deposit",
        {
          accountNumber: account.accountNumber,
          amount: Number(amount),
          password: account?.hasPassword ? password : null,
        },
        { withCredentials: true }
      );

      alert("✅ Deposit successful");
      handleSearch();
      setAmount("");
      setPassword("");
    } catch (err) {
      alert(err.response?.data?.message || "Deposit failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid px-4 py-4 bg-dark min-vh-100">

      {/* ===== BACK BUTTON + HEADER ===== */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <Link to={`/teller/${branchcode}`} className="btn btn-outline-light d-flex align-items-center gap-2">
          <i className="bi bi-arrow-left"></i> Back to Dashboard
        </Link>
        <div className="vr text-secondary"></div>
        <div>
          <span className="badge bg-success bg-opacity-10 text-success mb-1">
            <i className="bi bi-cash-stack me-1"></i> Teller Operations
          </span>
          <h1 className="text-white fw-bold mb-0">Cash Deposit</h1>
        </div>
      </div>

      {/* ===== BRANCH INFO ===== */}
      <div className="d-flex justify-content-end mb-4">
        <div className="d-flex align-items-center gap-2 bg-dark bg-opacity-50 border border-secondary px-3 py-2 rounded-3">
          <i className="bi bi-bank text-success"></i>
          <div>
            <small className="text-secondary d-block lh-1">Branch</small>
            <strong className="text-white">{branchcode}</strong>
          </div>
        </div>
      </div>

      {/* ===== SEARCH CARD ===== */}
      <div className="card bg-dark border-secondary mb-4">
        <div className="card-body">
          <div className="d-flex align-items-center gap-3 mb-3">
            <div className="bg-primary bg-opacity-10 rounded-3 p-3">
              <i className="bi bi-search fs-4 text-primary"></i>
            </div>
            <div>
              <h5 className="text-white mb-0">Find Customer Account</h5>
              <p className="text-secondary mb-0 small">Search using account number or Aadhar number</p>
            </div>
          </div>

          <div className="d-flex gap-3 flex-wrap">
            <div className="flex-grow-1 position-relative">
              <i className="bi bi-search position-absolute text-secondary" style={{ left: "14px", top: "12px" }}></i>
              <input
                type="text"
                className="form-control bg-dark text-white border-secondary ps-5"
                placeholder="Enter Account Number or Aadhar Number"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <button
              className="btn btn-primary d-flex align-items-center gap-2"
              onClick={handleSearch}
              disabled={searchLoading}
            >
              {searchLoading ? (
                <><span className="spinner-border spinner-border-sm" role="status"></span> Searching...</>
              ) : (
                <><i className="bi bi-search"></i> Search Account</>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ===== ACCOUNT DETAILS ===== */}
      {account && (
        <div className="row g-4 mb-4">
          <div className="col-md-8">
            <div className="card bg-dark border-secondary h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-success bg-opacity-10 rounded-3 p-3">
                      <i className="bi bi-person-fill fs-3 text-success"></i>
                    </div>
                    <div>
                      <span className="text-secondary small">Customer Account</span>
                      <h4 className="text-white mb-0">{account.customer.name}</h4>
                    </div>
                  </div>
                  <span className="badge bg-success d-flex align-items-center gap-1">
                    <span className="bg-success rounded-circle d-inline-block" style={{ width: "6px", height: "6px" }}></span>
                    Active
                  </span>
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="bg-dark bg-opacity-50 rounded-3 p-3 border border-secondary">
                      <span className="text-secondary small d-block">
                        <i className="bi bi-person-vcard me-1"></i> Aadhar Number
                      </span>
                      <strong className="text-white">{account.customer.aadhar}</strong>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="bg-dark bg-opacity-50 rounded-3 p-3 border border-secondary">
                      <span className="text-secondary small d-block">
                        <i className="bi bi-credit-card me-1"></i> Account Number
                      </span>
                      <strong className="text-white">{account.accountNumber}</strong>
                    </div>
                  </div>
                </div>

                {/* ✅ Password Required Status */}
                <div className="mt-3">
                  <span className={`badge ${account.hasPassword ? "bg-warning" : "bg-secondary"}`}>
                    {account.hasPassword ? "🔒 Password Protected" : "No Password Set"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card bg-dark border-secondary h-100">
              <div className="card-body d-flex align-items-center gap-3">
                <div className="bg-success bg-opacity-10 rounded-3 p-3">
                  <i className="bi bi-wallet2 fs-2 text-success"></i>
                </div>
                <div>
                  <span className="text-secondary small">Current Balance</span>
                  <h3 className="text-white fw-bold mb-0">₹{account.balance.toLocaleString()}</h3>
                  <small className="text-secondary">Available Balance</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== DEPOSIT FORM ===== */}
      {account && (
        <div className="card bg-dark border-secondary">
          <div className="card-body">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="bg-success bg-opacity-10 rounded-3 p-3">
                <i className="bi bi-arrow-down-left fs-4 text-success"></i>
              </div>
              <div>
                <h5 className="text-white mb-0">Deposit Amount</h5>
                <p className="text-secondary mb-0 small">Enter the amount you want to deposit into this account</p>
              </div>
            </div>

            {/* ✅ Password Field - Only if account has password */}
            {account?.hasPassword && (
              <div className="mb-3">
                <label className="text-secondary small mb-1 d-block">
                  <i className="bi bi-lock me-1"></i>
                  Account Password <span className="text-danger">*</span>
                </label>
                <div className="d-flex gap-2">
                  <div className="position-relative flex-grow-1">
                    <i className="bi bi-key position-absolute text-secondary" style={{ left: "14px", top: "12px" }}></i>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control bg-dark text-white border-secondary ps-5"
                      placeholder="Enter account password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                  </button>
                </div>
              </div>
            )}

            <div className="d-flex gap-3 flex-wrap align-items-end">
              <div className="flex-grow-1">
                <label className="text-secondary small mb-1 d-block">Amount (₹)</label>
                <div className="position-relative">
                  <span className="position-absolute text-secondary" style={{ left: "14px", top: "12px" }}>₹</span>
                  <input
                    type="number"
                    className="form-control bg-dark text-white border-secondary ps-5"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
              <button
                className="btn btn-success d-flex align-items-center gap-2 px-4"
                onClick={handleDeposit}
                disabled={loading}
              >
                {loading ? (
                  <><span className="spinner-border spinner-border-sm" role="status"></span> Processing...</>
                ) : (
                  <><i className="bi bi-check-circle"></i> Deposit Now</>
                )}
              </button>
            </div>

            <div className="mt-3 d-flex align-items-center gap-2 text-secondary small bg-dark bg-opacity-50 rounded-3 p-2 border border-secondary">
              <i className="bi bi-shield-check text-success"></i>
              <span>Please verify the customer account before confirming the deposit.</span>
            </div>
          </div>
        </div>
      )}

      {/* ===== NO ACCOUNT FOUND ===== */}
      {!account && search && !searchLoading && (
        <div className="card bg-dark border-secondary">
          <div className="card-body text-center py-5">
            <i className="bi bi-inbox fs-1 text-secondary d-block mb-3"></i>
            <h5 className="text-secondary">No account found</h5>
            <p className="text-secondary small">Try searching with a different account number or Aadhar</p>
          </div>
        </div>
      )}

      {/* ===== CUSTOM CSS ===== */}
      <style>{`
        .form-control:focus { border-color: #0d6efd; box-shadow: 0 0 0 0.25rem rgba(13,110,253,0.25); }
        .bg-dark.bg-opacity-50 { background-color: rgba(33,37,41,0.5); }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type="number"] { -moz-appearance: textfield; }
      `}</style>

    </div>
  );
}