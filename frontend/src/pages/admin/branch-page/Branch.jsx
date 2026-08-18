
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

  // modal state
  const [showModal, setShowModal] = useState(false);

  // form state
  const [formData, setFormData] = useState({
    branchname: "",
    branchcode: "",
    address: "",
    totalcustomers: 0,
    totalaccounts: 0,
  });

  // fetch branches on page load
  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  // delete branch
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this branch?")) {
      dispatch(deleteBranch(id));
    }
  };

  // input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // add branch
  const handleAddBranch = async () => {
    try {
      await dispatch(addBranch(formData)).unwrap();

      // reset form
      setFormData({
        branchname: "",
        branchcode: "",
        address: "",
        totalcustomers: 0,
        totalaccounts: 0,
      });

      setShowModal(false);
      alert("Branch added successfully");
    } catch (err) {
      alert(err);
    }
  };

  if (loading) return <h3 className="text-white">Loading...</h3>;
  if (error) return <h3 className="text-danger">{error}</h3>;
  const handleSaveBranch = async () => {
    try {
      if (editId) {
        await dispatch(
          updateBranch({ id: editId, branchData: formData })
        ).unwrap();
      } else {
        await dispatch(addBranch(formData)).unwrap();
      }

      setShowModal(false);
      setEditId(null);
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div className="branch-page">
      {/* Header */}
      <div className="branch-header">
        <div>
          <h2>Branches</h2>
          <p>Manage all bank branches from one place.</p>
        </div>

        <button
          className="btn btn-primary branch-add-btn"
          onClick={() => setShowModal(true)}
        >
          Add Branch
        </button>
      </div>

      {/* Table */}
      <div className="table-responsive branch-table">
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th>Branch</th>
              <th>Code</th>
              <th>Address</th>
              <th>Customers</th>
              <th>Accounts</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {(branches || []).filter((branch) => branch).map((branch) => (
              <tr key={branch._id}>
                <td>{branch.branchname}</td>
                <td>{branch.branchcode}</td>
                <td>{branch.address}</td>
                <td>{branch.totalcustomers || 0}</td>
                <td>{branch.totalaccounts || 0}</td>

                <td>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => navigate(`/admin/branch/${branch._id}`)}
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
                          totalcustomers: branch?.totalcustomers || 0,
                          totalaccounts: branch?.totalaccounts || 0,
                        });

                        setEditId(branch._id);
                        setShowModal(true);
                      }}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(branch._id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Branch Modal */}
      {showModal && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header">
                <h5 className="modal-title">Add New Branch</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <input
                  type="text"
                  name="branchname"
                  placeholder="Branch Name"
                  className="form-control mb-3"
                  value={formData.branchname}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="branchcode"
                  placeholder="Branch Code"
                  className="form-control mb-3"
                  value={formData.branchcode}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  className="form-control mb-3"
                  value={formData.address}
                  onChange={handleChange}
                />

                <input
                  type="number"
                  name="totalcustomers"
                  placeholder="Total Customers"
                  className="form-control mb-3"
                  value={formData.totalcustomers}
                  onChange={handleChange}
                />

                <input
                  type="number"
                  name="totalaccounts"
                  placeholder="Total Accounts"
                  className="form-control"
                  value={formData.totalaccounts}
                  onChange={handleChange}
                />
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-primary"
                  onClick={handleSaveBranch}
                >
                  {editId ? "Update Branch" : "Save Branch"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}