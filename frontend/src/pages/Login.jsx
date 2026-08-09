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


import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../App/features/authSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loggedinUser, loader, error } = useSelector(
    (state) => state.auth
  );

  // refs
  const useridRef = useRef("");
  const passwordRef = useRef("");
  const branchCodeRef = useRef("");

  // login hone ke baad redirect
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
  // login function
  const handleLoginAuth = async () => {
    const loginData = {
      userid: useridRef.current.value,
      password: passwordRef.current.value,
      branchcode: branchCodeRef.current.value,
    };

    try {
      await dispatch(loginUser(loginData)).unwrap();
      alert("Login successful");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="container-fluid bg-dark" style={{ height: "100vh" }}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
            <div className="border rounded border-secondary p-4 p-md-5">
              <h4 className="mb-4 text-center text-md-start text-white">
                <i className="bi bi-person-lines-fill fs-2 text-primary"></i>
                <span className="ms-2">Login into your account</span>
              </h4>

              {/* User ID */}
              <div className="form-floating mb-3">
                <input
                  ref={useridRef}
                  type="text"
                  className="form-control bg-dark text-white border-secondary"
                  id="userid"
                  placeholder="Enter User ID"
                />
                <label
                  htmlFor="userid"
                  className="text-white"
                  style={{ background: "transparent" }}
                >
                  User ID
                </label>
              </div>

              {/* Branch Code */}
              <div className="form-floating mb-3">
                <input
                  ref={branchCodeRef}
                  type="text"
                  className="form-control bg-dark text-white border-secondary"
                  id="branchcode"
                  placeholder="Enter Branch Code"
                />
                <label
                  htmlFor="branchcode"
                  className="text-white"
                  style={{ background: "transparent" }}
                >
                  Branch Code
                </label>
              </div>

              {/* Password */}
              <div className="form-floating mb-3">
                <input
                  ref={passwordRef}
                  type="password"
                  className="form-control bg-dark text-white border-secondary"
                  id="password"
                  placeholder="********"
                />
                <label
                  htmlFor="password"
                  className="text-white"
                  style={{ background: "transparent" }}
                >
                  Password
                </label>
              </div>

              {/* Error */}
              {error && (
                <div className="alert alert-danger py-2">
                  {error}
                </div>
              )}

              <button
                onClick={handleLoginAuth}
                className="btn btn-primary w-100"
                disabled={loader}
              >
                {loader ? "Logging in..." : "Login"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

