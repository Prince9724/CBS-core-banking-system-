import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../feature/features/authSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loggedinUser, loader, error } = useSelector(
    (state) => state.auth
  );

  // Login mode
  const [loginType, setLoginType] = useState("branch");
  const [loginError, setLoginError] = useState("");

  // refs
  const useridRef = useRef("");
  const passwordRef = useRef("");
  const branchCodeRef = useRef("");

  // redirect after login
  useEffect(() => {
    if (!loggedinUser) return;

    console.log("LOGGED USER:", loggedinUser);

    const role = loggedinUser.role?.toLowerCase();

    if (role === "admin") {
      navigate("/admin");
    } else if (role === "manager") {
      navigate(`/manager/${loggedinUser.branchcode}`);
    } else if (role === "teller") {
      navigate(`/teller/${loggedinUser.branchcode}`);
    }
  }, [loggedinUser, navigate]);

  // ✅ Clear error on input change
  const handleInputChange = () => {
    if (loginError) setLoginError("");
  };

  // ✅ Login
  const handleLoginAuth = async () => {
    const loginData = {
      userid: useridRef.current.value.trim(),
      password: passwordRef.current.value.trim(),
      branchcode:
        loginType === "admin"
          ? ""
          : branchCodeRef.current.value.trim(),
    };

    // ✅ Validation
    if (!loginData.userid || !loginData.password) {
      setLoginError("Please enter User ID and Password");
      return;
    }

    if (loginType === "branch" && !loginData.branchcode) {
      setLoginError("Please enter Branch Code");
      return;
    }

    try {
      setLoginError("");
      const result = await dispatch(loginUser(loginData)).unwrap();
      
      if (result.status) {
        // Redirect will happen via useEffect
      }
    } catch (err) {
      setLoginError(err || "Login failed. Please try again.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a 0%, #111827 50%, #1e293b 100%)",
        padding: "20px",
      }}
    >
      <div className="container py-2">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7 col-sm-9">
            <div
              className="card border-0 shadow-lg text-white"
              style={{
                background: "rgba(17, 24, 39, 0.92)",
                backdropFilter: "blur(12px)",
                borderRadius: "20px",
                maxWidth: "480px",
                margin: "0 auto",
              }}
            >
              <div className="card-body p-4 p-sm-5">
                {/* Logo */}
                <div className="text-center mb-3">
                  <div style={{ fontSize: "40px" }}>
                    <i className="bi bi-bank fs-1 text-primary"></i>
                  </div>
                  <h4 className="fw-bold mt-1 mb-0">CBS Banking</h4>
                  <p className="text-secondary small mb-0">
                    Secure Core Banking System Login
                  </p>
                </div>

                {/* Toggle */}
                <div className="d-flex bg-dark rounded-pill p-1 mb-3">
                  <button
                    type="button"
                    className={`btn flex-fill rounded-pill py-1 ${
                      loginType === "admin"
                        ? "btn-primary"
                        : "btn-dark text-white"
                    }`}
                    style={{ fontSize: "14px" }}
                    onClick={() => {
                      setLoginType("admin");
                      setLoginError("");
                    }}
                  >
                    <i className="bi bi-person-badge me-1"></i>
                    Admin
                  </button>

                  <button
                    type="button"
                    className={`btn flex-fill rounded-pill py-1 ${
                      loginType === "branch"
                        ? "btn-primary"
                        : "btn-dark text-white"
                    }`}
                    style={{ fontSize: "14px" }}
                    onClick={() => {
                      setLoginType("branch");
                      setLoginError("");
                    }}
                  >
                    <i className="bi bi-building me-1"></i>
                    Branch
                  </button>
                </div>

                <h6 className="text-center fw-semibold mb-3 text-secondary">
                  {loginType === "admin"
                    ? "Administrator Access"
                    : "Manager / Teller Access"}
                </h6>

                {/* User ID */}
                <div className="form-floating mb-2">
                  <input
                    ref={useridRef}
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    id="userid"
                    placeholder="User ID"
                    onChange={handleInputChange}
                    style={{ height: "48px", fontSize: "14px" }}
                  />
                  <label htmlFor="userid" className="text-secondary" style={{ fontSize: "13px" }}>
                    <i className="bi bi-person me-1"></i>
                    User ID
                  </label>
                </div>

                {/* Password */}
                <div className="form-floating mb-2">
                  <input
                    ref={passwordRef}
                    type="password"
                    className="form-control bg-dark text-white border-secondary"
                    id="password"
                    placeholder="Password"
                    onChange={handleInputChange}
                    style={{ height: "48px", fontSize: "14px" }}
                  />
                  <label htmlFor="password" className="text-secondary" style={{ fontSize: "13px" }}>
                    <i className="bi bi-lock me-1"></i>
                    Password
                  </label>
                </div>

                {/* Branch Code */}
                {loginType === "branch" && (
                  <div className="form-floating mb-2">
                    <input
                      ref={branchCodeRef}
                      type="text"
                      className="form-control bg-dark text-white border-secondary"
                      id="branchcode"
                      placeholder="Branch Code"
                      onChange={handleInputChange}
                      style={{ height: "48px", fontSize: "14px" }}
                    />
                    <label
                      htmlFor="branchcode"
                      className="text-secondary"
                      style={{ fontSize: "13px" }}
                    >
                      <i className="bi bi-building me-1"></i>
                      Branch Code
                    </label>
                  </div>
                )}

                {/* ✅ ERROR DISPLAY */}
                {(loginError || error) && (
                  <div className="alert alert-danger py-1 small d-flex align-items-center gap-2 mb-2" style={{ fontSize: "13px" }}>
                    <i className="bi bi-exclamation-triangle-fill"></i>
                    <span>{loginError || error}</span>
                  </div>
                )}

                {/* Login Button */}
                <button
                  onClick={handleLoginAuth}
                  className="btn btn-primary w-100 py-2 fw-semibold rounded-3 shadow-sm mt-2"
                  disabled={loader}
                  style={{ fontSize: "15px" }}
                >
                  {loader ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Logging in...
                    </>
                  ) : loginType === "admin" ? (
                    <>
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                      Login as Admin
                    </>
                  ) : (
                    <>
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                      Login to Branch
                    </>
                  )}
                </button>

                <div className="text-center mt-3">
                  <small className="text-secondary" style={{ fontSize: "11px" }}>
                    <i className="bi bi-shield-check me-1 text-success"></i>
                    Protected by CBS Banking Security Layer
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== CUSTOM STYLES ===== */}
      <style>{`
        .form-floating > .form-control:focus {
          border-color: #0d6efd;
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
        }
        .form-floating > .form-control::placeholder {
          color: transparent;
        }
        .form-floating > .form-control {
          padding-top: 1.2rem;
          padding-bottom: 0.3rem;
        }
        .form-floating > label {
          padding: 0.7rem 0.75rem;
        }
        .form-control.bg-dark {
          background-color: #1a2a42 !important;
        }
        .form-control.bg-dark:focus {
          background-color: #1a2a42 !important;
        }
        .alert {
          border-radius: 8px;
        }
        .btn-primary {
          background: linear-gradient(135deg, #3B82F6, #2563EB);
          border: none;
          transition: all 0.3s ease;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
        }
        .btn-primary:disabled {
          transform: none;
        }
        .btn-dark.text-white {
          color: #e8ecf1 !important;
        }
        .btn-dark.text-white:hover {
          background: #2a3f5a !important;
        }
        .card {
          max-height: 95vh;
          overflow: hidden;
        }
        body {
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}