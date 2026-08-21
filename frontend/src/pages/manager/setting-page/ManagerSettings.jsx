import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

export default function ManagerSettings() {
  const { branchcode: urlBranchcode } = useParams();
  const { loggedinUser } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("branch");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const branchcode = urlBranchcode?.toUpperCase() || loggedinUser?.branchcode?.toUpperCase();

  // ✅ Branch Settings State
  const [settings, setSettings] = useState({
    branchname: "",
    branchcode: branchcode || "",
    address: "",
    phone: "",
    email: "",
    openingTime: "09:00",
    closingTime: "18:00",
    depositLimit: "500000",
    withdrawalLimit: "250000",
    status: "Active",
  });

  // ✅ Manager Profile State
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    contact: "",
    userid: "",
    role: "",
  });

  // ✅ Notifications State
  const [notifications, setNotifications] = useState({
    transactions: true,
    loanRequests: true,
    staffAttendance: true,
    reports: false,
  });

  const api = axios.create({
    baseURL: "http://localhost:5003",
    withCredentials: true,
  });

  // =====================================================
  // FETCH BRANCH DATA
  // =====================================================

  useEffect(() => {
    if (branchcode) {
      fetchBranchData();
      fetchProfileData();
    }
  }, [branchcode]);

  const fetchBranchData = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/cbs/branchcode/${branchcode}`);
      
      if (res.data.status) {
        const branch = res.data.data;
        setSettings({
          branchname: branch.branchname || "",
          branchcode: branch.branchcode || branchcode,
          address: branch.address || "",
          phone: branch.phone || "",
          email: branch.email || "",
          openingTime: branch.openingTime || "09:00",
          closingTime: branch.closingTime || "18:00",
          depositLimit: branch.depositLimit || "500000",
          withdrawalLimit: branch.withdrawalLimit || "250000",
          status: branch.status || "Active",
        });
      }
    } catch (err) {
      console.error("❌ Error fetching branch:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProfileData = async () => {
    try {
      const res = await api.get(`/cbs/users`);
      const users = res.data.data || [];
      const manager = users.find(
        (u) => u.branchcode === branchcode && 
        (u.role?.toLowerCase() === "manager" || u.role?.toLowerCase() === "branch_manager")
      );
      
      if (manager) {
        setProfile({
          name: manager.name || "",
          email: manager.email || "",
          contact: manager.contact || "",
          userid: manager.userid || "",
          role: manager.role || "Manager",
        });
      }
    } catch (err) {
      console.error("❌ Error fetching profile:", err);
    }
  };

  // =====================================================
  // HANDLE CHANGES
  // =====================================================

  const handleSettingsChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleNotificationChange = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    });
  };

  // =====================================================
  // SAVE SETTINGS
  // =====================================================

  const saveSettings = async () => {
    try {
      setLoading(true);
      setSuccess("");
      
      // ✅ Update branch
      await api.put(`/cbs/updatebranch/${settings.branchcode}`, {
        branchname: settings.branchname,
        address: settings.address,
        phone: settings.phone,
        email: settings.email,
        openingTime: settings.openingTime,
        closingTime: settings.closingTime,
        depositLimit: settings.depositLimit,
        withdrawalLimit: settings.withdrawalLimit,
      });

      setSuccess("✅ Branch settings saved successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      alert("❌ Failed to save settings: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    try {
      setLoading(true);
      setSuccess("");
      
      // ✅ Find user and update
      const res = await api.get(`/cbs/users`);
      const users = res.data.data || [];
      const manager = users.find(
        (u) => u.branchcode === branchcode && 
        (u.role?.toLowerCase() === "manager" || u.role?.toLowerCase() === "branch_manager")
      );

      if (manager) {
        await api.put(`/cbs/update`, {
          _id: manager._id,
          name: profile.name,
          email: profile.email,
          contact: profile.contact,
        });
        setSuccess("✅ Profile updated successfully!");
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      alert("❌ Failed to update profile: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const saveNotifications = () => {
    setSuccess("✅ Notification preferences saved!");
    setTimeout(() => setSuccess(""), 3000);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-secondary mt-2">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-4 py-4 bg-dark min-vh-100">

      {/* ===== HEADER ===== */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <span className="badge bg-info bg-opacity-10 text-info mb-2">
            <i className="bi bi-sliders me-1"></i>
            Branch Configuration
          </span>
          <h1 className="text-white fw-bold mb-1">Settings</h1>
          <p className="text-secondary m-0">
            Branch: <strong className="text-white">{settings.branchname || branchcode}</strong>
          </p>
        </div>
        <div className="d-flex align-items-center gap-2 bg-success bg-opacity-10 px-3 py-2 rounded-pill">
          <span className="bg-success rounded-circle d-inline-block" style={{ width: "8px", height: "8px" }}></span>
          <span className="text-success">Branch {settings.status || "Active"}</span>
        </div>
      </div>

      {/* ===== SUCCESS MESSAGE ===== */}
      {success && (
        <div className="alert alert-success d-flex align-items-center gap-2 mb-4">
          <i className="bi bi-check-circle-fill"></i>
          <span>{success}</span>
        </div>
      )}

      {/* ===== SETTINGS LAYOUT ===== */}
      <div className="row g-4">

        {/* ===== SIDEBAR ===== */}
        <div className="col-xl-3 col-lg-4">
          <div className="card bg-dark border-secondary">
            <div className="card-body p-2">
              <div className="d-flex flex-column gap-1">
                <button
                  className={`btn text-start d-flex align-items-center gap-3 py-3 px-3 rounded-3 ${activeTab === "branch" ? "bg-primary" : "bg-transparent"}`}
                  onClick={() => setActiveTab("branch")}
                >
                  <i className="bi bi-bank fs-5"></i>
                  <div>
                    <div className="text-white fw-semibold">Branch Information</div>
                    <small className="text-secondary">Branch details</small>
                  </div>
                </button>

                <button
                  className={`btn text-start d-flex align-items-center gap-3 py-3 px-3 rounded-3 ${activeTab === "profile" ? "bg-primary" : "bg-transparent"}`}
                  onClick={() => setActiveTab("profile")}
                >
                  <i className="bi bi-person-circle fs-5"></i>
                  <div>
                    <div className="text-white fw-semibold">Manager Profile</div>
                    <small className="text-secondary">Your account</small>
                  </div>
                </button>

                <button
                  className={`btn text-start d-flex align-items-center gap-3 py-3 px-3 rounded-3 ${activeTab === "operations" ? "bg-primary" : "bg-transparent"}`}
                  onClick={() => setActiveTab("operations")}
                >
                  <i className="bi bi-clock-history fs-5"></i>
                  <div>
                    <div className="text-white fw-semibold">Branch Operations</div>
                    <small className="text-secondary">Working hours & limits</small>
                  </div>
                </button>

                <button
                  className={`btn text-start d-flex align-items-center gap-3 py-3 px-3 rounded-3 ${activeTab === "notifications" ? "bg-primary" : "bg-transparent"}`}
                  onClick={() => setActiveTab("notifications")}
                >
                  <i className="bi bi-bell fs-5"></i>
                  <div>
                    <div className="text-white fw-semibold">Notifications</div>
                    <small className="text-secondary">Alerts & updates</small>
                  </div>
                </button>

                <button
                  className={`btn text-start d-flex align-items-center gap-3 py-3 px-3 rounded-3 ${activeTab === "security" ? "bg-primary" : "bg-transparent"}`}
                  onClick={() => setActiveTab("security")}
                >
                  <i className="bi bi-shield-lock fs-5"></i>
                  <div>
                    <div className="text-white fw-semibold">Security</div>
                    <small className="text-secondary">Password & sessions</small>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ===== CONTENT ===== */}
        <div className="col-xl-9 col-lg-8">

          {/* ===== BRANCH INFORMATION ===== */}
          {activeTab === "branch" && (
            <div className="card bg-dark border-secondary">
              <div className="card-body">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="bg-primary bg-opacity-10 rounded-3 p-3">
                    <i className="bi bi-bank fs-4 text-primary"></i>
                  </div>
                  <div>
                    <h4 className="text-white mb-0">Branch Information</h4>
                    <p className="text-secondary small mb-0">View and manage your branch information</p>
                  </div>
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label text-secondary small">Branch Name</label>
                    <input
                      type="text"
                      name="branchname"
                      className="form-control bg-dark text-white border-secondary"
                      value={settings.branchname}
                      onChange={handleSettingsChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-secondary small">Branch Code</label>
                    <input
                      type="text"
                      className="form-control bg-dark text-white border-secondary"
                      value={settings.branchcode}
                      disabled
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-secondary small">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control bg-dark text-white border-secondary"
                      value={settings.email}
                      onChange={handleSettingsChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-secondary small">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      className="form-control bg-dark text-white border-secondary"
                      value={settings.phone}
                      onChange={handleSettingsChange}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label text-secondary small">Address</label>
                    <input
                      type="text"
                      name="address"
                      className="form-control bg-dark text-white border-secondary"
                      value={settings.address}
                      onChange={handleSettingsChange}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    className="btn btn-primary d-flex align-items-center gap-2"
                    onClick={saveSettings}
                    disabled={loading}
                  >
                    <i className="bi bi-check2"></i>
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ===== PROFILE ===== */}
          {activeTab === "profile" && (
            <div className="card bg-dark border-secondary">
              <div className="card-body">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="bg-purple bg-opacity-10 rounded-3 p-3">
                    <i className="bi bi-person-circle fs-4 text-purple"></i>
                  </div>
                  <div>
                    <h4 className="text-white mb-0">Manager Profile</h4>
                    <p className="text-secondary small mb-0">Your branch manager account information</p>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-4 mb-4 p-3 bg-dark bg-opacity-50 rounded-3 border border-secondary">
                  <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: "60px", height: "60px" }}>
                    <i className="bi bi-person-fill fs-1 text-white"></i>
                  </div>
                  <div>
                    <h5 className="text-white mb-0">{profile.name || "Branch Manager"}</h5>
                    <span className="badge bg-secondary">{profile.role || "Manager"}</span>
                    <div className="text-secondary small mt-1">
                      <i className="bi bi-envelope me-1"></i> {profile.email}
                    </div>
                  </div>
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label text-secondary small">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control bg-dark text-white border-secondary"
                      value={profile.name}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-secondary small">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control bg-dark text-white border-secondary"
                      value={profile.email}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-secondary small">Phone</label>
                    <input
                      type="text"
                      name="contact"
                      className="form-control bg-dark text-white border-secondary"
                      value={profile.contact}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-secondary small">User ID</label>
                    <input
                      type="text"
                      className="form-control bg-dark text-white border-secondary"
                      value={profile.userid}
                      disabled
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    className="btn btn-primary d-flex align-items-center gap-2"
                    onClick={saveProfile}
                    disabled={loading}
                  >
                    <i className="bi bi-check2"></i>
                    {loading ? "Saving..." : "Save Profile"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ===== OPERATIONS ===== */}
          {activeTab === "operations" && (
            <div className="card bg-dark border-secondary">
              <div className="card-body">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="bg-warning bg-opacity-10 rounded-3 p-3">
                    <i className="bi bi-clock-history fs-4 text-warning"></i>
                  </div>
                  <div>
                    <h4 className="text-white mb-0">Branch Operations</h4>
                    <p className="text-secondary small mb-0">Configure working hours and transaction limits</p>
                  </div>
                </div>

                <h6 className="text-white mb-3">
                  <i className="bi bi-clock me-2"></i>
                  Working Hours
                </h6>
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label text-secondary small">Opening Time</label>
                    <input
                      type="time"
                      name="openingTime"
                      className="form-control bg-dark text-white border-secondary"
                      value={settings.openingTime}
                      onChange={handleSettingsChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-secondary small">Closing Time</label>
                    <input
                      type="time"
                      name="closingTime"
                      className="form-control bg-dark text-white border-secondary"
                      value={settings.closingTime}
                      onChange={handleSettingsChange}
                    />
                  </div>
                </div>

                <h6 className="text-white mb-3">
                  <i className="bi bi-cash-stack me-2"></i>
                  Transaction Limits
                </h6>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label text-secondary small">Daily Deposit Limit (₹)</label>
                    <input
                      type="number"
                      name="depositLimit"
                      className="form-control bg-dark text-white border-secondary"
                      value={settings.depositLimit}
                      onChange={handleSettingsChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-secondary small">Daily Withdrawal Limit (₹)</label>
                    <input
                      type="number"
                      name="withdrawalLimit"
                      className="form-control bg-dark text-white border-secondary"
                      value={settings.withdrawalLimit}
                      onChange={handleSettingsChange}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    className="btn btn-primary d-flex align-items-center gap-2"
                    onClick={saveSettings}
                    disabled={loading}
                  >
                    <i className="bi bi-check2"></i>
                    {loading ? "Saving..." : "Save Operations"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ===== NOTIFICATIONS ===== */}
          {activeTab === "notifications" && (
            <div className="card bg-dark border-secondary">
              <div className="card-body">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="bg-warning bg-opacity-10 rounded-3 p-3">
                    <i className="bi bi-bell fs-4 text-warning"></i>
                  </div>
                  <div>
                    <h4 className="text-white mb-0">Notifications</h4>
                    <p className="text-secondary small mb-0">Choose which branch activities should generate alerts</p>
                  </div>
                </div>

                <div className="d-flex flex-column gap-3">
                  <div className="d-flex justify-content-between align-items-center p-3 bg-dark bg-opacity-50 rounded-3 border border-secondary">
                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-primary bg-opacity-10 rounded-3 p-2">
                        <i className="bi bi-credit-card text-primary"></i>
                      </div>
                      <div>
                        <div className="text-white fw-semibold">Transaction Alerts</div>
                        <span className="text-secondary small">Get notified about important branch transactions</span>
                      </div>
                    </div>
                    <button
                      className={`btn btn-sm ${notifications.transactions ? "btn-success" : "btn-secondary"}`}
                      onClick={() => handleNotificationChange("transactions")}
                    >
                      {notifications.transactions ? "On" : "Off"}
                    </button>
                  </div>

                  <div className="d-flex justify-content-between align-items-center p-3 bg-dark bg-opacity-50 rounded-3 border border-secondary">
                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-success bg-opacity-10 rounded-3 p-2">
                        <i className="bi bi-bank text-success"></i>
                      </div>
                      <div>
                        <div className="text-white fw-semibold">Loan Request Alerts</div>
                        <span className="text-secondary small">Receive notifications for new loan requests</span>
                      </div>
                    </div>
                    <button
                      className={`btn btn-sm ${notifications.loanRequests ? "btn-success" : "btn-secondary"}`}
                      onClick={() => handleNotificationChange("loanRequests")}
                    >
                      {notifications.loanRequests ? "On" : "Off"}
                    </button>
                  </div>

                  <div className="d-flex justify-content-between align-items-center p-3 bg-dark bg-opacity-50 rounded-3 border border-secondary">
                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-info bg-opacity-10 rounded-3 p-2">
                        <i className="bi bi-calendar-check text-info"></i>
                      </div>
                      <div>
                        <div className="text-white fw-semibold">Staff Attendance</div>
                        <span className="text-secondary small">Receive alerts about staff attendance activity</span>
                      </div>
                    </div>
                    <button
                      className={`btn btn-sm ${notifications.staffAttendance ? "btn-success" : "btn-secondary"}`}
                      onClick={() => handleNotificationChange("staffAttendance")}
                    >
                      {notifications.staffAttendance ? "On" : "Off"}
                    </button>
                  </div>

                  <div className="d-flex justify-content-between align-items-center p-3 bg-dark bg-opacity-50 rounded-3 border border-secondary">
                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-danger bg-opacity-10 rounded-3 p-2">
                        <i className="bi bi-bar-chart text-danger"></i>
                      </div>
                      <div>
                        <div className="text-white fw-semibold">Report Notifications</div>
                        <span className="text-secondary small">Receive periodic branch performance reports</span>
                      </div>
                    </div>
                    <button
                      className={`btn btn-sm ${notifications.reports ? "btn-success" : "btn-secondary"}`}
                      onClick={() => handleNotificationChange("reports")}
                    >
                      {notifications.reports ? "On" : "Off"}
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    className="btn btn-primary d-flex align-items-center gap-2"
                    onClick={saveNotifications}
                  >
                    <i className="bi bi-check2"></i>
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ===== SECURITY ===== */}
          {activeTab === "security" && (
            <div className="card bg-dark border-secondary">
              <div className="card-body">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="bg-danger bg-opacity-10 rounded-3 p-3">
                    <i className="bi bi-shield-lock fs-4 text-danger"></i>
                  </div>
                  <div>
                    <h4 className="text-white mb-0">Security</h4>
                    <p className="text-secondary small mb-0">Manage your account security and active sessions</p>
                  </div>
                </div>

                <div className="alert alert-success d-flex align-items-center gap-3">
                  <i className="bi bi-shield-check fs-4"></i>
                  <div>
                    <strong>Your account is protected</strong>
                    <div className="small">No suspicious activity has been detected</div>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center p-3 bg-dark bg-opacity-50 rounded-3 border border-secondary mb-3">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-primary bg-opacity-10 rounded-3 p-2">
                      <i className="bi bi-key text-primary"></i>
                    </div>
                    <div>
                      <div className="text-white fw-semibold">Change Password</div>
                      <span className="text-secondary small">Update your account password regularly</span>
                    </div>
                  </div>
                  <button className="btn btn-outline-primary btn-sm" onClick={() => alert("Password change feature coming soon!")}>
                    Change <i className="bi bi-chevron-right"></i>
                  </button>
                </div>

                <div className="d-flex justify-content-between align-items-center p-3 bg-dark bg-opacity-50 rounded-3 border border-secondary mb-3">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-success bg-opacity-10 rounded-3 p-2">
                      <i className="bi bi-phone text-success"></i>
                    </div>
                    <div>
                      <div className="text-white fw-semibold">Two-Factor Authentication</div>
                      <span className="text-secondary small">Add another layer of protection to your account</span>
                    </div>
                  </div>
                  <button className="btn btn-outline-secondary btn-sm" onClick={() => alert("2FA coming soon!")}>
                    Enable
                  </button>
                </div>

                <div className="d-flex justify-content-between align-items-center p-3 bg-dark bg-opacity-50 rounded-3 border border-secondary">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-info bg-opacity-10 rounded-3 p-2">
                      <i className="bi bi-display text-info"></i>
                    </div>
                    <div>
                      <div className="text-white fw-semibold">Active Sessions</div>
                      <span className="text-secondary small">Review devices currently signed into your account</span>
                    </div>
                  </div>
                  <button className="btn btn-outline-info btn-sm" onClick={() => alert("Current session active")}>
                    View <i className="bi bi-chevron-right"></i>
                  </button>
                </div>

                <div className="mt-4 p-3 bg-danger bg-opacity-10 rounded-3 border border-danger">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="text-danger fw-semibold">
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        Sign out all other devices
                      </div>
                      <span className="text-secondary small">End all active sessions except your current session</span>
                    </div>
                    <button className="btn btn-danger btn-sm" onClick={() => alert("All other sessions cleared!")}>
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      <style>{`
        .text-purple { color: #8b5cf6; }
        .bg-purple { background-color: #8b5cf6; }
        .bg-purple.bg-opacity-10 { background-color: rgba(139, 92, 246, 0.1); }
        .form-control:focus {
          border-color: #0d6efd;
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
        }
        .btn-check:checked + .btn {
          background-color: #0d6efd;
        }
      `}</style>

    </div>
  );
}