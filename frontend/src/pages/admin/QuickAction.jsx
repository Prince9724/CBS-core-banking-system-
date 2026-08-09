import {
  BsBank,
  BsPersonFill,
  BsPeopleFill,
  BsCreditCard2Front,
  BsFileEarmarkTextFill,
  BsShieldCheck,
} from "react-icons/bs";
import "./quickactions.css";

export default function QuickActions() {
  const actions = [
    { title: "Add Branch", icon: <BsBank />, color: "#3B82F6" },
    { title: "Add User", icon: <BsPersonFill />, color: "#22C55E" },
    { title: "Add Customer", icon: <BsPeopleFill />, color: "#9333EA" },
    { title: "Add Account", icon: <BsCreditCard2Front />, color: "#F59E0B" },
    { title: "Generate Report", icon: <BsFileEarmarkTextFill />, color: "#EF4444" },
    { title: "View Audit Logs", icon: <BsShieldCheck />, color: "#3B82F6" },
  ];

  return (
    <div className="quick-action-card">
      <h5 className="quick-title fw-bold">Quick Actions</h5>

      <div className="action-grid">
        {actions.map((item, index) => (
          <button type="button" className="action-btn" key={index}>
            <i className="action-icon" style={{ color: item.color }}>
              {item.icon}
            </i>
            <span className="action-text">{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}