// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import DashboardCards from "./DashboardCards";
// import DepositChart from "./DepositChart";
// import BranchChart from "./BranchChart";
// import RecentTransactions from "./RecentTransactions";
// import QuickActions from "./QuickAction";
// import Footer from "../footer/Footer";

// export default function AdminHome() {
//   const { loggedinUser } = useSelector((state) => state.auth);
//   const [selectedDate, setSelectedDate] = useState(
//     new Date().toISOString().split("T")[0]
//   );
//   const [loading, setLoading] = useState(false);
//   const [dashboardData, setDashboardData] = useState({
//     totalBranches: 0,
//     totalCustomers: 0,
//     totalAccounts: 0,
//     totalBalance: 0,
//     todayDeposit: 0,
//     todayWithdraw: 0,
//     todayTransactions: 0,
//     totalManagers: 0,
//     totalTellers: 0,
//     branchWiseData: [],
//     recentTransactions: [],
//   });

//   const api = axios.create({
//     baseURL: "http://localhost:5003",
//     withCredentials: true,
//   });

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
      
//       // ✅ Branches
//       const branchRes = await api.get("/cbs/getbranch");
//       const branches = branchRes.data.data || [];

//       // ✅ Customers
//       const customerRes = await api.get("/cbs/customer/get");
//       const customers = customerRes.data.data || [];

//       // ✅ Accounts
//       const accountRes = await api.get("/cbs/customer/accounts");
//       const accounts = accountRes.data.data || [];

//       // ✅ Users
//       const userRes = await api.get("/cbs/getusers");
//       const users = userRes.data.data || [];

//       // ✅ Transactions - WITH DATE FILTER
//       const todayRes = await api.get(
//         `/cbs/customer/today-transactions?date=${selectedDate}`
//       );
//       const todayTxns = todayRes.data.data || [];

//       console.log(`📊 Data for ${selectedDate}:`, todayTxns.length, "transactions");

//       // ✅ Calculations
//       const totalBalance = accounts.reduce(
//         (sum, acc) => sum + (acc.balance || 0),
//         0
//       );

//       const todayDeposit = todayTxns
//         .filter((t) => t.type === "Deposit")
//         .reduce((sum, t) => sum + (t.amount || 0), 0);

//       const todayWithdraw = todayTxns
//         .filter((t) => t.type === "Withdraw")
//         .reduce((sum, t) => sum + (t.amount || 0), 0);

//       const managers = users.filter(
//         (u) => u.role?.toLowerCase() === "manager"
//       );
//       const tellers = users.filter(
//         (u) => u.role?.toLowerCase() === "teller"
//       );

//       const branchWiseData = branches.map((branch) => ({
//         name: branch.branchname,
//         code: branch.branchcode,
//         customers: customers.filter((c) => c.branchcode === branch.branchcode).length,
//         accounts: accounts.filter((a) => a.branchcode === branch.branchcode).length,
//         balance: accounts
//           .filter((a) => a.branchcode === branch.branchcode)
//           .reduce((sum, acc) => sum + (acc.balance || 0), 0),
//         transactions: todayTxns.filter((t) => t.branchcode === branch.branchcode).length,
//       }));

//       setDashboardData({
//         totalBranches: branches.length,
//         totalCustomers: customers.length,
//         totalAccounts: accounts.length,
//         totalBalance: totalBalance,
//         todayDeposit: todayDeposit,
//         todayWithdraw: todayWithdraw,
//         todayTransactions: todayTxns.length,
//         totalManagers: managers.length,
//         totalTellers: tellers.length,
//         branchWiseData: branchWiseData,
//         recentTransactions: todayTxns.slice(0, 10),
//       });
//     } catch (err) {
//       console.error("❌ Dashboard Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Date change par auto fetch
//   useEffect(() => {
//     fetchDashboardData();
//   }, [selectedDate]);

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark">
//         <div className="text-center">
//           <div className="spinner-border text-primary" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//           <p className="text-secondary mt-2">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container-fluid px-4 py-4 bg-dark min-vh-100">

//       {/* ===== HEADER ===== */}
//       <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
//         <div>
//           <span className="badge bg-info bg-opacity-10 text-info mb-2">
//             <i className="bi bi-bank2 me-1"></i>
//             Admin Panel
//           </span>
//           <h1 className="text-white fw-bold mb-1">
//             Welcome Back, {loggedinUser?.name || "Admin"}
//           </h1>
//           <p className="text-secondary m-0">
//             Here's what's happening in your bank today.
//           </p>
//         </div>

//         <div className="d-flex align-items-center gap-2 bg-dark border border-secondary rounded-3 px-3 py-2">
//           <i className="bi bi-calendar3 text-secondary"></i>
//           <input
//             type="date"
//             className="bg-transparent border-0 text-white"
//             style={{ outline: "none" }}
//             value={selectedDate}
//             onChange={(e) => {
//               setSelectedDate(e.target.value);
//               // ✅ Loading indicator for user feedback
//               setLoading(true);
//             }}
//           />
//         </div>
//       </div>

//       {/* ===== DATE INFO ===== */}
//       <div className="card bg-dark border-secondary mb-4">
//         <div className="card-body py-2">
//           <div className="d-flex justify-content-between align-items-center">
//             <span className="text-secondary">
//               <i className="bi bi-calendar-event me-2 text-primary"></i>
//               Showing data for: <strong className="text-white">{selectedDate}</strong>
//             </span>
//             <span className="badge bg-primary bg-opacity-10 text-primary">
//               {dashboardData.todayTransactions} transactions
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* ===== STATS CARDS ===== */}
//       <DashboardCards stats={dashboardData} />

//       {/* ===== CHARTS SECTION ===== */}
//       <div className="row g-4 mt-3 mb-4">
//         <div className="col-xl-7 col-lg-12">
//           <div className="card bg-dark border-secondary h-100">
//             <div className="card-body">
//               <DepositChart stats={dashboardData} />
//             </div>
//           </div>
//         </div>
//         <div className="col-xl-5 col-lg-12">
//           <div className="card bg-dark border-secondary h-100">
//             <div className="card-body">
//               <BranchChart branchData={dashboardData.branchWiseData} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ===== RECENT TRANSACTIONS + QUICK ACTIONS ===== */}
//       <div className="row g-4">
//         <div className="col-xl-7 col-lg-12">
//           <div className="card bg-dark border-secondary">
//             <div className="card-body">
//               <RecentTransactions transactions={dashboardData.recentTransactions} />
//             </div>
//           </div>
//         </div>
//         <div className="col-xl-5 col-lg-12">
//           <div className="card bg-dark border-secondary h-100">
//             <div className="card-body">
//               <QuickActions />
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />

//       {/* ===== CUSTOM STYLE FOR DATE INPUT ===== */}
//       <style>{`
//         input[type="date"]::-webkit-calendar-picker-indicator {
//           filter: invert(0.7);
//           cursor: pointer;
//         }
//         input[type="date"] {
//           color-scheme: dark;
//         }
//         input[type="date"]:focus {
//           outline: none;
//         }
//         .bg-dark.bg-opacity-50 {
//           background-color: rgba(33, 37, 41, 0.5);
//         }
//         .card-body.py-2 {
//           padding-top: 8px;
//           padding-bottom: 8px;
//         }
//       `}</style>

//     </div>
//   );
// }





import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import DashboardCards from "./DashboardCards";
import DepositChart from "./DepositChart";
import BranchChart from "./BranchChart";
import RecentTransactions from "./RecentTransactions";
import QuickActions from "./QuickAction";
import Footer from "../footer/Footer";

export default function AdminHome() {
  const { loggedinUser } = useSelector((state) => state.auth);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    totalBranches: 0,
    totalCustomers: 0,
    totalAccounts: 0,
    totalBalance: 0,
    todayDeposit: 0,
    todayWithdraw: 0,
    todayTransactions: 0,
    totalManagers: 0,
    totalTellers: 0,
    branchWiseData: [],
    recentTransactions: [],
  });

  const api = axios.create({
    baseURL: "http://localhost:5003",
    withCredentials: true,
  });

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const branchRes = await api.get("/cbs/getbranch");
      const branches = branchRes.data.data || [];

      const customerRes = await api.get("/cbs/customer/get");
      const customers = customerRes.data.data || [];

      const accountRes = await api.get("/cbs/customer/accounts");
      const accounts = accountRes.data.data || [];

      const userRes = await api.get("/cbs/getusers");
      const users = userRes.data.data || [];

      const todayRes = await api.get(
        `/cbs/customer/today-transactions?date=${selectedDate}`
      );
      const todayTxns = todayRes.data.data || [];

      const totalBalance = accounts.reduce(
        (sum, acc) => sum + (acc.balance || 0),
        0
      );

      const todayDeposit = todayTxns
        .filter((t) => t.type === "Deposit")
        .reduce((sum, t) => sum + (t.amount || 0), 0);

      const todayWithdraw = todayTxns
        .filter((t) => t.type === "Withdraw")
        .reduce((sum, t) => sum + (t.amount || 0), 0);

      const managers = users.filter(
        (u) => u.role?.toLowerCase() === "manager"
      );
      const tellers = users.filter(
        (u) => u.role?.toLowerCase() === "teller"
      );

      const branchWiseData = branches.map((branch) => ({
        name: branch.branchname,
        code: branch.branchcode,
        customers: customers.filter((c) => c.branchcode === branch.branchcode)
          .length,
        accounts: accounts.filter((a) => a.branchcode === branch.branchcode)
          .length,
        balance: accounts
          .filter((a) => a.branchcode === branch.branchcode)
          .reduce((sum, acc) => sum + (acc.balance || 0), 0),
        transactions: todayTxns.filter((t) => t.branchcode === branch.branchcode)
          .length,
      }));

      setDashboardData({
        totalBranches: branches.length,
        totalCustomers: customers.length,
        totalAccounts: accounts.length,
        totalBalance: totalBalance,
        todayDeposit: todayDeposit,
        todayWithdraw: todayWithdraw,
        todayTransactions: todayTxns.length,
        totalManagers: managers.length,
        totalTellers: tellers.length,
        branchWiseData: branchWiseData,
        recentTransactions: todayTxns.slice(0, 10),
      });
    } catch (err) {
      console.error("❌ Dashboard Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [selectedDate]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-secondary mt-2">Loading dashboard...</p>
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
            <i className="bi bi-bank2 me-1"></i>
            Admin Panel
          </span>
          <h1 className="text-white fw-bold mb-1">
            Welcome Back, {loggedinUser?.name || "Admin"}
          </h1>
          <p className="text-secondary m-0">
            Here's what's happening in your bank today.
          </p>
        </div>

        <div className="d-flex align-items-center gap-2 bg-dark border border-secondary rounded-3 px-3 py-2">
          <i className="bi bi-calendar3 text-secondary"></i>
          <input
            type="date"
            className="bg-transparent border-0 text-white"
            style={{ outline: "none" }}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      {/* ===== STATS CARDS ===== */}
      <DashboardCards stats={dashboardData} />

      {/* ===== CHARTS SECTION ===== */}
      <div className="row g-4 mt-3 mb-4">
        <div className="col-xl-7 col-lg-12">
          <div className="card bg-dark border-secondary h-100">
            <div className="card-body">
              <DepositChart stats={dashboardData} />
            </div>
          </div>
        </div>
        <div className="col-xl-5 col-lg-12">
          <div className="card bg-dark border-secondary h-100">
            <div className="card-body">
              <BranchChart branchData={dashboardData.branchWiseData} />
            </div>
          </div>
        </div>
      </div>

      {/* ===== RECENT TRANSACTIONS + QUICK ACTIONS ===== */}
      <div className="row g-4">
        <div className="col-xl-7 col-lg-12">
          <div className="card bg-dark border-secondary">
            <div className="card-body">
              <RecentTransactions transactions={dashboardData.recentTransactions} />
            </div>
          </div>
        </div>
        <div className="col-xl-5 col-lg-12">
          <div className="card bg-dark border-secondary h-100">
            <div className="card-body">
              <QuickActions />
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* ===== CUSTOM STYLE FOR DATE INPUT ===== */}
      <style>{`
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(0.7);
          cursor: pointer;
        }
        input[type="date"] {
          color-scheme: dark;
        }
        input[type="date"]:focus {
          outline: none;
        }
        .bg-dark.bg-opacity-50 {
          background-color: rgba(33, 37, 41, 0.5);
        }
      `}</style>

    </div>
  );
}