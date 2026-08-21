  // import { Link } from "react-router-dom";
  // import { useDispatch } from "react-redux";
  // import { useNavigate } from "react-router-dom";
  // import { handleLogout } from "../utils/handleLogout";
  // import { useState } from "react";
  // import "../Admin-component/admin_sidebar.css"

  // export default function BranchManager() {
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();
  //   const [isActive, setActive] = useState("dashboard");
  //   const [showSidebar, setShowSidebar] = useState(false); //for sidebar hide
  //   return (
  //     <div>
  //       <>
  //         {/* <h1 className="visually">Sidebars examples</h1> */}
  //         <button
  //           className="btn btn-primary d-lg-none menu-btn"
  //           onClick={() => setShowSidebar(true)}
  //         >
  //           <i className="bi bi-list fs-4"></i>
  //         </button>
  //         <div
  //           className={`sidebar d-flex flex-column flex-shrink-0 
  //           p-3 text-bg-dark position-fixed  border-secondary
  //           border-end ${showSidebar ? "show-sidebar" : ""}`}
  //           style={{ width: 280, height: "100vh" }}
  //         >
  //           <button
  //             className="btn-close btn-close-white d-lg-none ms-auto mb-3"
  //             onClick={() => setShowSidebar(false)}
  //           ></button>
  //           <Link
  //             to={"/admin"}
  //             className="d-flex align-items-center mb-3 mb-md-0 me-md-auto
  //             text-white text-decoration-none"
  //           >
  //             <div className="d-flex">
  //               <i className="bi bi-bank  fs-3" />
  //               <div className="ms-3">
  //                 <p className="mb-0">ABC Bank co-operative</p>
  //                 <span className="">Manager Dashboard</span>
  //               </div>
  //             </div>
  //           </Link>
  //           <hr />
  //           <ul className="nav nav-pills flex-column mb-auto">
  //             <li className="nav-item">
  //               <Link
  //                 to={"/manager/MU123"}
  //                 className={`nav-link text-white ${isActive === "dashboard" ? "active" : ""}`}
  //                 aria-current="page"
  //                 onClick={() => setActive("dashboard")}
  //               >
  //                 <i className="bi bi-speedometer2" />
  //                 <span className="ms-2">Dashboard</span>
  //               </Link>
  //             </li>
  //             <li>
  //               <Link
  //                 to={"customers"}
  //                 onClick={() => setActive("Customers")}
  //                 className={`nav-link text-white ${isActive === "Customers" ? "active" : ""}`}
  //               >
  //                 <i className="bi bi-person-fill-gear"></i>
  //                 <span className="ms-2">Customers</span>
  //               </Link>
  //             </li>
  //             {/* <li>
  //               <Link
  //                 to={"customers"}
  //                 onClick={() => setActive("customer")}
  //                 className={`nav-link text-white ${isActive === "customer" ? "active" : ""}`}
  //               >
  //                 <i className="bi bi-person-rolodex"></i>
  //                 <span className="ms-2">Customers</span>
  //               </Link>
  //             </li> */}
  //             <li>
  //               <Link
  //                 to={"accounts"}
  //                 onClick={() => setActive("account")}
  //                 className={`nav-link text-white ${isActive === "account" ? "active" : ""}`}
  //               >
  //                 <i className="bi bi-person-fill-add"></i>
  //                 <span className="ms-2">Accounts</span>
  //               </Link>
  //             </li>
  //             <li>
  //               <Link
  //                 to={"transactions"}
  //                 onClick={() => setActive("transection")}
  //                 className={`nav-link text-white ${isActive === "transection" ? "active" : ""}`}
  //               >
  //                 <i className="bi bi-credit-card-2-back"></i>
  //                 <span className="ms-2">Transections</span>
  //               </Link>
  //             </li>
  //             <li>
  //               <Link
  //                 to={"cash-vault"}
  //                 onClick={() => setActive("cash")}
  //                 className={`nav-link text-white ${isActive === "cash" ? "active" : ""}`}
  //               >
  //                 <i className="bi bi-cash-coin"></i>
  //                 <span className="ms-2">Cash & Vault</span>
  //               </Link>
  //             </li>
  //             <li>
  //               <Link
  //               to={"loan-request"}
  //                 onClick={() => setActive("Loan-requests")}
  //                 className={`nav-link text-white ${isActive === "Loan-requests" ? "active" : ""}`}
  //               >
  //                 <i className="bi bi-piggy-bank-fill"></i>
  //                 <span className="ms-2">Loan requests</span>
  //               </Link>
  //             </li>
  //             <li>
  //               <Link
  //               to={"branch-staff"}
  //                 onClick={() => setActive("branch-staff")}
  //                 className={`nav-link text-white ${isActive === "branch-staff" ? "active" : ""}`}
  //               >
  //                 <i className="bi bi-people-fill"></i>
  //                 <span className="ms-2">Branch staff</span>
  //               </Link>
  //             </li>
  //             <li>
  //               <Link
  //               to={"attendance"}
  //                 onClick={() => setActive("setting")}
  //                 className={`nav-link text-white ${isActive === "setting" ? "active" : ""}`}
  //               >
  //                 <i className="bi bi-calendar3"></i>
  //                 <span className="ms-2">Attendance</span>
  //               </Link>
  //             </li>
  //             <li>
  //               <Link
  //                 to={"reports"}
  //                 onClick={() => setActive("reports")}
  //                 className={`nav-link text-white ${isActive === "reports" ? "active" : ""}`}
  //               >
  //                 <i className="bi bi-bar-chart-fill"></i>
  //                 <span className="ms-2">Reports</span>
  //               </Link>
  //             </li>
  //             <li>
  //               <Link
  //                 to={"settings"}
  //                 onClick={() => setActive("settings")}
  //                 className={`nav-link text-white ${isActive === "settings" ? "active" : ""}`}
  //               >
  //                 <i className="bi bi-person-fill"></i>
  //                 <span className="ms-2">Settings</span>
  //               </Link>
  //             </li>
  //           </ul>
  //           <hr />
  //           <div className="dropdown">
  //             <Link
  //               to={"/branch"}
  //               className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
  //               data-bs-toggle="dropdown"
  //               aria-expanded="false"
  //             >
  //               <img
  //                 src="https://github.com/mdo.png"
  //                 alt=""
  //                 width={32}
  //                 height={32}
  //                 className="rounded-circle me-2"
  //               />
  //               <strong>mdo</strong>
  //             </Link>
  //             <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
  //               <li>
  //                 <Link to="/admin/profile" className="dropdown-item">
  //                   👤 Profile
  //                 </Link>
  //               </li>

  //               <li>
  //                 <Link to="/admin/settings" className="dropdown-item">
  //                   ⚙️ Settings
  //                 </Link>
  //               </li>

  //               <li>
  //                 <hr className="dropdown-divider" />
  //               </li>

  //               <li>
  //                 <button
  //                   type="button"
  //                   className="dropdown-item text-danger"
  //                   onClick={() => handleLogout(dispatch, navigate)}
  //                 >
  //                   🚪 Logout
  //                 </button>
  //               </li>
  //             </ul>
  //           </div>
  //         </div>
  //       </>
  //     </div>
  //   );
  // }

  import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../utils/handleLogout";
import { useState } from "react";
import "../Admin-component/admin_sidebar.css";

export default function BranchManager() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isActive, setActive] = useState("dashboard");
  const [showSidebar, setShowSidebar] = useState(false);

  // ✅ Get loggedinUser from Redux
  const { loggedinUser } = useSelector((state) => state.auth);
  
  // ✅ Dynamic branchcode - loggedinUser se lo
  const branchcode = loggedinUser?.branchcode || "MU123";

  return (
    <div>
      <button
        className="btn btn-primary d-lg-none menu-btn"
        onClick={() => setShowSidebar(true)}
      >
        <i className="bi bi-list fs-4"></i>
      </button>
      <div
        className={`sidebar d-flex flex-column flex-shrink-0 
          p-3 text-bg-dark position-fixed border-secondary
          border-end ${showSidebar ? "show-sidebar" : ""}`}
        style={{ width: 280, height: "100vh" }}
      >
        <button
          className="btn-close btn-close-white d-lg-none ms-auto mb-3"
          onClick={() => setShowSidebar(false)}
        ></button>
        
        <Link
          to={"/admin"}
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <div className="d-flex">
            <i className="bi bi-bank fs-3" />
            <div className="ms-3">
              <p className="mb-0">ABC Bank co-operative</p>
              <span className="">Manager Dashboard</span>
            </div>
          </div>
        </Link>
        
        <hr />
        
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link
              // ✅ Dynamic branchcode
              to={`/manager/${branchcode}`}
              className={`nav-link text-white mt-3 ${isActive === "dashboard" ? "active" : ""}`}
              aria-current="page"
              onClick={() => setActive("dashboard")}
            >
              <i className="bi bi-speedometer2" />
              <span className="ms-2">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to={`/manager/${branchcode}/customers`}
              onClick={() => setActive("Customers")}
              className={`nav-link text-white ${isActive === "Customers" ? "active" : ""}`}
            >
              <i className="bi bi-person-fill-gear"></i>
              <span className="ms-2">Customers</span>
            </Link>
          </li>
          <li>
            <Link
              to={`/manager/${branchcode}/accounts`}
              onClick={() => setActive("account")}
              className={`nav-link text-white ${isActive === "account" ? "active" : ""}`}
            >
              <i className="bi bi-person-fill-add"></i>
              <span className="ms-2">Accounts</span>
            </Link>
          </li>
          <li>
            <Link
              to={`/manager/${branchcode}/transactions`}
              onClick={() => setActive("transection")}
              className={`nav-link text-white ${isActive === "transection" ? "active" : ""}`}
            >
              <i className="bi bi-credit-card-2-back"></i>
              <span className="ms-2">Transactions</span>
            </Link>
          </li>
          <li>
            <Link
              to={`/manager/${branchcode}/cash-vault`}
              onClick={() => setActive("cash")}
              className={`nav-link text-white ${isActive === "cash" ? "active" : ""}`}
            >
              <i className="bi bi-cash-coin"></i>
              <span className="ms-2">Cash & Vault</span>
            </Link>
          </li>
          <li>
            {/* <Link
              to={`/manager/${branchcode}/loan-request`}
              onClick={() => setActive("Loan-requests")}
              className={`nav-link text-white ${isActive === "Loan-requests" ? "active" : ""}`}
            >
              <i className="bi bi-piggy-bank-fill"></i>
              <span className="ms-2">Loan requests</span>
            </Link> */}
          </li>
          <li>
            {/* <Link
              to={`/manager/${branchcode}/branch-staff`}
              onClick={() => setActive("branch-staff")}
              className={`nav-link text-white ${isActive === "branch-staff" ? "active" : ""}`}
            >
              <i className="bi bi-people-fill"></i>
              <span className="ms-2">Branch staff</span>
            </Link> */}
          </li>
          <li>
            {/* <Link
              to={`/manager/${branchcode}/attendance`}
              onClick={() => setActive("setting")}
              className={`nav-link text-white ${isActive === "setting" ? "active" : ""}`}
            >
              <i className="bi bi-calendar3"></i>
              <span className="ms-2">Attendance</span>
            </Link> */}
          </li>
          <li>
            <Link
              to={`/manager/${branchcode}/reports`}
              onClick={() => setActive("reports")}
              className={`nav-link text-white ${isActive === "reports" ? "active" : ""}`}
            >
              <i className="bi bi-bar-chart-fill"></i>
              <span className="ms-2">Reports</span>
            </Link>
          </li>
          <li>
            <Link
              to={`/manager/${branchcode}/settings`}
              onClick={() => setActive("settings")}
              className={`nav-link text-white ${isActive === "settings" ? "active" : ""}`}
            >
              <i className="bi bi-person-fill"></i>
              <span className="ms-2">Settings</span>
            </Link>
          </li>
        </ul>
        
        <hr />
        
        <div className="dropdown">
          <Link
            to={"/branch"}
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://github.com/mdo.png"
              alt=""
              width={32}
              height={32}
              className="rounded-circle me-2"
            />
            {/* ✅ Dynamic name */}
            <strong>{loggedinUser?.name || "Manager"}</strong>
          </Link>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
            <li>
              <Link to="/admin/profile" className="dropdown-item">
                👤 Profile
              </Link>
            </li>
            <li>
              <Link to="/admin/settings" className="dropdown-item">
                ⚙️ Settings
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button
                type="button"
                className="dropdown-item text-danger"
                onClick={() => handleLogout(dispatch, navigate)}
              >
                🚪 Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}