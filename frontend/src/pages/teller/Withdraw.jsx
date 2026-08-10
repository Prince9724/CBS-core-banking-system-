import { useState } from "react";
import axios from "axios";

export default function Withdraw() {
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");

  const handleWithdraw = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5003/cbs/customer/withdraw",
        { accountNumber, amount: Number(amount) },
        { withCredentials: true }
      );

      alert(res.data.message || "Withdrawal successful");
      setAccountNumber("");
      setAmount("");
    } catch (err) {
      alert(err.response?.data?.message || "Withdrawal failed");
    }
  };

  return (
    <div className="container py-4 text-white">
      <h2>🏧 Withdraw</h2>

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

      <button className="btn btn-warning" onClick={handleWithdraw}>
        Withdraw
      </button>
    </div>
  );
}