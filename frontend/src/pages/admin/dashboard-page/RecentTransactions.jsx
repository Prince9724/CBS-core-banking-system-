import React from "react";
import './recentTransaction.css'
export default function RecentTransactions() {
  return (
    <div className="shadow-sm border-0  mb-5 recent-card">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold mb-0">Recent Transactions</h5>

        <button className="btn btn-outline-primary btn-sm px-3">
          View All
        </button>
      </div>

      {/* Table */}
      <div className="table-responsive ">
        <table className="table align-middle">
          <thead className="">
            <tr>
              <th>Txn ID</th>
              <th>Account No.</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Branch</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>TXN100125</td>
              <td>1234567890</td>
              <td>Deposit</td>
              <td>₹25,000.00</td>
              <td>Delhi Branch</td>
              <td>11:30 AM</td>

              <td>
                <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2">
                  Success
                </span>
              </td>
            </tr>

            <tr>
              <td>TXN100124</td>
              <td>2345678901</td>
              <td>Withdrawal</td>
              <td>₹10,000.00</td>
              <td>Mumbai Branch</td>
              <td>11:15 AM</td>

              <td>
                <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2">
                  Success
                </span>
              </td>
            </tr>

            <tr>
              <td>TXN100123</td>
              <td>3456789012</td>
              <td>Transfer</td>
              <td>₹15,000.00</td>
              <td>Pune Branch</td>
              <td>11:02 AM</td>

              <td>
                <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2">
                  Success
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
