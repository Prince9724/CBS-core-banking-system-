import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Deposit() {
  const { branchcode } = useParams();

  const [search, setSearch] = useState("");
  const [account, setAccount] = useState(null);
  const [amount, setAmount] = useState("");

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5003/cbs/customer/account-search?search=${search}`,
        { withCredentials: true }
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
        { withCredentials: true }
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
    <div className="container py-4 text-white">
      <h2 className="mb-4">💰 Deposit - {branchcode}</h2>

      <div className="card bg-dark border-secondary p-4">
        <div className="row g-3">
          <div className="col-md-8">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Account Number or Aadhar"
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

        {account && (
          <div className="mt-4">
            <div className="row g-4">
              <div className="col-md-6">
                <div className="bg-secondary bg-opacity-25 rounded p-3 h-100">
                  <h5 className="fw-bold mb-3">👤 Customer Details</h5>

                  <p><b>Name:</b> {account.customer.name}</p>
                  <p><b>Aadhar:</b> {account.customer.aadhar}</p>
                  <p><b>Account:</b> {account.accountNumber}</p>
                </div>
              </div>

              <div className="col-md-6">
                <div className="bg-success bg-opacity-25 rounded p-3 h-100 border border-success-subtle">
                  <h5 className="fw-bold mb-3 text-success">💳 Current Balance</h5>

                  <div className="display-6 fw-bold text-success">
                    ₹{account.balance}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-secondary bg-opacity-25 rounded p-4 mt-4">
              <h5 className="fw-bold mb-3">💸 Deposit Amount</h5>

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
                    className="btn btn-success btn-lg"
                    onClick={handleDeposit}
                  >
                    Deposit Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}