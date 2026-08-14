import { useParams, Link, useNavigate } from "react-router-dom";
import { handleLogout } from "../../utils/handleLogout";
import { useDispatch } from "react-redux";

export default function TellerDashboard() {
  const { branchcode } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="container py-4 bg-dark text-white">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">💵 Teller Dashboard</h2>
          <p className="text-light mb-0">
            Branch Code: <strong>{branchcode}</strong>
          </p>
        </div>

        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleLogout(dispatch, navigate)}
        >
          🚪 Logout
        </button>
      </div>

      <div className="row g-4">
        {/* Deposit */}
        <div className="col-md-4">
          <Link
            to={`/teller/${branchcode}/deposit`}
            className="text-decoration-none"
          >
            <div className="card bg-success text-white p-4 h-100 shadow border-0">
              <h4 className="fw-bold mb-2">💰 Deposit</h4>
              <p className="mb-0 small">
                Cash deposit into customer account
              </p>
            </div>
          </Link>
        </div>

        {/* Withdraw */}
        <div className="col-md-4">
          <Link
            to={`/teller/${branchcode}/withdraw`}
            className="text-decoration-none"
          >
            <div className="card bg-warning text-dark p-4 h-100 shadow border-0">
              <h4 className="fw-bold mb-2">🏧 Withdraw</h4>
              <p className="mb-0 small">
                Cash withdrawal from customer account
              </p>
            </div>
          </Link>
        </div>

        {/* History */}
        <div className="col-md-4">
          <Link
            to={`/teller/${branchcode}/history`}
            className="text-decoration-none"
          >
            <div className="card bg-info text-dark p-4 h-100 shadow border-0">
              <h4 className="fw-bold mb-2">📄 Transactions</h4>
              <p className="mb-0 small">
                View transaction history, print &amp; export PDF
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}


// import { useParams, Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { handleLogout } from "../../utils/handleLogout";

// export default function TellerDashboard() {
//   const { branchcode } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   return (
//     <div className="container py-4 bg-dark text-white">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <div>
//           <h2 className="fw-bold">💵 Teller Dashboard</h2>
//           <p className="text-light mb-0">
//             Branch Code: <strong>{branchcode}</strong>
//           </p>
//         </div>

//         <button
//           type="button"
//           className="btn btn-danger"
//           onClick={() => handleLogout(dispatch, navigate)}
//         >
//           🚪 Logout
//         </button>
//       </div>
//     </div>
//   );
// }