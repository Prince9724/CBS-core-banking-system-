import React, { useState } from "react";
import "./LoanRequests.css";

export default function LoanRequests() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  return (
    <div className="loan-requests-page">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="loan-page-header">
        <div>
          <span className="loan-eyebrow">
            <i className="bi bi-bank2"></i>
            Branch Credit Management
          </span>

          <h1>Loan Requests</h1>

          <p>
            Review, monitor and manage loan applications submitted by branch
            customers.
          </p>
        </div>

        <div className="loan-header-actions">
          <div className="loan-total-card">
            <div className="loan-total-icon">
              <i className="bi bi-file-earmark-text"></i>
            </div>

            <div>
              <span>Total Requests</span>
              <strong>24</strong>
            </div>
          </div>

          <button className="loan-refresh-btn">
            <i className="bi bi-arrow-clockwise"></i>
            Refresh
          </button>
        </div>
      </div>

      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <div className="loan-stats-grid">
        {/* Pending */}

        <div className="loan-stat-card">
          <div className="loan-stat-top">
            <div className="loan-stat-icon loan-icon-orange">
              <i className="bi bi-hourglass-split"></i>
            </div>

            <span>Pending Requests</span>
          </div>

          <strong>08</strong>

          <div className="loan-stat-footer">
            <span>Awaiting review</span>
            <i className="bi bi-clock"></i>
          </div>
        </div>

        {/* Approved */}

        <div className="loan-stat-card">
          <div className="loan-stat-top">
            <div className="loan-stat-icon loan-icon-green">
              <i className="bi bi-check-circle"></i>
            </div>

            <span>Approved</span>
          </div>

          <strong>11</strong>

          <div className="loan-stat-footer">
            <span>Approved applications</span>
            <i className="bi bi-check2"></i>
          </div>
        </div>

        {/* Rejected */}

        <div className="loan-stat-card">
          <div className="loan-stat-top">
            <div className="loan-stat-icon loan-icon-red">
              <i className="bi bi-x-circle"></i>
            </div>

            <span>Rejected</span>
          </div>

          <strong>05</strong>

          <div className="loan-stat-footer">
            <span>Rejected requests</span>
            <i className="bi bi-x-lg"></i>
          </div>
        </div>

        {/* Amount */}

        <div className="loan-stat-card">
          <div className="loan-stat-top">
            <div className="loan-stat-icon loan-icon-blue">
              <i className="bi bi-currency-rupee"></i>
            </div>

            <span>Requested Amount</span>
          </div>

          <strong>₹18.5L</strong>

          <div className="loan-stat-footer">
            <span>Current requests</span>
            <i className="bi bi-graph-up"></i>
          </div>
        </div>
      </div>

      {/* =====================================================
          SEARCH + FILTER
      ===================================================== */}

      <div className="loan-filter-panel">
        <div className="loan-filter-heading">
          <div className="loan-filter-icon">
            <i className="bi bi-funnel"></i>
          </div>

          <div>
            <h3>Find Loan Request</h3>

            <p>Search customers or filter applications by status.</p>
          </div>
        </div>

        <div className="loan-filter-controls">
          <div className="loan-search-box">
            <i className="bi bi-search"></i>

            <input
              type="text"
              placeholder="Search customer, account or loan ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button type="button" onClick={() => setSearch("")}>
                <i className="bi bi-x"></i>
              </button>
            )}
          </div>

          <div className="loan-status-select">
            <i className="bi bi-filter"></i>

            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* =====================================================
          REQUEST TABLE
      ===================================================== */}

      <div className="loan-table-panel">
        <div className="loan-panel-header">
          <div className="loan-panel-title">
            <div className="loan-panel-icon">
              <i className="bi bi-files"></i>
            </div>

            <div>
              <h3>Loan Applications</h3>

              <p>Recent loan requests from your branch customers.</p>
            </div>
          </div>

          <div className="loan-result-count">
            <span>Showing</span>
            <strong>24</strong>
          </div>
        </div>

        <div className="loan-table-wrapper">
          <table className="loan-table">
            <thead>
              <tr>
                <th>Loan ID</th>
                <th>Customer</th>
                <th>Loan Type</th>
                <th>Requested</th>
                <th>Tenure</th>
                <th>Applied Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {/* =================================================
                  REQUEST 1
              ================================================= */}

              <tr>
                <td>
                  <code>LN-10241</code>
                </td>

                <td>
                  <div className="loan-customer">
                    <div className="loan-avatar">
                      <i className="bi bi-person-fill"></i>
                    </div>

                    <div>
                      <strong>Rahul Sharma</strong>
                      <span>ACC-102345</span>
                    </div>
                  </div>
                </td>

                <td>
                  <span className="loan-type">
                    <i className="bi bi-house"></i>
                    Home Loan
                  </span>
                </td>

                <td>
                  <strong className="loan-amount">₹8,00,000</strong>
                </td>

                <td>10 Years</td>

                <td>14 Aug 2026</td>

                <td>
                  <span className="loan-status loan-pending">
                    <i className="bi bi-clock"></i>
                    Pending
                  </span>
                </td>

                <td>
                  <button className="loan-view-btn">
                    <i className="bi bi-eye"></i>
                    View
                  </button>
                </td>
              </tr>

              {/* =================================================
                  REQUEST 2
              ================================================= */}

              <tr>
                <td>
                  <code>LN-10240</code>
                </td>

                <td>
                  <div className="loan-customer">
                    <div className="loan-avatar">
                      <i className="bi bi-person-fill"></i>
                    </div>

                    <div>
                      <strong>Amit Patel</strong>
                      <span>ACC-102278</span>
                    </div>
                  </div>
                </td>

                <td>
                  <span className="loan-type">
                    <i className="bi bi-car-front"></i>
                    Vehicle Loan
                  </span>
                </td>

                <td>
                  <strong className="loan-amount">₹5,50,000</strong>
                </td>

                <td>5 Years</td>

                <td>13 Aug 2026</td>

                <td>
                  <span className="loan-status loan-approved">
                    <i className="bi bi-check-circle"></i>
                    Approved
                  </span>
                </td>

                <td>
                  <button className="loan-view-btn">
                    <i className="bi bi-eye"></i>
                    View
                  </button>
                </td>
              </tr>

              {/* =================================================
                  REQUEST 3
              ================================================= */}

              <tr>
                <td>
                  <code>LN-10239</code>
                </td>

                <td>
                  <div className="loan-customer">
                    <div className="loan-avatar">
                      <i className="bi bi-person-fill"></i>
                    </div>

                    <div>
                      <strong>Neha Verma</strong>
                      <span>ACC-102191</span>
                    </div>
                  </div>
                </td>

                <td>
                  <span className="loan-type">
                    <i className="bi bi-person-badge"></i>
                    Personal Loan
                  </span>
                </td>

                <td>
                  <strong className="loan-amount">₹2,00,000</strong>
                </td>

                <td>3 Years</td>

                <td>12 Aug 2026</td>

                <td>
                  <span className="loan-status loan-rejected">
                    <i className="bi bi-x-circle"></i>
                    Rejected
                  </span>
                </td>

                <td>
                  <button className="loan-view-btn">
                    <i className="bi bi-eye"></i>
                    View
                  </button>
                </td>
              </tr>

              {/* =================================================
                  REQUEST 4
              ================================================= */}

              <tr>
                <td>
                  <code>LN-10238</code>
                </td>

                <td>
                  <div className="loan-customer">
                    <div className="loan-avatar">
                      <i className="bi bi-person-fill"></i>
                    </div>

                    <div>
                      <strong>Priya Shah</strong>
                      <span>ACC-102120</span>
                    </div>
                  </div>
                </td>

                <td>
                  <span className="loan-type">
                    <i className="bi bi-shop"></i>
                    Business Loan
                  </span>
                </td>

                <td>
                  <strong className="loan-amount">₹12,00,000</strong>
                </td>

                <td>7 Years</td>

                <td>11 Aug 2026</td>

                <td>
                  <span className="loan-status loan-pending">
                    <i className="bi bi-clock"></i>
                    Pending
                  </span>
                </td>

                <td>
                  <button className="loan-view-btn">
                    <i className="bi bi-eye"></i>
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* =====================================================
          LOAN TYPE SUMMARY
      ===================================================== */}

      <div className="loan-bottom-grid">
        <div className="loan-small-panel">
          <div className="loan-panel-header">
            <div className="loan-panel-title">
              <div className="loan-panel-icon loan-icon-blue">
                <i className="bi bi-pie-chart"></i>
              </div>

              <div>
                <h3>Loan Type Summary</h3>

                <p>Applications by loan category.</p>
              </div>
            </div>
          </div>

          <div className="loan-type-summary">
            <div className="loan-type-row">
              <div className="loan-type-label">
                <span className="loan-summary-dot loan-dot-blue"></span>

                <span>Home Loan</span>
              </div>

              <strong>8</strong>
            </div>

            <div className="loan-type-row">
              <div className="loan-type-label">
                <span className="loan-summary-dot loan-dot-green"></span>

                <span>Personal Loan</span>
              </div>

              <strong>6</strong>
            </div>

            <div className="loan-type-row">
              <div className="loan-type-label">
                <span className="loan-summary-dot loan-dot-orange"></span>

                <span>Vehicle Loan</span>
              </div>

              <strong>5</strong>
            </div>

            <div className="loan-type-row">
              <div className="loan-type-label">
                <span className="loan-summary-dot loan-dot-purple"></span>

                <span>Business Loan</span>
              </div>

              <strong>5</strong>
            </div>
          </div>
        </div>

        {/* =====================================================
            PENDING ACTIONS
        ===================================================== */}

        <div className="loan-small-panel">
          <div className="loan-panel-header">
            <div className="loan-panel-title">
              <div className="loan-panel-icon loan-icon-orange">
                <i className="bi bi-exclamation-circle"></i>
              </div>

              <div>
                <h3>Pending Actions</h3>

                <p>Applications requiring attention.</p>
              </div>
            </div>
          </div>

          <div className="loan-actions-list">
            <div className="loan-action-row">
              <div className="loan-action-icon">
                <i className="bi bi-file-earmark-check"></i>
              </div>

              <div>
                <strong>8 Applications</strong>
                <span>Awaiting manager review</span>
              </div>

              <i className="bi bi-chevron-right"></i>
            </div>

            <div className="loan-action-row">
              <div className="loan-action-icon">
                <i className="bi bi-person-check"></i>
              </div>

              <div>
                <strong>3 Applications</strong>
                <span>Require document verification</span>
              </div>

              <i className="bi bi-chevron-right"></i>
            </div>

            <div className="loan-action-row">
              <div className="loan-action-icon">
                <i className="bi bi-shield-exclamation"></i>
              </div>

              <div>
                <strong>2 Applications</strong>
                <span>Require additional review</span>
              </div>

              <i className="bi bi-chevron-right"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
