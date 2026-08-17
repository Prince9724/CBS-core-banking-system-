import { useState } from "react";
import axios from "axios";
import "./TellerTransaction.css";

export default function TellerTransaction() {
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
    await axios.post(
      "http://localhost:5003/cbs/customer/deposite",
      {
        accountNumber: account.accountNumber,
        amount: Number(amount),
      },
      { withCredentials: true },
    );

    alert("Deposit successful");
    handleSearch();
    setAmount("");
  };

  const handleWithdraw = async () => {
    await axios.post(
      "http://localhost:5003/cbs/customer/withdraw",
      {
        accountNumber: account.accountNumber,
        amount: Number(amount),
      },
      { withCredentials: true },
    );

    alert("Withdrawal successful");
    handleSearch();
    setAmount("");
  };

  return (
    <div className="teller-transaction-page">
      {/* ================= HEADER ================= */}

      <div className="teller-transaction-header">
        <div>
          <span className="teller-transaction-eyebrow">
            <i className="bi bi-lightning-charge-fill"></i>
            Teller Operations
          </span>

          <h1>Quick Transaction</h1>

          <p>
            Search a customer account and perform a quick deposit or withdrawal.
          </p>
        </div>
      </div>

      {/* ================= SEARCH CARD ================= */}

      <div className="teller-transaction-card">
        <div className="teller-transaction-section-header">
          <div className="teller-transaction-title">
            <div className="teller-transaction-title-icon teller-t-blue">
              <i className="bi bi-search"></i>
            </div>

            <div>
              <h3>Find Customer Account</h3>

              <p>Search using account number or Aadhar number.</p>
            </div>
          </div>
        </div>

        <div className="teller-transaction-search">
          <div className="teller-transaction-input">
            <i className="bi bi-search"></i>

            <input
              type="text"
              placeholder="Account Number or Aadhar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            className="teller-transaction-search-btn"
            onClick={handleSearch}
          >
            <i className="bi bi-search"></i>
            Search Account
          </button>
        </div>
      </div>

      {/* ================= ACCOUNT ================= */}

      {account && (
        <div className="teller-transaction-content">
          {/* CUSTOMER DETAILS */}

          <div className="teller-transaction-customer-card">
            <div className="teller-transaction-customer-header">
              <div className="teller-transaction-customer-title">
                <div className="teller-transaction-avatar">
                  <i className="bi bi-person-fill"></i>
                </div>

                <div>
                  <span>Customer Account</span>

                  <h3>{account.customer.name}</h3>
                </div>
              </div>

              <span className="teller-transaction-status">
                <span></span>
                Active
              </span>
            </div>

            <div className="teller-transaction-details">
              <div className="teller-transaction-detail">
                <span>
                  <i className="bi bi-credit-card"></i>
                  Account Number
                </span>

                <strong>{account.accountNumber}</strong>
              </div>

              <div className="teller-transaction-detail">
                <span>
                  <i className="bi bi-person-vcard"></i>
                  Aadhar Number
                </span>

                <strong>{account.customer.aadhar}</strong>
              </div>
            </div>
          </div>

          {/* ================= BALANCE ================= */}

          <div className="teller-transaction-balance">
            <div className="teller-transaction-balance-icon">
              <i className="bi bi-wallet2"></i>
            </div>

            <div>
              <span>Current Balance</span>

              <strong>₹{account.balance}</strong>
            </div>
          </div>

          {/* ================= AMOUNT ================= */}

          <div className="teller-transaction-card teller-transaction-action-card">
            <div className="teller-transaction-section-header">
              <div className="teller-transaction-title">
                <div className="teller-transaction-title-icon teller-t-green">
                  <i className="bi bi-cash-stack"></i>
                </div>

                <div>
                  <h3>Transaction Amount</h3>

                  <p>Enter the amount and select the required operation.</p>
                </div>
              </div>
            </div>

            <div className="teller-transaction-action-body">
              <div className="teller-transaction-amount">
                <span>₹</span>

                <input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="teller-transaction-buttons">
                <button className="teller-deposit-btn" onClick={handleDeposit}>
                  <i className="bi bi-arrow-down-left"></i>
                  Deposit
                </button>

                <button
                  className="teller-withdraw-btn"
                  onClick={handleWithdraw}
                >
                  <i className="bi bi-arrow-up-right"></i>
                  Withdraw
                </button>
              </div>
            </div>

            <div className="teller-transaction-note">
              <i className="bi bi-shield-check"></i>

              <span>
                Verify the account details and transaction amount before
                processing.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
