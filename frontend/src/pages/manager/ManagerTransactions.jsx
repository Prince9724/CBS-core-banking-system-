// import { useEffect, useState } from "react";
// import axios from "axios";
// import "./ManagerTransactions.css";

// export default function ManagerTransactions() {
//   const [transactions, setTransactions] = useState([]);
//   const [search, setSearch] = useState("");
//   const [selectedDate, setSelectedDate] = useState(
//     new Date().toLocaleDateString("en-CA")
//   );
//   const [loading, setLoading] = useState(false);

//   const fetchTransactions = async () => {
//     try {
//       setLoading(true);

//       const res = await axios.get(
//         `http://localhost:5003/cbs/customer/today-transactions?date=${selectedDate}`,
//         {
//           withCredentials: true,
//         }
//       );

//       console.log("TRANSACTIONS RESPONSE:", res.data);

//       setTransactions(res.data.data || []);
//     } catch (err) {
//       console.log(
//         "TRANSACTION ERROR:",
//         err.response?.data || err.message
//       );

//       setTransactions([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTransactions();
//   }, [selectedDate]);

//   const filtered = transactions.filter((t) => {
//     const account = String(t.accountNumber || "").toLowerCase();
//     const customer = String(t.customerName || "").toLowerCase();
//     const searchText = search.toLowerCase();

//     return (
//       account.includes(searchText) ||
//       customer.includes(searchText)
//     );
//   });

//   return (
//     <div className="container py-4 text-dark">

//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <div>
//           <h2>📄 Transaction History</h2>

//           <p className="text-secondary mb-0">
//             Branch transaction history
//           </p>
//         </div>

//         <button
//           className="btn btn-primary"
//           onClick={fetchTransactions}
//         >
//           🔄 Refresh
//         </button>
//       </div>

//       <div className="row g-3 mb-4">

//         <div className="col-md-5">
//           <label className="form-label fw-semibold">
//             📅 Select Date
//           </label>

//           <input
//             type="date"
//             className="form-control"
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//           />
//         </div>

//         <div className="col-md-7">
//           <label className="form-label fw-semibold">
//             🔍 Search
//           </label>

//           <input
//             type="text"
//             className="form-control"
//             placeholder="Account number or customer name"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//       </div>

//       <div className="card bg-dark text-white mb-4">
//         <div className="card-body">

//           <h5 className="mb-1">
//             📅 {selectedDate}
//           </h5>

//           <small className="text-secondary">
//             Total Transactions: {filtered.length}
//           </small>

//         </div>
//       </div>

//       {loading ? (

//         <div className="text-center py-5">
//           <div className="spinner-border text-primary"></div>

//           <p className="mt-3">
//             Loading transactions...
//           </p>
//         </div>

//       ) : filtered.length === 0 ? (

//         <div className="alert alert-info">
//           No transactions found for {selectedDate}.
//         </div>

//       ) : (

//         <div className="table-responsive">

//           <table className="table table-dark table-hover align-middle">

//             <thead>
//               <tr>
//                 <th>Account</th>
//                 <th>Customer</th>
//                 <th>Type</th>
//                 <th>Amount</th>
//                 <th>Balance After</th>
//                 <th>Performed By</th>
//                 <th>Date & Time</th>
//               </tr>
//             </thead>

//             <tbody>

//               {filtered.map((t) => (

//                 <tr key={t._id}>

//                   <td>
//                     <strong>{t.accountNumber}</strong>
//                   </td>

//                   <td>
//                     {t.customerName}
//                   </td>

//                   <td>
//                     <span
//                       className={
//                         t.type === "Deposit"
//                           ? "badge bg-success"
//                           : "badge bg-warning text-dark"
//                       }
//                     >
//                       {t.type}
//                     </span>
//                   </td>

//                   <td>
//                     ₹{t.amount}
//                   </td>

//                   <td>
//                     ₹{t.balanceAfter}
//                   </td>

//                   <td>
//                     {t.performedBy || "-"}
//                     <br />

//                     <small className="text-secondary">
//                       {t.performedByRole || ""}
//                     </small>
//                   </td>

//                   <td>
//                     {t.createdAt
//                       ? new Date(t.createdAt).toLocaleString()
//                       : "-"}
//                   </td>

//                 </tr>

//               ))}

//             </tbody>

//           </table>

//         </div>

//       )}

//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";  // ✅ Add
import axios from "axios";
import "./ManagerTransactions.css";

export default function ManagerTransactions() {
  const { loggedinUser } = useSelector((state) => state.auth);  // ✅ Add
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    try {
      setLoading(true);

      // ✅ Add branchcode in URL
      const res = await axios.get(
        `http://localhost:5003/cbs/customer/today-transactions?date=${selectedDate}&branchcode=${loggedinUser?.branchcode}`,
        { withCredentials: true }
      );

      console.log("TRANSACTIONS RESPONSE:", res.data);
      setTransactions(res.data.data || []);
    } catch (err) {
      console.log("TRANSACTION ERROR:", err.response?.data || err.message);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loggedinUser?.branchcode) {
      fetchTransactions();
    }
  }, [selectedDate, loggedinUser?.branchcode]);

  const filtered = transactions.filter((t) => {
    const account = String(t.accountNumber || "").toLowerCase();
    const customer = String(t.customerName || "").toLowerCase();
    const searchText = search.toLowerCase();
    return account.includes(searchText) || customer.includes(searchText);
  });

  return (
    <div className="container py-4 text-white">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>📄 Transaction History</h2>
          <p className="text-secondary mb-0">
            Branch: {loggedinUser?.branchname || "N/A"} ({loggedinUser?.branchcode || "N/A"})
          </p>
        </div>
        <button className="btn btn-primary" onClick={fetchTransactions}>
          🔄 Refresh
        </button>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-5">
          <label className="form-label fw-semibold">📅 Select Date</label>
          <input
            type="date"
            className="form-control"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        <div className="col-md-7">
          <label className="form-label fw-semibold">🔍 Search</label>
          <input
            type="text"
            className="form-control"
            placeholder="Account number or customer name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="card bg-dark text-white mb-4">
        <div className="card-body">
          <h5 className="mb-1">📅 {selectedDate}</h5>
          <small className="text-secondary">Total Transactions: {filtered.length}</small>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
          <p className="mt-3">Loading transactions...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="alert alert-info">
          No transactions found for {selectedDate}.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle">
            <thead>
              <tr>
                <th>Account</th>
                <th>Customer</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Balance After</th>
                <th>Performed By</th>
                <th>Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t._id}>
                  <td><strong>{t.accountNumber}</strong></td>
                  <td>{t.customerName}</td>
                  <td>
                    <span className={t.type === "Deposit" ? "badge bg-success" : "badge bg-warning text-dark"}>
                      {t.type}
                    </span>
                  </td>
                  <td>₹{t.amount}</td>
                  <td>₹{t.balanceAfter}</td>
                  <td>
                    {t.performedBy || "-"}
                    <br />
                    <small className="text-secondary">{t.performedByRole || ""}</small>
                  </td>
                  <td>{t.createdAt ? new Date(t.createdAt).toLocaleString() : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}