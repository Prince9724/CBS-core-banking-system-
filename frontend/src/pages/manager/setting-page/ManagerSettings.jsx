import React, { useState } from "react";
import "./ManagerSettings.css";

export default function ManagerSettings() {
  const [activeTab, setActiveTab] = useState("branch");

  const [notifications, setNotifications] = useState({
    transactions: true,
    loanRequests: true,
    staffAttendance: true,
    reports: false,
  });

  const [settings, setSettings] = useState({
    branchName: "ABC Bank Co-operative",
    branchCode: "MU123",
    branchEmail: "branch@abcbank.com",
    branchPhone: "+91 98765 43210",
    address: "Main Branch, Surat, Gujarat",
    openingTime: "09:00",
    closingTime: "18:00",
    depositLimit: "500000",
    withdrawalLimit: "250000",
  });

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const handleNotificationChange = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    });
  };

  return (
    <div className="manager-settings-page">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="manager-settings-header">
        <div>
          <span className="manager-settings-eyebrow">
            <i className="bi bi-sliders"></i>
            Branch Configuration
          </span>

          <h1>Settings</h1>

          <p>Manage your branch information, preferences and security.</p>
        </div>

        <div className="manager-settings-header-status">
          <span className="manager-settings-status-dot"></span>
          Branch Active
        </div>
      </div>

      {/* =====================================================
          SETTINGS LAYOUT
      ===================================================== */}

      <div className="manager-settings-layout">
        {/* ===================================================
            SETTINGS SIDEBAR
        =================================================== */}

        <div className="manager-settings-menu">
          <button
            type="button"
            className={`manager-settings-menu-item ${
              activeTab === "branch" ? "active" : ""
            }`}
            onClick={() => setActiveTab("branch")}
          >
            <span className="manager-settings-menu-icon">
              <i className="bi bi-bank"></i>
            </span>

            <span>
              <strong>Branch Information</strong>
              <small>Branch details</small>
            </span>
          </button>

          <button
            type="button"
            className={`manager-settings-menu-item ${
              activeTab === "profile" ? "active" : ""
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <span className="manager-settings-menu-icon">
              <i className="bi bi-person-circle"></i>
            </span>

            <span>
              <strong>Manager Profile</strong>
              <small>Your account</small>
            </span>
          </button>

          <button
            type="button"
            className={`manager-settings-menu-item ${
              activeTab === "operations" ? "active" : ""
            }`}
            onClick={() => setActiveTab("operations")}
          >
            <span className="manager-settings-menu-icon">
              <i className="bi bi-clock-history"></i>
            </span>

            <span>
              <strong>Branch Operations</strong>
              <small>Working hours & limits</small>
            </span>
          </button>

          <button
            type="button"
            className={`manager-settings-menu-item ${
              activeTab === "notifications" ? "active" : ""
            }`}
            onClick={() => setActiveTab("notifications")}
          >
            <span className="manager-settings-menu-icon">
              <i className="bi bi-bell"></i>
            </span>

            <span>
              <strong>Notifications</strong>
              <small>Alerts & updates</small>
            </span>
          </button>

          <button
            type="button"
            className={`manager-settings-menu-item ${
              activeTab === "security" ? "active" : ""
            }`}
            onClick={() => setActiveTab("security")}
          >
            <span className="manager-settings-menu-icon">
              <i className="bi bi-shield-lock"></i>
            </span>

            <span>
              <strong>Security</strong>
              <small>Password & sessions</small>
            </span>
          </button>
        </div>

        {/* ===================================================
            CONTENT
        =================================================== */}

        <div className="manager-settings-content">
          {/* =================================================
              BRANCH INFORMATION
          ================================================= */}

          {activeTab === "branch" && (
            <div className="manager-settings-section">
              <div className="manager-settings-section-header">
                <div className="manager-settings-section-icon settings-blue">
                  <i className="bi bi-bank"></i>
                </div>

                <div>
                  <h2>Branch Information</h2>

                  <p>View and manage your branch information.</p>
                </div>
              </div>

              <div className="manager-settings-form-grid">
                <div className="manager-settings-field">
                  <label>Branch Name</label>

                  <div className="manager-settings-input">
                    <i className="bi bi-building"></i>

                    <input
                      type="text"
                      name="branchName"
                      value={settings.branchName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="manager-settings-field">
                  <label>Branch Code</label>

                  <div className="manager-settings-input disabled">
                    <i className="bi bi-upc-scan"></i>

                    <input
                      type="text"
                      name="branchCode"
                      value={settings.branchCode}
                      disabled
                    />
                  </div>
                </div>

                <div className="manager-settings-field">
                  <label>Branch Email</label>

                  <div className="manager-settings-input">
                    <i className="bi bi-envelope"></i>

                    <input
                      type="email"
                      name="branchEmail"
                      value={settings.branchEmail}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="manager-settings-field">
                  <label>Branch Phone</label>

                  <div className="manager-settings-input">
                    <i className="bi bi-telephone"></i>

                    <input
                      type="tel"
                      name="branchPhone"
                      value={settings.branchPhone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="manager-settings-field full">
                  <label>Branch Address</label>

                  <div className="manager-settings-input">
                    <i className="bi bi-geo-alt"></i>

                    <input
                      type="text"
                      name="address"
                      value={settings.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="manager-settings-actions">
                <button type="button" className="manager-settings-save">
                  <i className="bi bi-check2"></i>
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* =================================================
              PROFILE
          ================================================= */}

          {activeTab === "profile" && (
            <div className="manager-settings-section">
              <div className="manager-settings-section-header">
                <div className="manager-settings-section-icon settings-purple">
                  <i className="bi bi-person-circle"></i>
                </div>

                <div>
                  <h2>Manager Profile</h2>

                  <p>Your branch manager account information.</p>
                </div>
              </div>

              <div className="manager-profile-card">
                <div className="manager-profile-avatar">
                  <i className="bi bi-person-fill"></i>
                </div>

                <div className="manager-profile-info">
                  <h3>Branch Manager</h3>

                  <span>Branch Manager</span>

                  <div className="manager-profile-meta">
                    <span>
                      <i className="bi bi-envelope"></i>
                      manager@abcbank.com
                    </span>

                    <span>
                      <i className="bi bi-bank"></i>
                      MU123
                    </span>
                  </div>
                </div>

                <button type="button" className="manager-profile-edit">
                  <i className="bi bi-pencil"></i>
                  Edit Profile
                </button>
              </div>

              <div className="manager-settings-form-grid">
                <div className="manager-settings-field">
                  <label>Full Name</label>

                  <div className="manager-settings-input">
                    <i className="bi bi-person"></i>

                    <input type="text" defaultValue="Branch Manager" />
                  </div>
                </div>

                <div className="manager-settings-field">
                  <label>Email Address</label>

                  <div className="manager-settings-input">
                    <i className="bi bi-envelope"></i>

                    <input type="email" defaultValue="manager@abcbank.com" />
                  </div>
                </div>

                <div className="manager-settings-field">
                  <label>Phone Number</label>

                  <div className="manager-settings-input">
                    <i className="bi bi-phone"></i>

                    <input type="tel" defaultValue="+91 98765 43210" />
                  </div>
                </div>

                <div className="manager-settings-field">
                  <label>Employee ID</label>

                  <div className="manager-settings-input disabled">
                    <i className="bi bi-person-badge"></i>

                    <input type="text" defaultValue="MGR-1001" disabled />
                  </div>
                </div>
              </div>

              <div className="manager-settings-actions">
                <button type="button" className="manager-settings-save">
                  <i className="bi bi-check2"></i>
                  Save Profile
                </button>
              </div>
            </div>
          )}

          {/* =================================================
              OPERATIONS
          ================================================= */}

          {activeTab === "operations" && (
            <div className="manager-settings-section">
              <div className="manager-settings-section-header">
                <div className="manager-settings-section-icon settings-orange">
                  <i className="bi bi-clock-history"></i>
                </div>

                <div>
                  <h2>Branch Operations</h2>

                  <p>Configure branch working hours and transaction limits.</p>
                </div>
              </div>

              <div className="manager-settings-subsection">
                <h3>
                  <i className="bi bi-clock"></i>
                  Working Hours
                </h3>

                <div className="manager-settings-form-grid">
                  <div className="manager-settings-field">
                    <label>Opening Time</label>

                    <div className="manager-settings-input">
                      <i className="bi bi-sun"></i>

                      <input
                        type="time"
                        name="openingTime"
                        value={settings.openingTime}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="manager-settings-field">
                    <label>Closing Time</label>

                    <div className="manager-settings-input">
                      <i className="bi bi-moon"></i>

                      <input
                        type="time"
                        name="closingTime"
                        value={settings.closingTime}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="manager-settings-subsection">
                <h3>
                  <i className="bi bi-cash-stack"></i>
                  Transaction Limits
                </h3>

                <div className="manager-settings-form-grid">
                  <div className="manager-settings-field">
                    <label>Daily Deposit Limit</label>

                    <div className="manager-settings-input">
                      <i className="bi bi-arrow-down-left"></i>

                      <input
                        type="number"
                        name="depositLimit"
                        value={settings.depositLimit}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="manager-settings-field">
                    <label>Daily Withdrawal Limit</label>

                    <div className="manager-settings-input">
                      <i className="bi bi-arrow-up-right"></i>

                      <input
                        type="number"
                        name="withdrawalLimit"
                        value={settings.withdrawalLimit}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="manager-settings-actions">
                <button type="button" className="manager-settings-save">
                  <i className="bi bi-check2"></i>
                  Save Operations
                </button>
              </div>
            </div>
          )}

          {/* =================================================
              NOTIFICATIONS
          ================================================= */}

          {activeTab === "notifications" && (
            <div className="manager-settings-section">
              <div className="manager-settings-section-header">
                <div className="manager-settings-section-icon settings-yellow">
                  <i className="bi bi-bell"></i>
                </div>

                <div>
                  <h2>Notifications</h2>

                  <p>Choose which branch activities should generate alerts.</p>
                </div>
              </div>

              <div className="manager-notification-list">
                <div className="manager-notification-item">
                  <div className="manager-notification-icon">
                    <i className="bi bi-credit-card"></i>
                  </div>

                  <div className="manager-notification-info">
                    <strong>Transaction Alerts</strong>

                    <span>
                      Get notified about important branch transactions.
                    </span>
                  </div>

                  <button
                    type="button"
                    className={`manager-switch ${
                      notifications.transactions ? "active" : ""
                    }`}
                    onClick={() => handleNotificationChange("transactions")}
                  >
                    <span></span>
                  </button>
                </div>

                <div className="manager-notification-item">
                  <div className="manager-notification-icon">
                    <i className="bi bi-bank"></i>
                  </div>

                  <div className="manager-notification-info">
                    <strong>Loan Request Alerts</strong>

                    <span>Receive notifications for new loan requests.</span>
                  </div>

                  <button
                    type="button"
                    className={`manager-switch ${
                      notifications.loanRequests ? "active" : ""
                    }`}
                    onClick={() => handleNotificationChange("loanRequests")}
                  >
                    <span></span>
                  </button>
                </div>

                <div className="manager-notification-item">
                  <div className="manager-notification-icon">
                    <i className="bi bi-calendar-check"></i>
                  </div>

                  <div className="manager-notification-info">
                    <strong>Staff Attendance</strong>

                    <span>Receive alerts about staff attendance activity.</span>
                  </div>

                  <button
                    type="button"
                    className={`manager-switch ${
                      notifications.staffAttendance ? "active" : ""
                    }`}
                    onClick={() => handleNotificationChange("staffAttendance")}
                  >
                    <span></span>
                  </button>
                </div>

                <div className="manager-notification-item">
                  <div className="manager-notification-icon">
                    <i className="bi bi-bar-chart"></i>
                  </div>

                  <div className="manager-notification-info">
                    <strong>Report Notifications</strong>

                    <span>Receive periodic branch performance reports.</span>
                  </div>

                  <button
                    type="button"
                    className={`manager-switch ${
                      notifications.reports ? "active" : ""
                    }`}
                    onClick={() => handleNotificationChange("reports")}
                  >
                    <span></span>
                  </button>
                </div>
              </div>

              <div className="manager-settings-actions">
                <button type="button" className="manager-settings-save">
                  <i className="bi bi-check2"></i>
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {/* =================================================
              SECURITY
          ================================================= */}

          {activeTab === "security" && (
            <div className="manager-settings-section">
              <div className="manager-settings-section-header">
                <div className="manager-settings-section-icon settings-red">
                  <i className="bi bi-shield-lock"></i>
                </div>

                <div>
                  <h2>Security</h2>

                  <p>Manage your account security and active sessions.</p>
                </div>
              </div>

              <div className="manager-security-alert">
                <div className="manager-security-alert-icon">
                  <i className="bi bi-shield-check"></i>
                </div>

                <div>
                  <strong>Your account is protected</strong>

                  <span>No suspicious activity has been detected.</span>
                </div>
              </div>

              <div className="manager-security-option">
                <div className="manager-security-option-icon">
                  <i className="bi bi-key"></i>
                </div>

                <div className="manager-security-option-content">
                  <strong>Change Password</strong>

                  <span>Update your account password regularly.</span>
                </div>

                <button type="button" className="manager-security-action">
                  Change
                  <i className="bi bi-chevron-right"></i>
                </button>
              </div>

              <div className="manager-security-option">
                <div className="manager-security-option-icon">
                  <i className="bi bi-phone"></i>
                </div>

                <div className="manager-security-option-content">
                  <strong>Two-Factor Authentication</strong>

                  <span>Add another layer of protection to your account.</span>
                </div>

                <button type="button" className="manager-switch">
                  <span></span>
                </button>
              </div>

              <div className="manager-security-option">
                <div className="manager-security-option-icon">
                  <i className="bi bi-display"></i>
                </div>

                <div className="manager-security-option-content">
                  <strong>Active Sessions</strong>

                  <span>
                    Review devices currently signed into your account.
                  </span>
                </div>

                <button type="button" className="manager-security-action">
                  View
                  <i className="bi bi-chevron-right"></i>
                </button>
              </div>

              <div className="manager-settings-danger-zone">
                <div>
                  <strong>
                    <i className="bi bi-exclamation-triangle"></i>
                    Sign out all other devices
                  </strong>

                  <span>
                    End all active sessions except your current session.
                  </span>
                </div>

                <button type="button" className="manager-danger-button">
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
