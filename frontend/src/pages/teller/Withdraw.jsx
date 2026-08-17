import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Withdraw.css";

export default function Withdraw() {
  const { branchcode } = useParams();

  const [search, setSearch] = useState("");
  const [account, setAccount] = useState(null);
  const [amount, setAmount] = useState("");

  // Search account
  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5003/cbs/customer/account-search?search=${search}`,
        { withCredentials: true },
      );

      setAccount(res.data.data);
    } catch (err) {
      alert(err.response?.data?.message || "Account not found");
      setAccount(null);
    }
  };

  // Withdraw
  const handleWithdraw = async () => {
    if (!amount || Number(amount) <= 0) {
      return alert("Enter valid amount");
    }

    try {
      await axios.post(
        "http://localhost:5003/cbs/customer/withdraw",
        {
          accountNumber: account.accountNumber,
          amount: Number(amount),
        },
        { withCredentials: true },
      );

      alert("Withdrawal successful");

      // updated balance refresh
      handleSearch();
      setAmount("");
    } catch (err) {
      alert(err.response?.data?.message || "Withdrawal failed");
    }
  };

  return (
    <div className="teller-withdraw-page">
      {/* ================= HEADER ================= */}

      <div className="teller-withdraw-header">
        <div>
          <span className="teller-withdraw-eyebrow">
            <i className="bi bi-wallet2"></i>
            Teller Operations
          </span>

          <h1>Cash Withdrawal</h1>

          <p>Search for a customer account and process a cash withdrawal.</p>
        </div>

        <div className="teller-withdraw-branch">
          <div className="teller-withdraw-branch-icon">
            <i className="bi bi-bank"></i>
          </div>

          <div>
            <span>Branch Code</span>
            <strong>{branchcode}</strong>
          </div>
        </div>
      </div>

      {/* ================= SEARCH CARD ================= */}

      <div className="teller-withdraw-card">
        <div className="teller-withdraw-section-header">
          <div className="teller-withdraw-title">
            <div className="teller-withdraw-title-icon teller-w-blue">
              <i className="bi bi-search"></i>
            </div>

            <div>
              <h3>Find Customer Account</h3>

              <p>Search using account number or Aadhar number.</p>
            </div>
          </div>
        </div>

        <div className="teller-withdraw-search">
          <div className="teller-withdraw-input">
            <i className="bi bi-search"></i>

            <input
              type="text"
              placeholder="Enter Account Number or Aadhar Number"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button className="teller-withdraw-search-btn" onClick={handleSearch}>
            <i className="bi bi-search"></i>
            Search Account
          </button>
        </div>
      </div>

      {/* ================= ACCOUNT DETAILS ================= */}

      {account && (
        <div className="teller-withdraw-account-section">
          {/* CUSTOMER */}

          <div className="teller-withdraw-account-card">
            <div className="teller-withdraw-account-header">
              <div className="teller-withdraw-account-title">
                <div className="teller-withdraw-avatar">
                  <i className="bi bi-person-fill"></i>
                </div>

                <div>
                  <span>Customer Account</span>

                  <h3>{account.customer.name}</h3>
                </div>
              </div>

              <span className="teller-withdraw-status">
                <span></span>
                Active
              </span>
            </div>

            <div className="teller-withdraw-customer-info">
              <div className="teller-withdraw-detail">
                <span>
                  <i className="bi bi-person-vcard"></i>
                  Aadhar Number
                </span>

                <strong>{account.customer.aadhar}</strong>
              </div>

              <div className="teller-withdraw-detail">
                <span>
                  <i className="bi bi-credit-card"></i>
                  Account Number
                </span>

                <strong>{account.accountNumber}</strong>
              </div>
            </div>
          </div>

          {/* BALANCE */}

          <div className="teller-withdraw-balance-card">
            <div className="teller-withdraw-balance-icon">
              <i className="bi bi-wallet2"></i>
            </div>

            <div>
              <span>Current Balance</span>

              <strong>₹{account.balance}</strong>

              <small>Available Balance</small>
            </div>
          </div>
        </div>
      )}

      {/* ================= WITHDRAW FORM ================= */}

      {account && (
        <div className="teller-withdraw-card teller-withdraw-form-card">
          <div className="teller-withdraw-section-header">
            <div className="teller-withdraw-title">
              <div className="teller-withdraw-title-icon teller-w-orange">
                <i className="bi bi-arrow-up-right"></i>
              </div>

              <div>
                <h3>Withdraw Amount</h3>

                <p>Enter the amount to withdraw from this account.</p>
              </div>
            </div>
          </div>

          <div className="teller-withdraw-amount-row">
            <div className="teller-withdraw-amount-input">
              <span>₹</span>

              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <button
              className="teller-withdraw-submit-btn"
              onClick={handleWithdraw}
            >
              <i className="bi bi-check-circle"></i>
              Withdraw Now
            </button>
          </div>

          {/* INFO */}

          <div className="teller-withdraw-note">
            <i className="bi bi-info-circle"></i>

            <span>
              After the withdrawal, the updated account balance will
              automatically refresh.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
