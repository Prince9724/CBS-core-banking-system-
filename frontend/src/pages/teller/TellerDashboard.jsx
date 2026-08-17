import { useParams, Link, useNavigate } from "react-router-dom";
import { handleLogout } from "../../utils/handleLogout";
import { useDispatch } from "react-redux";
import "./TellerDashboard.css";

export default function TellerDashboard() {
  const { branchcode } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="teller-dashboard-page">
      {/* ================= HEADER ================= */}

      <div className="teller-dashboard-header">
        <div>
          <span className="teller-eyebrow">
            <i className="bi bi-person-badge-fill"></i>
            Teller Operations
          </span>

          <h1>Teller Dashboard</h1>

          <p>Manage customer cash transactions and branch activities.</p>
        </div>

        <div className="teller-header-right">
          <div className="teller-branch-info">
            <i className="bi bi-bank"></i>

            <div>
              <span>Branch Code</span>
              <strong>{branchcode}</strong>
            </div>
          </div>

          <button
            type="button"
            className="teller-logout-btn"
            onClick={() => handleLogout(dispatch, navigate)}
          >
            <i className="bi bi-box-arrow-right"></i>
            Logout
          </button>
        </div>
      </div>

      {/* ================= WELCOME CARD ================= */}

      <div className="teller-welcome-card">
        <div className="teller-welcome-content">
          <div className="teller-welcome-icon">
            <i className="bi bi-person-workspace"></i>
          </div>

          <div>
            <span>Branch Teller</span>

            <h2>Ready for today's transactions?</h2>

            <p>Select an operation below to continue.</p>
          </div>
        </div>

        <div className="teller-status">
          <span></span>
          Active
        </div>
      </div>

      {/* ================= QUICK ACTIONS ================= */}

      <div className="teller-section-heading">
        <div>
          <h3>Quick Actions</h3>

          <p>Frequently used teller operations</p>
        </div>
      </div>

      <div className="teller-actions-grid">
        {/* ================= DEPOSIT ================= */}

        <Link
          to={`/teller/${branchcode}/deposit`}
          className="teller-action-link"
        >
          <div className="teller-action-card">
            <div className="teller-action-top">
              <div className="teller-action-icon teller-green">
                <i className="bi bi-arrow-down-left"></i>
              </div>

              <i className="bi bi-arrow-up-right teller-action-arrow"></i>
            </div>

            <div className="teller-action-content">
              <h4>Deposit</h4>

              <p>Deposit cash into a customer's account.</p>
            </div>

            <div className="teller-action-footer">
              <span>Start Deposit</span>

              <i className="bi bi-chevron-right"></i>
            </div>
          </div>
        </Link>

        {/* ================= WITHDRAW ================= */}

        <Link
          to={`/teller/${branchcode}/withdrawal`}
          className="teller-action-link"
        >
          <div className="teller-action-card">
            <div className="teller-action-top">
              <div className="teller-action-icon teller-orange">
                <i className="bi bi-arrow-up-right"></i>
              </div>

              <i className="bi bi-arrow-up-right teller-action-arrow"></i>
            </div>

            <div className="teller-action-content">
              <h4>Withdraw</h4>

              <p>Withdraw cash from a customer's account.</p>
            </div>

            <div className="teller-action-footer">
              <span>Start Withdrawal</span>

              <i className="bi bi-chevron-right"></i>
            </div>
          </div>
        </Link>

        {/* ================= TRANSACTIONS ================= */}

        <Link
          to={`/teller/${branchcode}/transactions`}
          className="teller-action-link"
        >
          <div className="teller-action-card">
            <div className="teller-action-top">
              <div className="teller-action-icon teller-blue">
                <i className="bi bi-receipt"></i>
              </div>

              <i className="bi bi-arrow-up-right teller-action-arrow"></i>
            </div>

            <div className="teller-action-content">
              <h4>Transactions</h4>

              <p>View transaction history and export records.</p>
            </div>

            <div className="teller-action-footer">
              <span>View History</span>

              <i className="bi bi-chevron-right"></i>
            </div>
          </div>
        </Link>
      </div>

      {/* ================= OPERATION INFORMATION ================= */}

      <div className="teller-info-grid">
        <div className="teller-info-card">
          <div className="teller-info-icon teller-blue">
            <i className="bi bi-shield-check"></i>
          </div>

          <div>
            <strong>Secure Transactions</strong>

            <span>
              All teller operations are protected by your authenticated session.
            </span>
          </div>
        </div>

        <div className="teller-info-card">
          <div className="teller-info-icon teller-green">
            <i className="bi bi-clock-history"></i>
          </div>

          <div>
            <strong>Transaction History</strong>

            <span>
              Review previous transactions and maintain accurate records.
            </span>
          </div>
        </div>

        <div className="teller-info-card">
          <div className="teller-info-icon teller-purple">
            <i className="bi bi-bank"></i>
          </div>

          <div>
            <strong>Branch Operations</strong>

            <span>All activities are performed for branch {branchcode}.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
