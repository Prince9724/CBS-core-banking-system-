import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchBranches,
  deleteBranch,
  addBranch,
  updateBranch,
} from "../../../feature/features/branchSlice";
import "./branch.css";

export default function Branch() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editId, setEditId] = useState(null);
  const { branches, loading, error } = useSelector(
    (state) => state.branch
  );

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    branchname: "",
    branchcode: "",
    address: "",
    status: "Active",
  });

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this branch?")) {
      dispatch(deleteBranch(id));
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Toggle Status
  const handleToggleStatus = async (branch) => {
    const newStatus = branch.status === "Active" ? "Inactive" : "Active";
    if (!window.confirm(`Are you sure you want to ${newStatus} this branch?`)) return;

    try {
      await dispatch(
        updateBranch({
          id: branch._id,
          branchData: { ...branch, status: newStatus },
        })
      ).unwrap();
      alert(`✅ Branch ${newStatus} successfully`);
    } catch (err) {
      alert(err);
    }
  };

  const handleSaveBranch = async () => {
    try {
      if (editId) {
        await dispatch(
          updateBranch({ id: editId, branchData: formData })
        ).unwrap();
        alert("✅ Branch updated successfully");
      } else {
        await dispatch(addBranch(formData)).unwrap();
        alert("✅ Branch added successfully");
      }

      setShowModal(false);
      setEditId(null);
      setFormData({
        branchname: "",
        branchcode: "",
        address: "",
        status: "Active",
      });
    } catch (err) {
      alert(err);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-secondary mt-2">Loading branches...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="card bg-dark border-danger">
          <div className="card-body text-center py-5">
            <i className="bi bi-exclamation-triangle-fill text-danger fs-1"></i>
            <h4 className="text-danger mt-3">Unable to load branches</h4>
            <p className="text-secondary">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-4 py-4 bg-dark min-vh-100">

      {/* ===== HEADER ===== */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <span className="badge bg-primary bg-opacity-10 text-primary mb-2">
            <i className="bi bi-building me-1"></i>
            Branch Management
          </span>
          <h1 className="text-white fw-bold mb-1">Branches</h1>
          <p className="text-secondary m-0">Manage all bank branches from one place</p>
        </div>
        <button
          className="btn btn-primary d-flex align-items-center gap-2 px-4"
          onClick={() => {
            setEditId(null);
            setFormData({
              branchname: "",
              branchcode: "",
              address: "",
              status: "Active",
            });
            setShowModal(true);
          }}
        >
          <i className="bi bi-plus-lg"></i>
          Add Branch
        </button>
      </div>

      {/* ===== STATS CARDS ===== */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card bg-dark border-secondary h-100">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="bg-primary bg-opacity-10 rounded-3 p-3">
                <i className="bi bi-building fs-2 text-primary"></i>
              </div>
              <div>
                <span className="text-secondary small">Total Branches</span>
                <h4 className="text-white fw-bold mb-0">{branches.length}</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-dark border-secondary h-100">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="bg-success bg-opacity-10 rounded-3 p-3">
                <i className="bi bi-check-circle fs-2 text-success"></i>
              </div>
              <div>
                <span className="text-secondary small">Active Branches</span>
                <h4 className="text-white fw-bold mb-0">
                  {branches.filter((b) => b.status !== "Inactive").length}
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-dark border-secondary h-100">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="bg-danger bg-opacity-10 rounded-3 p-3">
                <i className="bi bi-x-circle fs-2 text-danger"></i>
              </div>
              <div>
                <span className="text-secondary small">Inactive Branches</span>
                <h4 className="text-white fw-bold mb-0">
                  {branches.filter((b) => b.status === "Inactive").length}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== TABLE ===== */}
      <div className="card bg-dark border-secondary">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-dark table-hover align-middle mb-0">
              <thead>
                <tr className="border-secondary">
                  <th className="ps-4">Branch</th>
                  <th>Code</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th className="text-center pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {branches.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-5 text-secondary">
                      <i className="bi bi-building fs-1 d-block mb-3"></i>
                      <h5>No branches found</h5>
                      <p className="small">Click "Add Branch" to create your first branch</p>
                    </td>
                  </tr>
                ) : (
                  branches.map((branch) => (
                    <tr key={branch._id} className="border-secondary">
                      <td className="ps-4">
                        <div className="d-flex align-items-center gap-2">
                          <div className="bg-primary bg-opacity-10 rounded-3 p-2">
                            <i className="bi bi-building text-primary"></i>
                          </div>
                          <div>
                            <strong className="text-white">{branch.branchname}</strong>
                            <small className="text-secondary d-block">
                              {branch.city || "N/A"}
                            </small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-secondary">{branch.branchcode}</span>
                      </td>
                      <td className="text-secondary small">{branch.address || "N/A"}</td>
                      <td>
                        <span
                          className={`badge cursor-pointer ${
                            branch.status === "Inactive" ? "bg-danger" : "bg-success"
                          }`}
                          style={{ cursor: "pointer" }}
                          onClick={() => handleToggleStatus(branch)}
                          title="Click to toggle status"
                        >
                          {branch.status || "Active"}
                          <i className="bi bi-arrow-repeat ms-1" style={{ fontSize: "10px" }}></i>
                        </span>
                      </td>
                      <td>
                        <div className="d-flex gap-2 justify-content-center">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => navigate(`/admin/branch/${branch._id}`)}
                            title="View Details"
                          >
                            <i className="bi bi-eye"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-warning"
                            onClick={() => {
                              setFormData({
                                branchname: branch?.branchname || "",
                                branchcode: branch?.branchcode || "",
                                address: branch?.address || "",
                                status: branch?.status || "Active",
                              });
                              setEditId(branch._id);
                              setShowModal(true);
                            }}
                            title="Edit Branch"
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(branch._id)}
                            title="Delete Branch"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ===== MODAL ===== */}
      {showModal && (
        <div className="modal d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.7)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-white border-secondary">
              <div className="modal-header border-secondary">
                <h5 className="modal-title">
                  {editId ? (
                    <>
                      <i className="bi bi-pencil-square me-2 text-warning"></i>
                      Edit Branch
                    </>
                  ) : (
                    <>
                      <i className="bi bi-plus-circle me-2 text-success"></i>
                      Add New Branch
                    </>
                  )}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => {
                    setShowModal(false);
                    setEditId(null);
                  }}
                ></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label text-secondary small">Branch Name</label>
                  <input
                    type="text"
                    name="branchname"
                    placeholder="Enter branch name"
                    className="form-control bg-dark text-white border-secondary"
                    value={formData.branchname}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label text-secondary small">Branch Code</label>
                  <input
                    type="text"
                    name="branchcode"
                    placeholder="Enter branch code"
                    className="form-control bg-dark text-white border-secondary"
                    value={formData.branchcode}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label text-secondary small">Address</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter branch address"
                    className="form-control bg-dark text-white border-secondary"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="mt-3">
                  <label className="form-label text-secondary small">Status</label>
                  <select
                    name="status"
                    className="form-select bg-dark text-white border-secondary"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer border-secondary">
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowModal(false);
                    setEditId(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary d-flex align-items-center gap-2"
                  onClick={handleSaveBranch}
                >
                  <i className="bi bi-check-lg"></i>
                  {editId ? "Update Branch" : "Save Branch"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== CUSTOM CSS ===== */}
      <style>{`
        .table-dark {
          --bs-table-bg: transparent;
        }
        .table-dark td, .table-dark th {
          border-color: #2a2f3a;
        }
        .table-dark tbody tr:hover {
          background-color: rgba(255, 255, 255, 0.02);
        }
        .table-dark thead th {
          color: #6b8aa8;
          font-weight: 600;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          padding: 14px 12px;
          border-bottom: 2px solid #2a2f3a;
        }
        .table-dark tbody td {
          padding: 14px 12px;
          vertical-align: middle;
        }
        .form-control:focus, .form-select:focus {
          border-color: #0d6efd;
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
        }
        .modal-content {
          border-radius: 12px;
        }
        .cursor-pointer {
          cursor: pointer;
        }
        .cursor-pointer:hover {
          opacity: 0.8;
        }
      `}</style>

    </div>
  );
}