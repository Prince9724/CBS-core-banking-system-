import React, { useState } from 'react';
import axios from 'axios';
// import './TestPage.css';

const BASE_URL = 'http://localhost:5003';

export default function TestPage() {
  // Section 1: Add Branch State
  const [branchForm, setBranchForm] = useState({
    branchname: '',
    address: '',
    branchcode: ''
  });

  // Section 2: Add Manager State
  const [managerForm, setManagerForm] = useState({
    name: '',
    email: '',
    contact: '',
    password: '',
    role: 'Manager',
    branchname: '',
    branchcode: ''
  });

  // Section 3: Login State
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  // Global UI States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);

  // Axios Global Config Injection
  const axiosConfig = { withCredentials: true };

  // Handlers for Input Changes
  const handleBranchChange = (e) => {
    setBranchForm({ ...branchForm, [e.target.name]: e.target.value });
  };

  const handleManagerChange = (e) => {
    setManagerForm({ ...managerForm, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  // API Call: Add Branch
  const handleAddBranch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setApiResponse(null);
    console.log('Sending Add Branch Request:', branchForm);

    try {
      const response = await axios.post(`${BASE_URL}/cbs/addbranch`, branchForm, axiosConfig);
      console.log('Add Branch Success:', response.data);
      setApiResponse(response.data);
      setBranchForm({ branchname: '', address: '', branchcode: '' });
    } catch (err) {
      console.error('Add Branch Error:', err);
      setError(err.response?.data || err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // API Call: Add Manager
  const handleAddManager = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setApiResponse(null);
    console.log('Sending Add Manager Request:', managerForm);

    try {
      const response = await axios.post(`${BASE_URL}/cbs/addrole`, managerForm, axiosConfig);
      console.log('Add Manager Success:', response.data);
      setApiResponse(response.data);
      setManagerForm({
        name: '',
        email: '',
        contact: '',
        password: '',
        role: 'Manager',
        branchname: '',
        branchcode: ''
      });
    } catch (err) {
      console.error('Add Manager Error:', err);
      setError(err.response?.data || err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // API Call: Sign In
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setApiResponse(null);
    console.log('Sending Login Request:', loginForm);

    try {
      const response = await axios.post(`${BASE_URL}/cbs/signin`, loginForm, axiosConfig);
      console.log('Login Success:', response.data);
      setApiResponse(response.data);
      setLoginForm({ email: '', password: '' });
    } catch (err) {
      console.error('Login Error:', err);
      setError(err.response?.data || err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">CBS API Testing Dashboard</h1>

        {/* Global Loading Indicator */}
        {loading && <div className="loading-bar">Processing API Request...</div>}

        {/* Global Error Banner */}
        {error && (
          <div className="error-panel">
            <strong>Error:</strong>
            <pre>{JSON.stringify(error, null, 2)}</pre>
          </div>
        )}

        {/* Global Success Response Panel */}
        {apiResponse && (
          <div className="success-panel">
            <strong>Success / Response JSON:</strong>
            <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
          </div>
        )}

        {/* Section 1: Add Branch */}
        <section className="api-section">
          <h2>Section 1: Add Branch</h2>
          <form onSubmit={handleAddBranch}>
            <div className="form-group">
              <label>Branch Name</label>
              <input
                type="text"
                name="branchname"
                value={branchForm.branchname}
                onChange={handleBranchChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={branchForm.address}
                onChange={handleBranchChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Branch Code</label>
              <input
                type="text"
                name="branchcode"
                value={branchForm.branchcode}
                onChange={handleBranchChange}
                required
              />
            </div>
            <button type="submit" disabled={loading} className="btn-blue">
              Create Branch
          </button>
          </form>
        </section>

        {/* Section 2: Add Manager */}
        <section className="api-section">
          <h2>Section 2: Add Manager</h2>
          <form onSubmit={handleAddManager}>
            <div className="form-row">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={managerForm.name}
                  onChange={handleManagerChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={managerForm.email}
                  onChange={handleManagerChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Contact</label>
                <input
                  type="text"
                  name="contact"
                  value={managerForm.contact}
                  onChange={handleManagerChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={managerForm.password}
                  onChange={handleManagerChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Role</label>
                <input
                  type="text"
                  name="role"
                  value={managerForm.role}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Branch Name</label>
                <input
                  type="text"
                  name="branchname"
                  value={managerForm.branchname}
                  onChange={handleManagerChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Branch Code</label>
              <input
                type="text"
                name="branchcode"
                value={managerForm.branchcode}
                onChange={handleManagerChange}
                required
              />
            </div>
            <button type="submit" disabled={loading} className="btn-blue">
              Create Manager
          </button>
          </form>
        </section>

        {/* Section 3: Login */}
        <section className="api-section">
          <h2>Section 3: Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={loginForm.email}
                onChange={handleLoginChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                required
              />
            </div>
            <button type="submit" disabled={loading} className="btn-blue">
              Login
          </button>
          </form>
        </section>
      </div>
    </div>
  );
}
