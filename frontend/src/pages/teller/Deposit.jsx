import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Deposit.css";

export default function Deposit() {
  const { branchcode } = useParams();

  const [search, setSearch] = useState("");
  const [account, setAccount] = useState(null);
  const [amount, setAmount] = useState("");

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5003/cbs/customer/account-search?search=${search}`,
        { withCredentials: true },
      );

      setAccount(res.data.data);
    } catch (err) {
      alert("Account not found");
      setAccount(null);
    }
  };

  const handleDeposit = async () => {
    try {
      await axios.post(
        "http://localhost:5003/cbs/customer/deposit",
        {
          accountNumber: account.accountNumber,
          amount: Number(amount),
        },
        { withCredentials: true },
      );

      alert("Deposit successful");

      // balance refresh
      handleSearch();
      setAmount("");
    } catch (err) {
      alert(err.response?.data?.message || "Deposit failed");
    }
  };

  return (
    <div className="teller-deposit-page">
      {/* ================= HEADER ================= */}

      <div className="teller-deposit-header">
        <div>
          <span className="teller-deposit-eyebrow">
            <i className="bi bi-cash-stack"></i>
            Teller Operations
          </span>

          <h1>Cash Deposit</h1>

          <p>Search for a customer account and deposit cash securely.</p>
        </div>

        <div className="teller-deposit-branch">
          <div className="teller-deposit-branch-icon">
            <i className="bi bi-bank"></i>
          </div>

          <div>
            <span>Branch Code</span>
            <strong>{branchcode}</strong>
          </div>
        </div>
      </div>

      {/* ================= SEARCH CARD ================= */}

      <div className="teller-deposit-card">
        <div className="teller-deposit-section-header">
          <div className="teller-deposit-title">
            <div className="teller-deposit-title-icon teller-blue">
              <i className="bi bi-search"></i>
            </div>

            <div>
              <h3>Find Customer Account</h3>

              <p>Search using account number or Aadhar number.</p>
            </div>
          </div>
        </div>

        <div className="teller-deposit-search">
          <div className="teller-deposit-input">
            <i className="bi bi-search"></i>

            <input
              type="text"
              placeholder="Enter Account Number or Aadhar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button className="teller-deposit-search-btn" onClick={handleSearch}>
            <i className="bi bi-search"></i>
            Search Account
          </button>
        </div>
      </div>

      {/* ================= ACCOUNT DETAILS ================= */}

      {account && (
        <div className="teller-account-section">
          <div className="teller-account-card">
            <div className="teller-account-header">
              <div className="teller-account-title">
                <div className="teller-account-avatar">
                  <i className="bi bi-person-fill"></i>
                </div>

                <div>
                  <span>Customer Account</span>

                  <h3>{account.customer.name}</h3>
                </div>
              </div>

              <span className="teller-account-status">
                <span></span>
                Active
              </span>
            </div>

            {/* CUSTOMER INFORMATION */}

            <div className="teller-customer-info">
              <div className="teller-detail-item">
                <span>
                  <i className="bi bi-person-vcard"></i>
                  Aadhar Number
                </span>

                <strong>{account.customer.aadhar}</strong>
              </div>

              <div className="teller-detail-item">
                <span>
                  <i className="bi bi-credit-card"></i>
                  Account Number
                </span>

                <strong>{account.accountNumber}</strong>
              </div>
            </div>
          </div>

          {/* ================= BALANCE ================= */}

          <div className="teller-balance-card">
            <div className="teller-balance-icon">
              <i className="bi bi-wallet2"></i>
            </div>

            <div>
              <span>Current Balance</span>

              <strong>₹{account.balance}</strong>
            </div>
          </div>
        </div>
      )}

      {/* ================= DEPOSIT FORM ================= */}

      {account && (
        <div className="teller-deposit-card teller-deposit-form-card">
          <div className="teller-deposit-section-header">
            <div className="teller-deposit-title">
              <div className="teller-deposit-title-icon teller-green">
                <i className="bi bi-arrow-down-left"></i>
              </div>

              <div>
                <h3>Deposit Amount</h3>

                <p>Enter the amount you want to deposit into this account.</p>
              </div>
            </div>
          </div>

          <div className="teller-deposit-amount-row">
            <div className="teller-deposit-amount-input">
              <span>₹</span>

              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <button
              className="teller-deposit-submit-btn"
              onClick={handleDeposit}
            >
              <i className="bi bi-check-circle"></i>
              Deposit Now
            </button>
          </div>

          <div className="teller-secure-note">
            <i className="bi bi-shield-check"></i>

            <span>
              Please verify the customer account before confirming the deposit.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
