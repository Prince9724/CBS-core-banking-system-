import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, fetchUsers } from "../App/features/authSlice";

export default function Login() {
  const navigate = useNavigate();
  const { users, loggedinUser } = useSelector((state) => state.auth);
  // console.log(users)
  // console.log(loggedinUser);
  // console.log(users); //this is still giving me undefined ???
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (!loggedinUser) {
      return; //is loggedinuser is null so this line never go down this will be return and if not null and then this going down
    }
    if (loggedinUser.role === "owner") {
      navigate("/admin");
    } else if (loggedinUser.role === "branch manager") {
      navigate("/branch-manager");
    }

  }, [loggedinUser, navigate]);

  // const handleLogin = () => { instead of we using in useEffect you can see
  //   if (loggedinUser.role === "owner") {
  //     navigate("/admin");
  //   } else if (loggedinUser.role === "branch manager") {
  //     navigate("/branch-manager");
  //   } else {
  //     alert("not found!");
  //   }
  // };
  const roleRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleLoginAuth = () => {
    // const fields = [
    //   { ref: roleRef.current.value, label: "role" },
    //   { ref: emailRef.current.value, label: "email" },
    //   { ref: passwordRef.current.value, label: "password" },
    // ];
    const loginData = {
      role: roleRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    // console.log(loginData)
    dispatch(loginUser(loginData));
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
          <div className="border rounded border-secondary p-4 p-md-5">
            <h4 className="mb-4 text-center text-md-start">
              <i className="bi bi-person-lines-fill fs-2 text-primary"></i>
              <span className="ms-2">Login into your account</span>
            </h4>

            <div className="form-floating mb-3">
              <select
                ref={roleRef}
                className="form-select bg-dark text-white border-secondary"
                id="role"
              >
                <option value="">Select Role</option>
                <option value="owner">Owner</option>
                <option value="branch manager">Branch Manager</option>
                {/* <option value="branchmanager02">Branch Manager - Adajan</option> */}
              </select>
              <label
                style={{ background: "transparent" }}
                htmlFor="floatingInput role"
              >
                Select Role
              </label>
            </div>

            <div className="form-floating mb-3">
              <input
                ref={emailRef}
                type="email"
                className="form-control bg-dark text-white border-secondary"
                id="floatingInput"
                placeholder="Enter your email"
              />
              <label
                htmlFor="floatingInput"
                className="text-white"
                style={{ background: "transparent" }}
              >
                Email Address
              </label>
            </div>

            <div className="form-floating mb-3">
              <input
                ref={passwordRef}
                type="password"
                className="form-control bg-dark text-white border-secondary"
                id="floatingPassword"
                placeholder="********"
              />
              <label
                htmlFor="floatingPassword"
                className="text-white"
                style={{ background: "transparent" }}
              >
                Password
              </label>
            </div>

            <div className="text-end mb-3">
              <a href="#" className="text-decoration-none">
                Forgot Password?
              </a>
            </div>

            <button
              onClick={() => handleLoginAuth()}
              className="btn btn-primary w-100"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
