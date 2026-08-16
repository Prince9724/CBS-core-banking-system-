import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BsSearch,
  BsFilter,
  BsPlusLg,
  BsEye,
  BsPencil,
  BsTrash,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import { HiOutlineUsers, HiOutlineUserGroup } from "react-icons/hi2";
import { PiUserSwitchDuotone } from "react-icons/pi";
import { RiShieldUserLine } from "react-icons/ri";
import { FaRegEye } from "react-icons/fa";
import { TbShieldCog } from "react-icons/tb";
import "./userroles.css";
import { Link } from "react-router-dom";

export default function UsersRoles() {
  const [activePage, setActivePage] = useState(1);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [branches, setBranches] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  // ✅ Stats - Real data se update hoga
  const [stats, setStats] = useState([
    {
      label: "Total Users",
      value: 0,
      sub: "Managers + Tellers + Admin",
      icon: <HiOutlineUsers />,
      accent: "ur-accent-blue",
    },
    {
      label: "Managers",
      value: 0,
      sub: "Branch managers",
      icon: <HiOutlineUserGroup />,
      accent: "ur-accent-green",
    },
    {
      label: "Tellers",
      value: 0,
      sub: "Cash operators",
      icon: <TbShieldCog />,
      accent: "ur-accent-amber",
    },
    {
      label: "Branches",
      value: 0,
      sub: "Available branches",
      icon: <PiUserSwitchDuotone />,
      accent: "ur-accent-red",
    },
    {
      label: "Accounts",
      value: 0,
      sub: "Total bank accounts",
      icon: <PiUserSwitchDuotone />,
      accent: "ur-accent-purple",
    },
  ]);

  // ✅ Role Overview
  const [roleOverview, setRoleOverview] = useState([
    {
      name: "Super Admin",
      count: "0 Users",
      icon: <RiShieldUserLine />,
      accent: "ur-accent-blue",
    },
    {
      name: "Branch Manager",
      count: "0 Users",
      icon: <HiOutlineUserGroup />,
      accent: "ur-accent-blue",
    },
    {
      name: "Teller",
      count: "0 Users",
      icon: <HiOutlineUsers />,
      accent: "ur-accent-green",
    },
    {
      name: "Customer Service",
      count: "0 Users",
      icon: <HiOutlineUserGroup />,
      accent: "ur-accent-amber",
    },
    {
      name: "Auditor",
      count: "0 Users",
      icon: <RiShieldUserLine />,
      accent: "ur-accent-purple",
    },
    {
      name: "Viewer",
      count: "0 Users",
      icon: <FaRegEye />,
      accent: "ur-accent-gray",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    userid: "",
    email: "",
    contact: "",
    password: "",
    role: "manager",
    branchname: "",
    branchcode: "",
  });

  // ========== ✅ FETCH USERS ==========
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5003/cbs/getusers", {
        withCredentials: true,
      });

      console.log("📊 Users Response:", res.data);

      if (res.data.status) {
        const userData = res.data.data || [];
        setUsers(userData);
        updateStats(userData, branches, accounts);
      }
    } catch (err) {
      setError("Failed to fetch users");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  // ========== ✅ FETCH BRANCHES ==========
  const fetchBranches = async () => {
    try {
      const res = await axios.get("http://localhost:5003/cbs/getbranch", {
        withCredentials: true,
      });

      console.log("🏢 Branches Response:", res.data);

      if (res.data.status) {
        const branchData = res.data.data || [];
        setBranches(branchData);
        updateStats(users, branchData, accounts);
      }
    } catch (err) {
      console.error("Error fetching branches:", err);
    }
  };

  // ========== ✅ FETCH ACCOUNTS ==========
  const fetchAccounts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5003/cbs/customer/accounts",
        { withCredentials: true }
      );

      console.log("🏦 Accounts Response:", res.data);

      if (res.data.status) {
        const accountData = res.data.data || [];
        setAccounts(accountData);
        updateStats(users, branches, accountData);
      }
    } catch (err) {
      console.error("Error fetching accounts:", err);
    }
  };

  // ========== ✅ UPDATE STATS FUNCTION ==========
  const updateStats = (userData, branchData, accountData) => {
    const managers = userData.filter(
      (u) => u.role?.toLowerCase() === "manager"
    );
    const tellers = userData.filter(
      (u) => u.role?.toLowerCase() === "teller"
    );
    const admins = userData.filter((u) => u.role?.toLowerCase() === "admin");

    // ✅ Update Stats
    setStats([
      {
        label: "Total Users",
        value: userData.length,
        sub: "Managers + Tellers + Admin",
        icon: <HiOutlineUsers />,
        accent: "ur-accent-blue",
      },
      {
        label: "Managers",
        value: managers.length,
        sub: "Branch managers",
        icon: <HiOutlineUserGroup />,
        accent: "ur-accent-green",
      },
      {
        label: "Tellers",
        value: tellers.length,
        sub: "Cash operators",
        icon: <TbShieldCog />,
        accent: "ur-accent-amber",
      },
      {
        label: "Branches",
        value: branchData.length || 0,
        sub: "Available branches",
        icon: <PiUserSwitchDuotone />,
        accent: "ur-accent-red",
      },
      {
        label: "Accounts",
        value: accountData.length || 0,
        sub: "Total bank accounts",
        icon: <PiUserSwitchDuotone />,
        accent: "ur-accent-purple",
      },
    ]);

    // ✅ Update Role Overview
    setRoleOverview([
      {
        name: "Super Admin",
        count: `${admins.length} Users`,
        icon: <RiShieldUserLine />,
        accent: "ur-accent-blue",
      },
      {
        name: "Branch Manager",
        count: `${managers.length} Users`,
        icon: <HiOutlineUserGroup />,
        accent: "ur-accent-blue",
      },
      {
        name: "Teller",
        count: `${tellers.length} Users`,
        icon: <HiOutlineUsers />,
        accent: "ur-accent-green",
      },
      {
        name: "Customer Service",
        count: "0 Users",
        icon: <HiOutlineUserGroup />,
        accent: "ur-accent-amber",
      },
      {
        name: "Auditor",
        count: "0 Users",
        icon: <RiShieldUserLine />,
        accent: "ur-accent-purple",
      },
      {
        name: "Viewer",
        count: "0 Users",
        icon: <FaRegEye />,
        accent: "ur-accent-gray",
      },
    ]);
  };

  // ========== ✅ EFFECT - Load All Data ==========
  useEffect(() => {
    fetchUsers();
    fetchBranches();
    fetchAccounts();
  }, []);

  // ========== ✅ FILTER USERS ==========
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userid?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole =
      roleFilter === "All Roles" ||
      user.role?.toLowerCase() === roleFilter.toLowerCase();

    const matchesStatus =
      statusFilter === "All Statuses" ||
      user.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / 6);
  const paginatedUsers = filteredUsers.slice(
    (activePage - 1) * 6,
    activePage * 6
  );

  // ========== ✅ ADD/UPDATE USER ==========
  const handleAddUser = async () => {
    try {
      if (editId) {
        await axios.put(
          "http://localhost:5003/cbs/update",
          { ...formData, _id: editId },
          { withCredentials: true }
        );
        alert("User updated successfully");
      } else {
        await axios.post(
          "http://localhost:5003/cbs/addrole",
          formData,
          { withCredentials: true }
        );
        alert("User added successfully");
      }

      setShowModal(false);
      setEditId(null);
      setFormData({
        name: "",
        userid: "",
        email: "",
        contact: "",
        password: "",
        role: "manager",
        branchname: "",
        branchcode: "",
      });

      fetchUsers();
      fetchBranches();
      fetchAccounts();
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Failed to save user");
    }
  };

  // ========== ✅ DELETE USER ==========
  const handleDeleteUser = async (id, name) => {
    if (!window.confirm(`Delete ${name}?`)) return;

    try {
      await axios.delete(`http://localhost:5003/cbs/deleteuser?id=${id}`, {
        withCredentials: true,
      });
      alert("User deleted successfully");
      fetchUsers();
      fetchBranches();
      fetchAccounts();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <div className="ur-page">
      {/* ===== HEADER ===== */}
      <div className="ur-header">
        <div className="ur-crumb">
          <Link to={"/admin"} className="">
            <span className="ur-crumb-link">Dashboard</span>
          </Link>
          <span className="ur-crumb-sep">›</span>
          <span className="ur-crumb-current">Users & Roles</span>
        </div>
      </div>

      <div className="ur-title-row">
        <div>
          <h2>Users & Roles</h2>
          <p>Manage system users and their roles &amp; permissions</p>
        </div>
        <button
          className="btn btn-primary ur-add-btn"
          onClick={() => {
            setEditId(null);
            setFormData({
              name: "",
              userid: "",
              email: "",
              contact: "",
              password: "",
              role: "manager",
              branchname: "",
              branchcode: "",
            });
            setShowModal(true);
          }}
        >
          <BsPlusLg className="ur-btn-icon" />
          Add New User
        </button>
      </div>

      {/* ===== STATS - REAL DATA ===== */}
      <div className="ur-stats-grid">
        {stats.map((s, i) => (
          <div className="ur-stat-card" key={i}>
            <div className={`ur-stat-icon ${s.accent}`}>{s.icon}</div>
            <div className="ur-stat-text">
              <span className="ur-stat-label">{s.label}</span>
              <span className="ur-stat-value">{s.value}</span>
              <span className="ur-stat-sub">{s.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ===== FILTERS ===== */}
      <div className="ur-filters">
        <div className="ur-search-box">
          <BsSearch className="ur-search-icon" />
          <input
            type="text"
            placeholder="Search users by name, email or role..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setActivePage(1);
            }}
          />
        </div>

        <select
          className="ur-select"
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setActivePage(1);
          }}
        >
          <option>All Roles</option>
          <option>manager</option>
          <option>teller</option>
          <option>admin</option>
        </select>

        <select
          className="ur-select"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setActivePage(1);
          }}
        >
          <option>All Statuses</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <button
          className="ur-filter-btn"
          onClick={() => {
            setSearchTerm("");
            setRoleFilter("All Roles");
            setStatusFilter("All Statuses");
            setActivePage(1);
          }}
        >
          <BsFilter className="ur-btn-icon" />
          Reset
        </button>
      </div>

      {/* ===== TABLE ===== */}
      <div className="ur-table-card">
        <div className="ur-table-wrap">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : paginatedUsers.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">No users found</p>
            </div>
          ) : (
            <table className="ur-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Branch</th>
                  <th>Status</th>
                  <th className="ur-actions-head">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((u, i) => (
                  <tr key={i}>
                    <td data-label="User">
                      <div className="ur-user-cell">
                        <div className="ur-avatar">
                          {u?.name?.charAt(0) || "U"}
                        </div>
                        <div>
                          <div className="ur-user-name">{u.name}</div>
                          <div className="ur-user-phone">{u.contact}</div>
                        </div>
                      </div>
                    </td>
                    <td data-label="Email">{u.email}</td>
                    <td data-label="Role">
                      <span
                        className={`ur-role-badge ${
                          u.role === "manager"
                            ? "ur-role-manager"
                            : u.role === "admin"
                            ? "ur-role-admin"
                            : "ur-role-teller"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td data-label="Branch">{u.branchname || "N/A"}</td>
                    <td data-label="Status">
                      <span
                        className={`ur-status-badge ${
                          u.status === "Active" || !u.status
                            ? "bg-success"
                            : "bg-secondary"
                        }`}
                      >
                        {u.status || "Active"}
                      </span>
                    </td>
                    <td data-label="Actions">
                      <div className="ur-action-buttons">
                        <button
                          className="ur-action-btn ur-action-view"
                          title="View"
                        >
                          <BsEye />
                        </button>
                        <button
                          className="ur-action-btn ur-action-edit"
                          title="Edit"
                          onClick={() => {
                            setEditId(u._id);
                            setFormData({
                              name: u.name,
                              userid: u.userid,
                              email: u.email,
                              contact: u.contact,
                              password: "",
                              role: u.role || "manager",
                              branchname: u.branchname || "",
                              branchcode: u.branchcode || "",
                            });
                            setShowModal(true);
                          }}
                        >
                          <BsPencil />
                        </button>
                        <button
                          className="ur-action-btn ur-action-delete"
                          title="Delete"
                          onClick={() => handleDeleteUser(u._id, u.name)}
                        >
                          <BsTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* ===== PAGINATION ===== */}
        {filteredUsers.length > 6 && (
          <div className="ur-pagination">
            <span className="ur-pagination-info">
              Showing {Math.min((activePage - 1) * 6 + 1, filteredUsers.length)}{" "}
              to {Math.min(activePage * 6, filteredUsers.length)} of{" "}
              {filteredUsers.length} users
            </span>
            <div className="ur-pagination-controls">
              <button
                className="ur-page-nav"
                disabled={activePage === 1}
                onClick={() => setActivePage((p) => Math.max(1, p - 1))}
              >
                <BsChevronLeft />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`ur-page-btn ${
                    activePage === i + 1 ? "ur-page-active" : ""
                  }`}
                  onClick={() => setActivePage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="ur-page-nav"
                disabled={activePage === totalPages}
                onClick={() => setActivePage((p) => Math.min(totalPages, p + 1))}
              >
                <BsChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ===== ROLES OVERVIEW - REAL DATA ===== */}
      <div className="ur-roles-overview">
        <h5>Roles Overview</h5>
        <div className="ur-roles-grid">
          {roleOverview.map((r, i) => (
            <div className="ur-role-card" key={i}>
              <div className={`ur-role-icon ${r.accent}`}>{r.icon}</div>
              <div>
                <div className="ur-role-name">{r.name}</div>
                <div className="ur-role-count">{r.count}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== MODAL ===== */}
      {showModal && (
        <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editId ? "Edit User" : "Add User"}
                </h5>
                <button
                  className="btn-close btn-close-white"
                  onClick={() => {
                    setShowModal(false);
                    setEditId(null);
                  }}
                />
              </div>

              <div className="modal-body">
                <input
                  className="form-control mb-2 bg-secondary bg-opacity-25 text-white border-secondary"
                  placeholder="Full Name *"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />

                <input
                  className="form-control mb-2 bg-secondary bg-opacity-25 text-white border-secondary"
                  placeholder="User ID *"
                  value={formData.userid}
                  onChange={(e) =>
                    setFormData({ ...formData, userid: e.target.value })
                  }
                  disabled={!!editId}
                />

                <input
                  className="form-control mb-2 bg-secondary bg-opacity-25 text-white border-secondary"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />

                <input
                  className="form-control mb-2 bg-secondary bg-opacity-25 text-white border-secondary"
                  placeholder="Contact *"
                  value={formData.contact}
                  onChange={(e) =>
                    setFormData({ ...formData, contact: e.target.value })
                  }
                />

                <input
                  type="password"
                  className="form-control mb-2 bg-secondary bg-opacity-25 text-white border-secondary"
                  placeholder={editId ? "New Password (optional)" : "Password *"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />

                <select
                  className="form-select mb-2 bg-secondary bg-opacity-25 text-white border-secondary"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                >
                  <option value="manager">Manager</option>
                  <option value="teller">Teller</option>
                </select>

                <select
                  className="form-select bg-secondary bg-opacity-25 text-white border-secondary"
                  value={formData.branchcode}
                  onChange={(e) => {
                    const branch = branches.find(
                      (b) => b.branchcode === e.target.value
                    );
                    setFormData({
                      ...formData,
                      branchcode: e.target.value,
                      branchname: branch?.branchname || "",
                    });
                  }}
                >
                  <option value="">Select Branch</option>
                  {branches.map((b) => (
                    <option key={b._id} value={b.branchcode}>
                      {b.branchname} ({b.branchcode})
                    </option>
                  ))}
                </select>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowModal(false);
                    setEditId(null);
                  }}
                >
                  Cancel
                </button>

                <button className="btn btn-primary" onClick={handleAddUser}>
                  {editId ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}