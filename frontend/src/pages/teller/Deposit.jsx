import { useState } from "react";
import axios from "axios";

export default function Deposit() {
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");

  const handleDeposit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5003/cbs/customer/deposit",
        { accountNumber, amount: Number(amount) },
        { withCredentials: true }
      );

      alert(res.data.message || "Deposit successful");
      setAccountNumber("");
      setAmount("");
    } catch (err) {
      alert(err.response?.data?.message || "Deposit failed");
    }
  };

  return (
    <div className="container py-4 text-white">
      <h2>💰 Deposit</h2>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Account Number"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
      />

      <input
        type="number"
        className="form-control mb-3"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button className="btn btn-success" onClick={handleDeposit}>
        Deposit
      </button>
    </div>
  );
}