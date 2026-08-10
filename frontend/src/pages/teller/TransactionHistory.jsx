import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHistory } from "../../App/features/transactionSlice";

export default function TransactionHistory() {
  const [accountNumber, setAccountNumber] = useState("");
  const dispatch = useDispatch();

  const { history, loading, error } = useSelector(
    (state) => state.transaction
  );

  const handleSearch = () => {
    if (!accountNumber.trim()) {
      alert("Enter account number");
      return;
    }

    dispatch(fetchHistory(accountNumber));
  };

  return (
    <div className="container py-4 text-white">
      <h2>📄 Transaction History</h2>

      <div className="d-flex gap-2 mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Account Number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />

        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-dark table-bordered">
          <thead>
            <tr>
              <th>Type</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((t) => (
              <tr key={t._id}>
                <td>{t.type}</td>
                <td>₹{t.amount}</td>
                <td>{new Date(t.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button className="btn btn-success" onClick={() => window.print()}>
        🖨️ Print / Save PDF
      </button>
    </div>
  );
}