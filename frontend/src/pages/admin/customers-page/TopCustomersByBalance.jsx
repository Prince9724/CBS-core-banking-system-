import "./analyticsCards.css";

const customers = [
  {
    name: "Rahul Patel",
    branch: "Surat Branch",
    amount: "₹45,00,000.00"
  },
  {
    name: "Amit Singh",
    branch: "Delhi Branch",
    amount: "₹38,50,000.00"
  },
  {
    name: "Neha Sharma",
    branch: "Mumbai Branch",
    amount: "₹35,20,000.00"
  },
  {
    name: "Priya Mehta",
    branch: "Surat Branch",
    amount: "₹28,75,000.00"
  },
  {
    name: "Vikram Joshi",
    branch: "Pune Branch",
    amount: "₹25,60,000.00"
  }
];

export default function TopCustomersByBalance() {
  return (
    <div className="analytics-card">
      <h4 className="analytics-title">Top Customers by Balance</h4>

      <div className="analytics-body">
        {customers.map((customer, index) => (
          <div className="customer-row" key={index}>
            <img
              src={`https://i.pravatar.cc/100?img=${index + 10}`}
              alt={customer.name}
              className="customer-avatar"
            />

            <div className="customer-info">
              <div className="customer-name">{customer.name}</div>
              <div className="customer-branch">{customer.branch}</div>
            </div>

            <div className="customer-amount">{customer.amount}</div>
          </div>
        ))}

        <a href="#" className="analytics-link mt-auto">
          View all customers
        </a>
      </div>
    </div>
  );
}