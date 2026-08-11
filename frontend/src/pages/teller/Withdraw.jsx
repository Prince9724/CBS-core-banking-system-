import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
        { withCredentials: true }
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
        { withCredentials: true }
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
    <div className="container py-4 text-white">
      <h2 className="mb-4 fw-bold">🏧 Withdraw - {branchcode}</h2>

      <div className="card bg-dark border-secondary shadow p-4">
        {/* Search */}
        <div className="row g-3 align-items-center">
          <div className="col-md-8">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Account Number or Aadhar Number"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-md-4 d-grid">
            <button className="btn btn-primary btn-lg" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>

        {/* Account Details */}
        {account && (
          <div className="mt-4">
            <div className="row g-4">
              <div className="col-md-6">
                <div className="bg-secondary bg-opacity-25 rounded p-3 h-100">
                  <h5 className="fw-bold mb-3">👤 Customer Details</h5>

                  <p className="mb-2">
                    <b>Name:</b> {account.customer.name}
                  </p>

                  <p className="mb-2">
                    <b>Aadhar:</b> {account.customer.aadhar}
                  </p>

                  <p className="mb-0">
                    <b>Account:</b> {account.accountNumber}
                  </p>
                </div>
              </div>

              <div className="col-md-6">
                <div className="bg-success bg-opacity-25 rounded p-3 h-100 border border-success-subtle">
                  <h5 className="fw-bold mb-3 text-success">💳 Current Balance</h5>

                  <div className="display-6 fw-bold text-success">
                    ₹{account.balance}
                  </div>

                  <small className="text-light">Available Balance</small>
                </div>
              </div>
            </div>

            {/* Withdraw Section */}
            <div className="bg-secondary bg-opacity-25 rounded p-4 mt-4">
              <h5 className="fw-bold mb-3">💸 Withdraw Amount</h5>

              <div className="row g-3 align-items-center">
                <div className="col-md-8">
                  <input
                    type="number"
                    className="form-control form-control-lg"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                <div className="col-md-4 d-grid">
                  <button
                    className="btn btn-warning btn-lg fw-bold"
                    onClick={handleWithdraw}
                  >
                    🏧 Withdraw Now
                  </button>
                </div>
              </div>

              <div className="alert alert-info mt-3 mb-0">
                <b>Info:</b> Withdrawal hone ke baad updated balance automatically refresh ho jayega.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}