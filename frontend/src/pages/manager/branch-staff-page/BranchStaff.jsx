import React, { useState } from "react";
import "./BranchStaff.css";

export default function BranchStaff() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All");
  const [status, setStatus] = useState("All");

  return (
    <div className="branch-staff-page">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="branch-staff-header">
        <div>
          <span className="branch-staff-eyebrow">
            <i className="bi bi-people-fill"></i>
            Branch Workforce
          </span>

          <h1>Branch Staff</h1>

          <p>Manage branch employees, roles and staff activity.</p>
        </div>

        <div className="branch-staff-header-actions">
          <div className="branch-staff-total">
            <div className="branch-staff-total-icon">
              <i className="bi bi-person-badge-fill"></i>
            </div>

            <div>
              <span>Total Staff</span>
              <strong>12</strong>
            </div>
          </div>

          <button className="branch-staff-refresh">
            <i className="bi bi-arrow-clockwise"></i>
            Refresh
          </button>
        </div>
      </div>

      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <div className="branch-staff-stats">
        {/* Total Staff */}

        <div className="branch-staff-stat-card">
          <div className="staff-stat-top">
            <div className="staff-stat-icon staff-blue">
              <i className="bi bi-people-fill"></i>
            </div>

            <span>Total Staff</span>
          </div>

          <strong>12</strong>

          <div className="staff-stat-footer">
            <span>Branch employees</span>
            <i className="bi bi-people"></i>
          </div>
        </div>

        {/* Active Staff */}

        <div className="branch-staff-stat-card">
          <div className="staff-stat-top">
            <div className="staff-stat-icon staff-green">
              <i className="bi bi-person-check-fill"></i>
            </div>

            <span>Active Staff</span>
          </div>

          <strong>10</strong>

          <div className="staff-stat-footer">
            <span>Currently active</span>
            <i className="bi bi-check-circle"></i>
          </div>
        </div>

        {/* Managers */}

        <div className="branch-staff-stat-card">
          <div className="staff-stat-top">
            <div className="staff-stat-icon staff-purple">
              <i className="bi bi-person-fill-gear"></i>
            </div>

            <span>Managers</span>
          </div>

          <strong>2</strong>

          <div className="staff-stat-footer">
            <span>Branch management</span>
            <i className="bi bi-shield-check"></i>
          </div>
        </div>

        {/* Tellers */}

        <div className="branch-staff-stat-card">
          <div className="staff-stat-top">
            <div className="staff-stat-icon staff-orange">
              <i className="bi bi-cash-register"></i>
            </div>

            <span>Tellers</span>
          </div>

          <strong>8</strong>

          <div className="staff-stat-footer">
            <span>Cash operations</span>
            <i className="bi bi-wallet2"></i>
          </div>
        </div>
      </div>

      {/* =====================================================
          SEARCH + FILTER
      ===================================================== */}

      <div className="branch-staff-filter">
        <div className="staff-filter-heading">
          <div className="staff-filter-icon">
            <i className="bi bi-search"></i>
          </div>

          <div>
            <h3>Find Staff</h3>

            <p>Search staff members or filter by role and status.</p>
          </div>
        </div>

        <div className="staff-filter-controls">
          {/* Search */}

          <div className="staff-search-box">
            <i className="bi bi-search"></i>

            <input
              type="text"
              placeholder="Search by name, email or employee ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button type="button" onClick={() => setSearch("")}>
                <i className="bi bi-x"></i>
              </button>
            )}
          </div>

          {/* Role */}

          <div className="staff-select-box">
            <i className="bi bi-person-badge"></i>

            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="All">All Roles</option>
              <option value="Manager">Manager</option>
              <option value="Teller">Teller</option>
              <option value="Accountant">Accountant</option>
              <option value="Officer">Officer</option>
            </select>
          </div>

          {/* Status */}

          <div className="staff-select-box">
            <i className="bi bi-toggle-on"></i>

            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* =====================================================
          STAFF TABLE
      ===================================================== */}

      <div className="branch-staff-table-panel">
        <div className="staff-panel-header">
          <div className="staff-panel-title">
            <div className="staff-panel-icon">
              <i className="bi bi-person-lines-fill"></i>
            </div>

            <div>
              <h3>Branch Employees</h3>

              <p>Staff members assigned to this branch.</p>
            </div>
          </div>

          <div className="staff-result-count">
            <span>Showing</span>

            <strong>12</strong>
          </div>
        </div>

        <div className="staff-table-wrapper">
          <table className="staff-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Employee ID</th>
                <th>Role</th>
                <th>Phone</th>
                <th>Joined</th>
                <th>Last Active</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {/* =================================================
                  STAFF 1
              ================================================= */}

              <tr>
                <td>
                  <div className="staff-employee">
                    <div className="staff-avatar staff-avatar-manager">
                      <i className="bi bi-person-fill"></i>
                    </div>

                    <div>
                      <strong>Rajesh Kumar</strong>
                      <span>rajesh@abcbank.com</span>
                    </div>
                  </div>
                </td>

                <td>
                  <code>EMP-1001</code>
                </td>

                <td>
                  <span className="staff-role staff-role-manager">
                    <i className="bi bi-person-fill-gear"></i>
                    Manager
                  </span>
                </td>

                <td>+91 98765 43210</td>

                <td>12 Jan 2024</td>

                <td>Today, 02:15 PM</td>

                <td>
                  <span className="staff-status staff-active">
                    <i className="bi bi-check-circle-fill"></i>
                    Active
                  </span>
                </td>

                <td>
                  <button className="staff-view-btn">
                    <i className="bi bi-eye"></i>
                    View
                  </button>
                </td>
              </tr>

              {/* =================================================
                  STAFF 2
              ================================================= */}

              <tr>
                <td>
                  <div className="staff-employee">
                    <div className="staff-avatar staff-avatar-teller">
                      <i className="bi bi-person-fill"></i>
                    </div>

                    <div>
                      <strong>Amit Patel</strong>
                      <span>amit@abcbank.com</span>
                    </div>
                  </div>
                </td>

                <td>
                  <code>EMP-1002</code>
                </td>

                <td>
                  <span className="staff-role staff-role-teller">
                    <i className="bi bi-cash-register"></i>
                    Teller
                  </span>
                </td>

                <td>+91 98254 12345</td>

                <td>20 Mar 2024</td>

                <td>Today, 01:58 PM</td>

                <td>
                  <span className="staff-status staff-active">
                    <i className="bi bi-check-circle-fill"></i>
                    Active
                  </span>
                </td>

                <td>
                  <button className="staff-view-btn">
                    <i className="bi bi-eye"></i>
                    View
                  </button>
                </td>
              </tr>

              {/* =================================================
                  STAFF 3
              ================================================= */}

              <tr>
                <td>
                  <div className="staff-employee">
                    <div className="staff-avatar staff-avatar-teller">
                      <i className="bi bi-person-fill"></i>
                    </div>

                    <div>
                      <strong>Neha Shah</strong>
                      <span>neha@abcbank.com</span>
                    </div>
                  </div>
                </td>

                <td>
                  <code>EMP-1003</code>
                </td>

                <td>
                  <span className="staff-role staff-role-teller">
                    <i className="bi bi-cash-register"></i>
                    Teller
                  </span>
                </td>

                <td>+91 98989 56789</td>

                <td>08 May 2024</td>

                <td>Today, 01:45 PM</td>

                <td>
                  <span className="staff-status staff-active">
                    <i className="bi bi-check-circle-fill"></i>
                    Active
                  </span>
                </td>

                <td>
                  <button className="staff-view-btn">
                    <i className="bi bi-eye"></i>
                    View
                  </button>
                </td>
              </tr>

              {/* =================================================
                  STAFF 4
              ================================================= */}

              <tr>
                <td>
                  <div className="staff-employee">
                    <div className="staff-avatar staff-avatar-officer">
                      <i className="bi bi-person-fill"></i>
                    </div>

                    <div>
                      <strong>Priya Mehta</strong>
                      <span>priya@abcbank.com</span>
                    </div>
                  </div>
                </td>

                <td>
                  <code>EMP-1004</code>
                </td>

                <td>
                  <span className="staff-role staff-role-officer">
                    <i className="bi bi-person-vcard"></i>
                    Officer
                  </span>
                </td>

                <td>+91 98123 45678</td>

                <td>15 Jun 2024</td>

                <td>Today, 12:55 PM</td>

                <td>
                  <span className="staff-status staff-inactive">
                    <i className="bi bi-dash-circle-fill"></i>
                    Inactive
                  </span>
                </td>

                <td>
                  <button className="staff-view-btn">
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
          BOTTOM INFORMATION
      ===================================================== */}

      <div className="branch-staff-bottom-grid">
        {/* Role Distribution */}

        <div className="staff-bottom-panel">
          <div className="staff-panel-header">
            <div className="staff-panel-title">
              <div className="staff-panel-icon staff-icon-purple">
                <i className="bi bi-diagram-3"></i>
              </div>

              <div>
                <h3>Role Distribution</h3>

                <p>Staff members by assigned role.</p>
              </div>
            </div>
          </div>

          <div className="staff-role-summary">
            <div className="staff-role-row">
              <div className="staff-role-label">
                <span className="staff-summary-dot staff-dot-purple"></span>

                <span>Managers</span>
              </div>

              <strong>2</strong>
            </div>

            <div className="staff-role-row">
              <div className="staff-role-label">
                <span className="staff-summary-dot staff-dot-blue"></span>

                <span>Tellers</span>
              </div>

              <strong>8</strong>
            </div>

            <div className="staff-role-row">
              <div className="staff-role-label">
                <span className="staff-summary-dot staff-dot-green"></span>

                <span>Accountants</span>
              </div>

              <strong>1</strong>
            </div>

            <div className="staff-role-row">
              <div className="staff-role-label">
                <span className="staff-summary-dot staff-dot-orange"></span>

                <span>Officers</span>
              </div>

              <strong>1</strong>
            </div>
          </div>
        </div>

        {/* Staff Activity */}

        <div className="staff-bottom-panel">
          <div className="staff-panel-header">
            <div className="staff-panel-title">
              <div className="staff-panel-icon staff-icon-green">
                <i className="bi bi-activity"></i>
              </div>

              <div>
                <h3>Staff Activity</h3>

                <p>Current branch workforce status.</p>
              </div>
            </div>
          </div>

          <div className="staff-activity-list">
            <div className="staff-activity-row">
              <div className="staff-activity-icon">
                <i className="bi bi-person-check"></i>
              </div>

              <div>
                <strong>10 Staff Active</strong>
                <span>Currently available</span>
              </div>

              <strong className="staff-activity-number">10</strong>
            </div>

            <div className="staff-activity-row">
              <div className="staff-activity-icon">
                <i className="bi bi-person-x"></i>
              </div>

              <div>
                <strong>2 Staff Inactive</strong>
                <span>Currently unavailable</span>
              </div>

              <strong className="staff-activity-number">2</strong>
            </div>

            <div className="staff-activity-row">
              <div className="staff-activity-icon">
                <i className="bi bi-clock-history"></i>
              </div>

              <div>
                <strong>10 Staff Logged In</strong>
                <span>Active today</span>
              </div>

              <strong className="staff-activity-number">10</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
