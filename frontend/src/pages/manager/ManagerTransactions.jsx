import { useEffect, useState } from "react";
import axios from "axios";

export default function ManagerTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5003/cbs/customer/today-transactions",
        { withCredentials: true }
      );

      setTransactions(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const filtered = transactions.filter((t) =>
    t.accountNumber?.toLowerCase().includes(search.toLowerCase()) ||
    t.customerName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-4 text-white">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>📄 Today Transactions</h2>
        <button className="btn btn-primary" onClick={fetchTransactions}>
          Refresh
        </button>
      </div>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search by account number or customer name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="table-responsive">
        <table className="table table-dark table-hover align-middle">
          <thead>
            <tr>
              <th>Account</th>
              <th>Customer</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t._id}>
                <td>{t.accountNumber}</td>
                <td>{t.customerName}</td>
                <td>
                  <span
                    className={`badge ${
                      t.type === "Deposit"
                        ? "bg-success"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {t.type}
                  </span>
                </td>
                <td>₹{t.amount}</td>
                <td>
                  {new Date(t.createdAt).toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}