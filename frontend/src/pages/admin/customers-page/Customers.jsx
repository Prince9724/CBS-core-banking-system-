import { Link } from "react-router-dom";
import "./customers.css";
import CustomersLineChart from "./CustomerGrowthOverviewLineChart"
import CustomerDoughtnutChart from "./CustomerByBranchDoughtNutChart"

export default function Customers() {
  const customerStatusGrid = [
    {
      icon: "bi bi-people-fill",
      iconsBg: "#152350",
      iconColor: "#5C5CF4",
      label: "Total Customers",
      value: "25,845",
      subtext: "this month",
      subValueIcon: "bi bi-arrow-up text-success",
      subValueDigit: 240,
    },
    {
      icon: "bi bi-shield-fill-check",
      label: "Active Customers",
      iconsBg: "#11351D",
      iconsColor: "#42CB46",
      value: "24,210",
      subtext: "this month",
      subValueDigit: 180,
      subValueIcon: "bi bi-arrow-up text-success",
    },
    {
      icon: "bi bi-shield-fill-exclamation",
      label: "inactive customers",
      iconsBg: "#322710",
      iconsColor: "#F39F00",
      value: "1,653",
      subtext: "this month",
      subValueDigit: 60,
      subValueIcon: "bi bi-arrow-down text-danger",
    },
    {
      icon: "bi bi-person-plus-fill",
      label: "New Customers Today",
      iconsBg: "#0E2138",
      iconsColor: "#1C7AEB",
      value: "42",
      subtext: "this month",
      subValueDigit: 12,
      subValueIcon: "bi bi-arrow-up text-success",
    },
    {
      icon: "bi bi-person-bounding-box",
      label: "KYC Pending",
      iconsBg: "#18162D",
      iconsColor: "#6E3EA2",
      value: "123",
      subtext: "Required verification",
    },
    {
      icon: "bi bi-person-fill-lock",
      label: "frozen Accounts",
      iconsBg: "#38191C",
      iconsColor: "#F03943",
      value: "15",
      subtext: "currently fronzen",
    },
    {
      icon: "bi bi-star-fill",
      label: "VIP Customers",
      iconsBg: "#312A10",
      iconsColor: "#F09707",
      value: "320",
      subtext: "High value customers",
    },
    {
      icon: "bi bi-briefcase-fill",
      label: "Bussiness Customers",
      iconsBg: "#0D1F35",
      iconsColor: "#2582F5",
      value: "2,450",
      subtext: "Business acounts",
    },
  ];

  //   step:4 most important part so we have to create data suppose we have months or years so now i want to show them like
  //   suppose i have to show jan-december customers growth
  //   then i show them like this x xis i will show the months and Y xis i will show them customer
  
  
  return (
    <div className="customer-bigparent">
      <div
        className="d-flex gap-2 justify-content-end"
        style={{ fontSize: "14px" }}
      >
        <Link className="text-primary" to={"/admin"}>
          Dashboard
        </Link>
        <span>›</span>{" "}
        <span className="" style={{ fontSize: "14px" }}>
          Customers
        </span>
      </div>
      <div className="d-flex justify-content-between mt-3">
        <div className="d-flex flex-column">
          <h4>Customers</h4>
          <p className="gray-text">
            Manage all banks customer their information
          </p>
        </div>
        <div>
          <button className="btn btn-primary">
            <i className="bi bi-plus"></i> Add Customers
          </button>
        </div>
      </div>
      <div className="customers-details-grid mt-4">
        {customerStatusGrid.map((customer, i) => (
          <div className="customer-card" key={i}>
            <div
              className="customer-icon"
              style={{ background: customer.iconsBg }}
            >
              <i
                className={customer.icon}
                style={{ color: customer.iconsColor }}
              ></i>
            </div>

            <div className="customer-info">
              <p className="customer-label">{customer.label}</p>

              <h2 className="customer-value">{customer.value}</h2>

              <div className="customer-sub">
                {customer.subValueDigit && (
                  <>
                    <i className={customer.subValueIcon}></i>

                    <span
                      className={
                        customer.subValueIcon?.includes("down")
                          ? "text-danger fw-semibold"
                          : "text-success fw-semibold"
                      }
                    >
                      {customer.subValueDigit}
                    </span>
                  </>
                )}

                <span className="sub-text">{customer.subtext}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="graphs-grand-parent row mt-5 g-4">
        <div className="col-xl-7 col-lg-7 col-12">
           <CustomersLineChart/>
        </div>
        <div className="doughnut-chart col-xl-5 col-lg-5 col-12">
            <CustomerDoughtnutChart/>
        </div>
      </div>
    </div>
  );
}

// Step 1: Understand the basic flow

// Every chart has only 3 parts.

// 1. Import Chart
//         ↓
// 2. Create Data
//         ↓
// 3. Create Options
//         ↓
// 4. Render Chart
