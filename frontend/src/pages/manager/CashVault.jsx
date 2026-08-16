import React from "react";
import "./CashVault.css";

export default function CashVault() {
  return (
    <div className="cash-vault-page">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="cash-vault-header">
        <div>
          <span className="cash-vault-eyebrow">
            <i className="bi bi-safe2-fill"></i>
            Branch Cash Management
          </span>

          <h1>Cash & Vault</h1>

          <p>Monitor branch cash, vault balance and daily cash movement.</p>
        </div>

        <div className="cash-vault-header-actions">
          <div className="cash-vault-status">
            <span className="cash-status-dot"></span>
            Vault Operational
          </div>

          <button className="cash-vault-refresh-btn">
            <i className="bi bi-arrow-clockwise"></i>
            Refresh
          </button>
        </div>
      </div>

      {/* =====================================================
          CASH OVERVIEW
      ===================================================== */}

      <div className="cash-vault-stats">
        {/* Vault Balance */}

        <div className="cash-vault-stat-card">
          <div className="cash-stat-top">
            <div className="cash-stat-icon cash-icon-blue">
              <i className="bi bi-safe2-fill"></i>
            </div>

            <span>Vault Balance</span>
          </div>

          <strong>₹2,50,000</strong>

          <div className="cash-stat-footer">
            <span>Current vault cash</span>
            <i className="bi bi-shield-check"></i>
          </div>
        </div>

        {/* Today's Inflow */}

        <div className="cash-vault-stat-card">
          <div className="cash-stat-top">
            <div className="cash-stat-icon cash-icon-green">
              <i className="bi bi-arrow-down-left"></i>
            </div>

            <span>Cash In</span>
          </div>

          <strong>₹85,000</strong>

          <div className="cash-stat-footer">
            <span>Today's cash received</span>
            <i className="bi bi-graph-up-arrow"></i>
          </div>
        </div>

        {/* Today's Outflow */}

        <div className="cash-vault-stat-card">
          <div className="cash-stat-top">
            <div className="cash-stat-icon cash-icon-orange">
              <i className="bi bi-arrow-up-right"></i>
            </div>

            <span>Cash Out</span>
          </div>

          <strong>₹42,000</strong>

          <div className="cash-stat-footer">
            <span>Today's cash withdrawn</span>
            <i className="bi bi-graph-down-arrow"></i>
          </div>
        </div>

        {/* Available Cash */}

        <div className="cash-vault-stat-card">
          <div className="cash-stat-top">
            <div className="cash-stat-icon cash-icon-purple">
              <i className="bi bi-cash-stack"></i>
            </div>

            <span>Available Cash</span>
          </div>

          <strong>₹2,93,000</strong>

          <div className="cash-stat-footer">
            <span>Available for operations</span>
            <i className="bi bi-check-circle"></i>
          </div>
        </div>
      </div>

      {/* =====================================================
          CASH POSITION + VAULT STATUS
      ===================================================== */}

      <div className="cash-vault-main-grid">
        {/* Cash Position */}

        <div className="cash-vault-panel">
          <div className="cash-panel-header">
            <div className="cash-panel-title">
              <div className="cash-panel-icon cash-icon-blue">
                <i className="bi bi-bar-chart-fill"></i>
              </div>

              <div>
                <h3>Cash Position</h3>

                <p>Today's branch cash movement.</p>
              </div>
            </div>
          </div>

          <div className="cash-position-content">
            <div className="cash-position-item">
              <div className="cash-position-label">
                <span className="cash-position-dot cash-dot-blue"></span>
                Opening Cash
              </div>

              <strong>₹2,00,000</strong>
            </div>

            <div className="cash-position-item">
              <div className="cash-position-label">
                <span className="cash-position-dot cash-dot-green"></span>
                Cash Received
              </div>

              <strong className="cash-positive">+₹85,000</strong>
            </div>

            <div className="cash-position-item">
              <div className="cash-position-label">
                <span className="cash-position-dot cash-dot-orange"></span>
                Cash Withdrawn
              </div>

              <strong className="cash-negative">-₹42,000</strong>
            </div>

            <div className="cash-position-divider"></div>

            <div className="cash-position-item cash-position-total">
              <div className="cash-position-label">
                <span className="cash-position-dot cash-dot-purple"></span>
                Closing Cash
              </div>

              <strong>₹2,43,000</strong>
            </div>
          </div>
        </div>

        {/* Vault Status */}

        <div className="cash-vault-panel">
          <div className="cash-panel-header">
            <div className="cash-panel-title">
              <div className="cash-panel-icon cash-icon-green">
                <i className="bi bi-safe-fill"></i>
              </div>

              <div>
                <h3>Vault Status</h3>

                <p>Current branch vault information.</p>
              </div>
            </div>

            <span className="vault-status-badge">
              <i className="bi bi-check-circle-fill"></i>
              Secure
            </span>
          </div>

          <div className="vault-status-content">
            <div className="vault-status-row">
              <div>
                <span>Vault Balance</span>
                <strong>₹2,50,000</strong>
              </div>

              <i className="bi bi-safe2"></i>
            </div>

            <div className="vault-status-row">
              <div>
                <span>Maximum Limit</span>
                <strong>₹5,00,000</strong>
              </div>

              <i className="bi bi-speedometer2"></i>
            </div>

            <div className="vault-progress-wrapper">
              <div className="vault-progress-header">
                <span>Vault Capacity</span>

                <strong>50%</strong>
              </div>

              <div className="vault-progress">
                <div
                  className="vault-progress-bar"
                  style={{ width: "50%" }}
                ></div>
              </div>
            </div>

            <div className="vault-last-action">
              <i className="bi bi-clock-history"></i>

              <span>Last vault operation: Today, 11:42 AM</span>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          TELLER CASH
      ===================================================== */}

      <div className="cash-vault-panel cash-teller-panel">
        <div className="cash-panel-header">
          <div className="cash-panel-title">
            <div className="cash-panel-icon cash-icon-orange">
              <i className="bi bi-people-fill"></i>
            </div>

            <div>
              <h3>Teller Cash Position</h3>

              <p>Cash currently assigned to branch tellers.</p>
            </div>
          </div>

          <span className="teller-count">4 Active Tellers</span>
        </div>

        <div className="teller-grid">
          {/* Teller 1 */}

          <div className="teller-card">
            <div className="teller-card-header">
              <div className="teller-avatar">
                <i className="bi bi-person-fill"></i>
              </div>

              <div>
                <strong>Teller 01</strong>

                <span>Active</span>
              </div>
            </div>

            <div className="teller-cash">
              <span>Cash Held</span>

              <strong>₹35,000</strong>
            </div>
          </div>

          {/* Teller 2 */}

          <div className="teller-card">
            <div className="teller-card-header">
              <div className="teller-avatar">
                <i className="bi bi-person-fill"></i>
              </div>

              <div>
                <strong>Teller 02</strong>

                <span>Active</span>
              </div>
            </div>

            <div className="teller-cash">
              <span>Cash Held</span>

              <strong>₹28,500</strong>
            </div>
          </div>

          {/* Teller 3 */}

          <div className="teller-card">
            <div className="teller-card-header">
              <div className="teller-avatar">
                <i className="bi bi-person-fill"></i>
              </div>

              <div>
                <strong>Teller 03</strong>

                <span>Active</span>
              </div>
            </div>

            <div className="teller-cash">
              <span>Cash Held</span>

              <strong>₹41,200</strong>
            </div>
          </div>

          {/* Teller 4 */}

          <div className="teller-card">
            <div className="teller-card-header">
              <div className="teller-avatar">
                <i className="bi bi-person-fill"></i>
              </div>

              <div>
                <strong>Teller 04</strong>

                <span>Active</span>
              </div>
            </div>

            <div className="teller-cash">
              <span>Cash Held</span>

              <strong>₹22,800</strong>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          RECENT CASH MOVEMENT
      ===================================================== */}

      <div className="cash-vault-panel">
        <div className="cash-panel-header">
          <div className="cash-panel-title">
            <div className="cash-panel-icon cash-icon-purple">
              <i className="bi bi-clock-history"></i>
            </div>

            <div>
              <h3>Recent Cash Movement</h3>

              <p>Latest cash and vault operations.</p>
            </div>
          </div>
        </div>

        <div className="cash-table-wrapper">
          <table className="cash-table">
            <thead>
              <tr>
                <th>Reference</th>
                <th>Operation</th>
                <th>Amount</th>
                <th>Performed By</th>
                <th>Date & Time</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <code>CV-10021</code>
                </td>

                <td>
                  <span className="cash-operation cash-operation-in">
                    <i className="bi bi-arrow-down-left"></i>
                    Cash In
                  </span>
                </td>

                <td>
                  <strong className="cash-positive">+₹25,000</strong>
                </td>

                <td>Branch Manager</td>

                <td>Today, 11:42 AM</td>

                <td>
                  <span className="cash-status-success">
                    <i className="bi bi-check-circle-fill"></i>
                    Completed
                  </span>
                </td>
              </tr>

              <tr>
                <td>
                  <code>CV-10020</code>
                </td>

                <td>
                  <span className="cash-operation cash-operation-out">
                    <i className="bi bi-arrow-up-right"></i>
                    Cash Out
                  </span>
                </td>

                <td>
                  <strong className="cash-negative">-₹10,000</strong>
                </td>

                <td>Teller 02</td>

                <td>Today, 10:25 AM</td>

                <td>
                  <span className="cash-status-success">
                    <i className="bi bi-check-circle-fill"></i>
                    Completed
                  </span>
                </td>
              </tr>

              <tr>
                <td>
                  <code>CV-10019</code>
                </td>

                <td>
                  <span className="cash-operation cash-operation-in">
                    <i className="bi bi-arrow-down-left"></i>
                    Vault Deposit
                  </span>
                </td>

                <td>
                  <strong className="cash-positive">+₹40,000</strong>
                </td>

                <td>Teller 01</td>

                <td>Today, 09:48 AM</td>

                <td>
                  <span className="cash-status-success">
                    <i className="bi bi-check-circle-fill"></i>
                    Completed
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
