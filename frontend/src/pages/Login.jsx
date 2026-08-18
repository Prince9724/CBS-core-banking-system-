// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser, fetchUsers } from "../App/features/authSlice";

// export default function Login() {
//   const navigate = useNavigate();
//   const { users, loggedinUser } = useSelector((state) => state.auth);
//   // console.log(users)
//   // console.log(loggedinUser);
//   // console.log(users); //this is still giving me undefined ???
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(fetchUsers());
//   }, [dispatch]);

//   useEffect(() => {
//     if (!loggedinUser) {
//       return; //is loggedinuser is null so this line never go down this will be return and if not null and then this going down
//     }
//     if (loggedinUser.role === "owner") {
//       navigate("/admin");
//     } else if (loggedinUser.role === "branch manager") {
//       navigate("/branch-manager");
//     }
//   }, [loggedinUser, navigate]);

//   // const handleLogin = () => { instead of we using in useEffect you can see
//   //   if (loggedinUser.role === "owner") {
//   //     navigate("/admin");
//   //   } else if (loggedinUser.role === "branch manager") {
//   //     navigate("/branch-manager");
//   //   } else {
//   //     alert("not found!");
//   //   }
//   // };
//   const roleRef = useRef("");
//   const emailRef = useRef("");
//   const passwordRef = useRef("");

//   const handleLoginAuth = () => {
//     // const fields = [
//     //   { ref: roleRef.current.value, label: "role" },
//     //   { ref: emailRef.current.value, label: "email" },
//     //   { ref: passwordRef.current.value, label: "password" },
//     // ];
//     const loginData = {
//       role: roleRef.current.value,
//       email: emailRef.current.value,
//       password: passwordRef.current.value,
//     };
//     // console.log(loginData)
//     dispatch(loginUser(loginData));
//   };

//   return (
//     <div className="container-fluid bg-dark" style={{height:"100vh"}}>
//       <div className="container py-5">
//         <div className="row justify-content-center">
//           <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
//             <div className="border rounded border-secondary p-4 p-md-5">
//               <h4 className="mb-4 text-center text-md-start">
//                 <i className="bi bi-person-lines-fill fs-2 text-primary"></i>
//                 <span className="ms-2">Login into your account</span>
//               </h4>

//               <div className="form-floating mb-3">
//                 <select
//                   ref={roleRef}
//                   className="form-select bg-dark text-white border-secondary"
//                   id="role"
//                 >
//                   <option value="">Select Role</option>
//                   <option value="owner">Owner</option>
//                   <option value="branch manager">Branch Manager</option>
//                   {/* <option value="branchmanager02">Branch Manager - Adajan</option> */}
//                 </select>
//                 <label
//                   style={{ background: "transparent" }}
//                   htmlFor="floatingInput role"
//                 >
//                   Select Role
//                 </label>
//               </div>

//               <div className="form-floating mb-3">
//                 <input
//                   ref={emailRef}
//                   type="email"
//                   className="form-control bg-dark text-white border-secondary"
//                   id="floatingInput"
//                   placeholder="Enter your email"
//                 />
//                 <label
//                   htmlFor="floatingInput"
//                   className="text-white"
//                   style={{ background: "transparent" }}
//                 >
//                   Email Address
//                 </label>
//               </div>

//               <div className="form-floating mb-3">
//                 <input
//                   ref={passwordRef}
//                   type="password"
//                   className="form-control bg-dark text-white border-secondary"
//                   id="floatingPassword"
//                   placeholder="********"
//                 />
//                 <label
//                   htmlFor="floatingPassword"
//                   className="text-white"
//                   style={{ background: "transparent" }}
//                 >
//                   Password
//                 </label>
//               </div>

//               <div className="text-end mb-3">
//                 <a href="#" className="text-decoration-none">
//                   Forgot Password?
//                 </a>
//               </div>

//               <button
//                 onClick={() => handleLoginAuth()}
//                 className="btn btn-primary w-100"
//               >
//                 Login
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
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
  // login
  const handleLoginAuth = async () => {
    const loginData = {
      userid: useridRef.current.value.trim(),
      password: passwordRef.current.value.trim(),
      branchcode:
        loginType === "admin"
          ? ""
          : branchCodeRef.current.value.trim(),
    };

    try {
      await dispatch(loginUser(loginData)).unwrap();
      alert("Login successful");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a 0%, #111827 50%, #1e293b 100%)",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7">
            <div
              className="card border-0 shadow-lg text-white"
              style={{
                background: "rgba(17, 24, 39, 0.92)",
                backdropFilter: "blur(12px)",
                borderRadius: "24px",
              }}
            >
              <div className="card-body p-5">
                {/* Logo */}
                <div className="text-center mb-4">
                  <div style={{ fontSize: "52px" }}>🏦</div>
                  <h2 className="fw-bold mt-2 mb-1">CBS Banking</h2>
                  <p className="text-secondary mb-0">
                    Secure Core Banking System Login
                  </p>
                </div>

                {/* Toggle */}
                <div className="d-flex bg-dark rounded-pill p-1 mb-4">
                  <button
                    type="button"
                    className={`btn flex-fill rounded-pill ${loginType === "admin"
                        ? "btn-primary"
                        : "btn-dark text-white"
                      }`}
                    onClick={() => setLoginType("admin")}
                  >
                    👨‍💼 Admin Login
                  </button>

                  <button
                    type="button"
                    className={`btn flex-fill rounded-pill ${loginType === "branch"
                        ? "btn-primary"
                        : "btn-dark text-white"
                      }`}
                    onClick={() => setLoginType("branch")}
                  >
                    🏢 Branch Login
                  </button>
                </div>

                <h5 className="text-center fw-semibold mb-4">
                  {loginType === "admin"
                    ? "Administrator Access"
                    : "Manager / Teller Access"}
                </h5>

                {/* User ID */}
                <div className="form-floating mb-3">
                  <input
                    ref={useridRef}
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    id="userid"
                    placeholder="User ID"
                  />
                  <label htmlFor="userid" className="text-secondary">
                    👤 User ID
                  </label>
                </div>

                {/* Password */}
                <div className="form-floating mb-3">
                  <input
                    ref={passwordRef}
                    type="password"
                    className="form-control bg-dark text-white border-secondary"
                    id="password"
                    placeholder="Password"
                  />
                  <label htmlFor="password" className="text-secondary">
                    🔒 Password
                  </label>
                </div>

                {/* Branch Code */}
                {loginType === "branch" && (
                  <div className="form-floating mb-3">
                    <input
                      ref={branchCodeRef}
                      type="text"
                      className="form-control bg-dark text-white border-secondary"
                      id="branchcode"
                      placeholder="Branch Code"
                    />
                    <label
                      htmlFor="branchcode"
                      className="text-secondary"
                    >
                      🏢 Branch Code
                    </label>
                  </div>
                )}

                {/* Error */}
                {error && (
                  <div className="alert alert-danger py-2 small">{error}</div>
                )}

                {/* Login Button */}
                <button
                  onClick={handleLoginAuth}
                  className="btn btn-primary w-100 py-3 fw-semibold rounded-3 shadow-sm"
                  disabled={loader}
                >
                  {loader
                    ? "Logging in..."
                    : loginType === "admin"
                      ? "Login as Admin"
                      : "Login to Branch"}
                </button>

                <div className="text-center mt-4">
                  <small className="text-secondary">
                    🔐 Protected by CBS Banking Security Layer
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}