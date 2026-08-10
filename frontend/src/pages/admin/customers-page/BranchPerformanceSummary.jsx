import "./branchPerformanceSummary.css";

export default function BranchPerformanceSummary() {
  const branches = [
    {
      branch: "Surat Branch",
      customers: "6,350",
      deposits: "₹95.20 Cr",
      loans: "₹24.50 Cr",
      growth: "+8.2%",
      performance: "Excellent"
    },
    {
      branch: "Delhi Branch",
      customers: "5,240",
      deposits: "₹88.40 Cr",
      loans: "₹21.30 Cr",
      growth: "+6.1%",
      performance: "Very Good"
    },
    {
      branch: "Mumbai Branch",
      customers: "4,100",
      deposits: "₹72.60 Cr",
      loans: "₹18.20 Cr",
      growth: "+4.3%",
      performance: "Good"
    },
    {
      branch: "Pune Branch",
      customers: "3,800",
      deposits: "₹65.80 Cr",
      loans: "₹15.60 Cr",
      growth: "+3.2%",
      performance: "Good"
    },
    {
      branch: "Ahmedabad Branch",
      customers: "6,355",
      deposits: "₹92.10 Cr",
      loans: "₹23.80 Cr",
      growth: "+7.5%",
      performance: "Excellent"
    }
  ];

  const badgeClass = (value) => {
    if (value === "Excellent") return "badge-excellent";
    if (value === "Very Good") return "badge-verygood";
    return "badge-good";
  };

  return (
    <div className="branch-summary-card">
      <h4 className="branch-summary-title">Branch Performance Summary</h4>

      <div className="table-responsive branch-table-wrapper">
        <table className="table branch-summary-table align-middle">
          <thead>
            <tr>
              <th>Branch</th>
              <th>Customers</th>
              <th>Total Deposits</th>
              <th>Total Loans</th>
              <th>Growth (This Month)</th>
              <th>Performance</th>
            </tr>
          </thead>

          <tbody>
            {branches.map((item, index) => (
              <tr key={index}>
                <td className="branch-name">{item.branch}</td>
                <td>{item.customers}</td>
                <td>{item.deposits}</td>
                <td>{item.loans}</td>
                <td className="growth-up">↑ {item.growth}</td>
                <td>
                  <span className={`performance-badge ${badgeClass(item.performance)}`}>
                    {item.performance}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}