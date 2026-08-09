import { useParams, Link } from "react-router-dom";

export default function TellerDashboard() {
  const { branchcode } = useParams();

  return (
    <div className="container py-4 text-white bg-dark">
      <h2>💵 Teller Dashboard</h2>
      <p>Branch Code: <b>{branchcode}</b></p>

      <div className="row g-4 mt-3">
        <div className="col-md-4">
          <Link to="/transactions/deposit" className="text-decoration-none">
            <div className="card bg-success text-white p-4 h-100">
              <h4>Deposit</h4>
              <p className="mb-0">Cash deposit into customer account</p>
            </div>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="/transactions/withdraw" className="text-decoration-none">
            <div className="card bg-warning text-dark p-4 h-100">
              <h4>Withdraw</h4>
              <p className="mb-0">Cash withdrawal from account</p>
            </div>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="/transactions/history" className="text-decoration-none">
            <div className="card bg-info text-dark p-4 h-100">
              <h4>Transactions</h4>
              <p className="mb-0">View branch transaction history</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}