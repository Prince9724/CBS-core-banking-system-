import { useState } from "react";
import axios from "axios";

export default function TellerTransaction() {
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
    await axios.post(
      "http://localhost:5003/cbs/customer/deposite",
      {
        accountNumber: account.accountNumber,
        amount: Number(amount),
      },
      { withCredentials: true }
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
      { withCredentials: true }
    );

    alert("Withdrawal successful");
    handleSearch();
    setAmount("");
  };

  return (
    <div className="card bg-dark border-secondary p-4 mt-4">
      <h4 className="mb-3">🔍 Quick Transaction</h4>

      <div className="d-flex gap-2 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Account Number or Aadhar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>

      {account && (
        <>
          <div className="mb-3">
            <p className="mb-1"><b>Name:</b> {account.customer.name}</p>
            <p className="mb-1"><b>Account:</b> {account.accountNumber}</p>
            <p className="mb-1"><b>Aadhar:</b> {account.customer.aadhar}</p>
          </div>

          <div className="alert alert-success fw-bold">
            Current Balance: ₹{account.balance}
          </div>

          <input
            type="number"
            className="form-control mb-3"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <div className="d-flex gap-3">
            <button className="btn btn-success" onClick={handleDeposit}>
              💰 Deposit
            </button>

            <button className="btn btn-warning" onClick={handleWithdraw}>
              🏧 Withdraw
            </button>
          </div>
        </>
      )}
    </div>
  );
}