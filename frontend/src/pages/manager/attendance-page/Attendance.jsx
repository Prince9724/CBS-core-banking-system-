// import React, { useState } from "react";
// import "./Attendance.css";

// export default function Attendance() {
//   const [search, setSearch] = useState("");
//   const [status, setStatus] = useState("All");
//   const [date, setDate] = useState("");

//   return (
//     <div className="attendance-page">
//       {/* ================= HEADER ================= */}

//       <div className="attendance-header">
//         <div>
//           <span className="attendance-eyebrow">
//             <i className="bi bi-calendar-check"></i>
//             Branch Workforce
//           </span>

//           <h1>Attendance</h1>

//           <p>
//             Monitor daily staff attendance, check-in and check-out activity.
//           </p>
//         </div>

//         <div className="attendance-header-actions">
//           <div className="attendance-date-card">
//             <div className="attendance-date-icon">
//               <i className="bi bi-calendar3"></i>
//             </div>

//             <div>
//               <span>Today</span>
//               <strong>16 Aug 2026</strong>
//             </div>
//           </div>

//           <button type="button" className="attendance-refresh-btn">
//             <i className="bi bi-arrow-clockwise"></i>
//             Refresh
//           </button>
//         </div>
//       </div>

//       {/* ================= STATS ================= */}

//       <div className="attendance-stats">
//         <div className="attendance-stat-card">
//           <div className="attendance-stat-top">
//             <div className="attendance-stat-icon attendance-green">
//               <i className="bi bi-person-check-fill"></i>
//             </div>

//             <span>Present Today</span>
//           </div>

//           <strong>10</strong>

//           <div className="attendance-stat-footer">
//             <span>Staff checked in</span>
//             <i className="bi bi-check-circle"></i>
//           </div>
//         </div>

//         <div className="attendance-stat-card">
//           <div className="attendance-stat-top">
//             <div className="attendance-stat-icon attendance-red">
//               <i className="bi bi-person-x-fill"></i>
//             </div>

//             <span>Absent Today</span>
//           </div>

//           <strong>1</strong>

//           <div className="attendance-stat-footer">
//             <span>Not checked in</span>
//             <i className="bi bi-x-circle"></i>
//           </div>
//         </div>

//         <div className="attendance-stat-card">
//           <div className="attendance-stat-top">
//             <div className="attendance-stat-icon attendance-orange">
//               <i className="bi bi-clock-fill"></i>
//             </div>

//             <span>Late Arrivals</span>
//           </div>

//           <strong>2</strong>

//           <div className="attendance-stat-footer">
//             <span>Late check-ins</span>
//             <i className="bi bi-clock-history"></i>
//           </div>
//         </div>

//         <div className="attendance-stat-card">
//           <div className="attendance-stat-top">
//             <div className="attendance-stat-icon attendance-blue">
//               <i className="bi bi-graph-up-arrow"></i>
//             </div>

//             <span>Attendance Rate</span>
//           </div>

//           <strong>91.6%</strong>

//           <div className="attendance-stat-footer">
//             <span>Current branch rate</span>
//             <i className="bi bi-bar-chart"></i>
//           </div>
//         </div>
//       </div>

//       {/* ================= FILTER ================= */}

//       <div className="attendance-filter-panel">
//         <div className="attendance-filter-heading">
//           <div className="attendance-filter-icon">
//             <i className="bi bi-funnel"></i>
//           </div>

//           <div>
//             <h3>Attendance Records</h3>
//             <p>Search employees and filter attendance records.</p>
//           </div>
//         </div>

//         <div className="attendance-filter-controls">
//           {/* Search */}

//           <div className="attendance-search-box">
//             <i className="bi bi-search"></i>

//             <input
//               type="text"
//               placeholder="Search employee or employee ID..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />

//             {search && (
//               <button type="button" onClick={() => setSearch("")}>
//                 <i className="bi bi-x"></i>
//               </button>
//             )}
//           </div>

//           {/* Date */}

//           <div className="attendance-date-input">
//             <i className="bi bi-calendar-event"></i>

//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//             />
//           </div>

//           {/* Status */}

//           <div className="attendance-select-box">
//             <i className="bi bi-check2-circle"></i>

//             <select value={status} onChange={(e) => setStatus(e.target.value)}>
//               <option value="All">All Status</option>
//               <option value="Present">Present</option>
//               <option value="Absent">Absent</option>
//               <option value="Late">Late</option>
//               <option value="Leave">Leave</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* ================= TABLE ================= */}

//       <div className="attendance-table-panel">
//         <div className="attendance-panel-header">
//           <div className="attendance-panel-title">
//             <div className="attendance-panel-icon">
//               <i className="bi bi-person-lines-fill"></i>
//             </div>

//             <div>
//               <h3>Daily Attendance</h3>

//               <p>Attendance records for branch employees.</p>
//             </div>
//           </div>

//           <div className="attendance-result-count">
//             <span>Total</span>
//             <strong>12</strong>
//           </div>
//         </div>

//         <div className="attendance-table-wrapper">
//           <table className="attendance-table">
//             <thead>
//               <tr>
//                 <th>Employee</th>
//                 <th>Employee ID</th>
//                 <th>Role</th>
//                 <th>Check In</th>
//                 <th>Check Out</th>
//                 <th>Working Hours</th>
//                 <th>Status</th>
//                 <th>Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {/* Employee 1 */}

//               <tr>
//                 <td>
//                   <div className="attendance-employee">
//                     <div className="attendance-avatar attendance-avatar-blue">
//                       <i className="bi bi-person-fill"></i>
//                     </div>

//                     <div>
//                       <strong>Rajesh Kumar</strong>
//                       <span>rajesh@abcbank.com</span>
//                     </div>
//                   </div>
//                 </td>

//                 <td>
//                   <code>EMP-1001</code>
//                 </td>

//                 <td>
//                   <span className="attendance-role attendance-role-manager">
//                     <i className="bi bi-person-fill-gear"></i>
//                     Manager
//                   </span>
//                 </td>

//                 <td>
//                   <span className="attendance-time">
//                     <i className="bi bi-box-arrow-in-right"></i>
//                     09:02 AM
//                   </span>
//                 </td>

//                 <td>
//                   <span className="attendance-time-muted">--</span>
//                 </td>

//                 <td>06h 42m</td>

//                 <td>
//                   <span className="attendance-status attendance-present">
//                     <i className="bi bi-check-circle-fill"></i>
//                     Present
//                   </span>
//                 </td>

//                 <td>
//                   <button type="button" className="attendance-view-btn">
//                     <i className="bi bi-eye"></i>
//                     View
//                   </button>
//                 </td>
//               </tr>

//               {/* Employee 2 */}

//               <tr>
//                 <td>
//                   <div className="attendance-employee">
//                     <div className="attendance-avatar attendance-avatar-purple">
//                       <i className="bi bi-person-fill"></i>
//                     </div>

//                     <div>
//                       <strong>Amit Patel</strong>
//                       <span>amit@abcbank.com</span>
//                     </div>
//                   </div>
//                 </td>

//                 <td>
//                   <code>EMP-1002</code>
//                 </td>

//                 <td>
//                   <span className="attendance-role attendance-role-teller">
//                     <i className="bi bi-cash-register"></i>
//                     Teller
//                   </span>
//                 </td>

//                 <td>
//                   <span className="attendance-time">
//                     <i className="bi bi-box-arrow-in-right"></i>
//                     08:58 AM
//                   </span>
//                 </td>

//                 <td>
//                   <span className="attendance-time-muted">--</span>
//                 </td>

//                 <td>06h 46m</td>

//                 <td>
//                   <span className="attendance-status attendance-present">
//                     <i className="bi bi-check-circle-fill"></i>
//                     Present
//                   </span>
//                 </td>

//                 <td>
//                   <button type="button" className="attendance-view-btn">
//                     <i className="bi bi-eye"></i>
//                     View
//                   </button>
//                 </td>
//               </tr>

//               {/* Employee 3 */}

//               <tr>
//                 <td>
//                   <div className="attendance-employee">
//                     <div className="attendance-avatar attendance-avatar-green">
//                       <i className="bi bi-person-fill"></i>
//                     </div>

//                     <div>
//                       <strong>Neha Shah</strong>
//                       <span>neha@abcbank.com</span>
//                     </div>
//                   </div>
//                 </td>

//                 <td>
//                   <code>EMP-1003</code>
//                 </td>

//                 <td>
//                   <span className="attendance-role attendance-role-teller">
//                     <i className="bi bi-cash-register"></i>
//                     Teller
//                   </span>
//                 </td>

//                 <td>
//                   <span className="attendance-time attendance-late-time">
//                     <i className="bi bi-box-arrow-in-right"></i>
//                     09:24 AM
//                   </span>
//                 </td>

//                 <td>--</td>

//                 <td>06h 24m</td>

//                 <td>
//                   <span className="attendance-status attendance-late">
//                     <i className="bi bi-clock-fill"></i>
//                     Late
//                   </span>
//                 </td>

//                 <td>
//                   <button type="button" className="attendance-view-btn">
//                     <i className="bi bi-eye"></i>
//                     View
//                   </button>
//                 </td>
//               </tr>

//               {/* Employee 4 */}

//               <tr>
//                 <td>
//                   <div className="attendance-employee">
//                     <div className="attendance-avatar attendance-avatar-orange">
//                       <i className="bi bi-person-fill"></i>
//                     </div>

//                     <div>
//                       <strong>Priya Mehta</strong>
//                       <span>priya@abcbank.com</span>
//                     </div>
//                   </div>
//                 </td>

//                 <td>
//                   <code>EMP-1004</code>
//                 </td>

//                 <td>
//                   <span className="attendance-role attendance-role-officer">
//                     <i className="bi bi-person-vcard"></i>
//                     Officer
//                   </span>
//                 </td>

//                 <td>--</td>

//                 <td>--</td>

//                 <td>00h 00m</td>

//                 <td>
//                   <span className="attendance-status attendance-absent">
//                     <i className="bi bi-x-circle-fill"></i>
//                     Absent
//                   </span>
//                 </td>

//                 <td>
//                   <button type="button" className="attendance-view-btn">
//                     <i className="bi bi-eye"></i>
//                     View
//                   </button>
//                 </td>
//               </tr>

//               {/* Employee 5 */}

//               <tr>
//                 <td>
//                   <div className="attendance-employee">
//                     <div className="attendance-avatar attendance-avatar-blue">
//                       <i className="bi bi-person-fill"></i>
//                     </div>

//                     <div>
//                       <strong>Vivek Shah</strong>
//                       <span>vivek@abcbank.com</span>
//                     </div>
//                   </div>
//                 </td>

//                 <td>
//                   <code>EMP-1005</code>
//                 </td>

//                 <td>
//                   <span className="attendance-role attendance-role-officer">
//                     <i className="bi bi-person-vcard"></i>
//                     Officer
//                   </span>
//                 </td>

//                 <td>
//                   <span className="attendance-time">
//                     <i className="bi bi-box-arrow-in-right"></i>
//                     09:05 AM
//                   </span>
//                 </td>

//                 <td>--</td>

//                 <td>06h 39m</td>

//                 <td>
//                   <span className="attendance-status attendance-present">
//                     <i className="bi bi-check-circle-fill"></i>
//                     Present
//                   </span>
//                 </td>

//                 <td>
//                   <button type="button" className="attendance-view-btn">
//                     <i className="bi bi-eye"></i>
//                     View
//                   </button>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* ================= BOTTOM GRID ================= */}

//       <div className="attendance-bottom-grid">
//         {/* Monthly Overview */}

//         <div className="attendance-bottom-panel">
//           <div className="attendance-panel-header">
//             <div className="attendance-panel-title">
//               <div className="attendance-panel-icon attendance-icon-blue">
//                 <i className="bi bi-calendar2-week"></i>
//               </div>

//               <div>
//                 <h3>Monthly Overview</h3>

//                 <p>Current month's branch attendance.</p>
//               </div>
//             </div>
//           </div>

//           <div className="attendance-month-summary">
//             <div className="attendance-month-row">
//               <div className="attendance-month-label">
//                 <span className="attendance-dot attendance-dot-green"></span>
//                 <span>Present</span>
//               </div>

//               <strong>238</strong>
//             </div>

//             <div className="attendance-month-row">
//               <div className="attendance-month-label">
//                 <span className="attendance-dot attendance-dot-red"></span>
//                 <span>Absent</span>
//               </div>

//               <strong>12</strong>
//             </div>

//             <div className="attendance-month-row">
//               <div className="attendance-month-label">
//                 <span className="attendance-dot attendance-dot-orange"></span>
//                 <span>Late</span>
//               </div>

//               <strong>18</strong>
//             </div>

//             <div className="attendance-month-row">
//               <div className="attendance-month-label">
//                 <span className="attendance-dot attendance-dot-blue"></span>
//                 <span>Leave</span>
//               </div>

//               <strong>8</strong>
//             </div>
//           </div>
//         </div>

//         {/* Today's Activity */}

//         <div className="attendance-bottom-panel">
//           <div className="attendance-panel-header">
//             <div className="attendance-panel-title">
//               <div className="attendance-panel-icon attendance-icon-green">
//                 <i className="bi bi-activity"></i>
//               </div>

//               <div>
//                 <h3>Today's Activity</h3>

//                 <p>Current staff attendance activity.</p>
//               </div>
//             </div>
//           </div>

//           <div className="attendance-activity-list">
//             <div className="attendance-activity-row">
//               <div className="attendance-activity-icon attendance-activity-green">
//                 <i className="bi bi-box-arrow-in-right"></i>
//               </div>

//               <div>
//                 <strong>10 Staff Checked In</strong>
//                 <span>Employees currently present</span>
//               </div>

//               <strong className="attendance-activity-number">10</strong>
//             </div>

//             <div className="attendance-activity-row">
//               <div className="attendance-activity-icon attendance-activity-orange">
//                 <i className="bi bi-clock-history"></i>
//               </div>

//               <div>
//                 <strong>2 Late Arrivals</strong>
//                 <span>Employees arrived late</span>
//               </div>

//               <strong className="attendance-activity-number attendance-number-orange">
//                 2
//               </strong>
//             </div>

//             <div className="attendance-activity-row">
//               <div className="attendance-activity-icon attendance-activity-red">
//                 <i className="bi bi-person-x"></i>
//               </div>

//               <div>
//                 <strong>1 Staff Absent</strong>
//                 <span>No attendance recorded</span>
//               </div>

//               <strong className="attendance-activity-number attendance-number-red">
//                 1
//               </strong>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
