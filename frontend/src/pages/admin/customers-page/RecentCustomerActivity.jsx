import {
  BsGridFill,
  BsPersonBadge,
  BsCashStack,
  BsBank,
  BsCreditCard
} from "react-icons/bs";
import "./analyticsCards.css";

const activities = [
  {
    icon: <BsGridFill />,
    color: "#22C55E",
    title: "Rahul Patel opened a Savings Account",
    time: "Today, 10:30 AM"
  },
  {
    icon: <BsPersonBadge />,
    color: "#10B981",
    title: "Amit Singh updated KYC information",
    time: "Today, 09:15 AM"
  },
  {
    icon: <BsCashStack />,
    color: "#F59E0B",
    title: "Priya Mehta deposited ₹2,50,000",
    time: "Yesterday, 06:45 PM"
  },
  {
    icon: <BsBank />,
    color: "#EF4444",
    title: "Neha Sharma closed Fixed Deposit",
    time: "Yesterday, 04:20 PM"
  },
  {
    icon: <BsCreditCard />,
    color: "#3B82F6",
    title: "Vikram Joshi requested Debit Card",
    time: "Yesterday, 11:30 AM"
  }
];

export default function RecentCustomerActivity() {
  return (
    <div className="analytics-card">
      <h4 className="analytics-title">Recent Customer Activity</h4>

      <div className="analytics-body">
        {activities.map((item, index) => (
          <div className="activity-row" key={index}>
            <div
              className="activity-icon"
              style={{ background: `${item.color}22`, color: item.color }}
            >
              {item.icon}
            </div>

            <div className="activity-content">
              <div className="activity-title">{item.title}</div>
              <div className="activity-time">{item.time}</div>
            </div>
          </div>
        ))}

        <a href="#" className="analytics-link mt-auto">
          View all activity
        </a>
      </div>
    </div>
  );
}