import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import "./ManagerReports.css";

// =====================================================
// SAMPLE REPORT DATA
// Replace these values later with your API data
// =====================================================

const transactionTrend = [
  {
    day: "Mon",
    deposits: 185000,
    withdrawals: 92000,
    transactions: 42,
  },
  {
    day: "Tue",
    deposits: 225000,
    withdrawals: 115000,
    transactions: 51,
  },
  {
    day: "Wed",
    deposits: 195000,
    withdrawals: 98000,
    transactions: 46,
  },
  {
    day: "Thu",
    deposits: 285000,
    withdrawals: 135000,
    transactions: 63,
  },
  {
    day: "Fri",
    deposits: 315000,
    withdrawals: 158000,
    transactions: 72,
  },
  {
    day: "Sat",
    deposits: 245000,
    withdrawals: 118000,
    transactions: 58,
  },
  {
    day: "Sun",
    deposits: 175000,
    withdrawals: 84000,
    transactions: 39,
  },
];

const monthlyGrowth = [
  {
    month: "Jan",
    customers: 420,
    accounts: 510,
  },
  {
    month: "Feb",
    customers: 465,
    accounts: 558,
  },
  {
    month: "Mar",
    customers: 510,
    accounts: 605,
  },
  {
    month: "Apr",
    customers: 575,
    accounts: 672,
  },
  {
    month: "May",
    customers: 630,
    accounts: 741,
  },
  {
    month: "Jun",
    customers: 695,
    accounts: 820,
  },
];

const accountDistribution = [
  {
    name: "Savings",
    value: 680,
  },
  {
    name: "Current",
    value: 245,
  },
  {
    name: "Salary",
    value: 125,
  },
];

const tellerPerformance = [
  {
    name: "Amit",
    deposits: 82,
    withdrawals: 54,
  },
  {
    name: "Rahul",
    deposits: 74,
    withdrawals: 48,
  },
  {
    name: "Neha",
    deposits: 91,
    withdrawals: 62,
  },
  {
    name: "Priya",
    deposits: 68,
    withdrawals: 41,
  },
];

const balanceTrend = [
  {
    month: "Jan",
    balance: 2850000,
  },
  {
    month: "Feb",
    balance: 3120000,
  },
  {
    month: "Mar",
    balance: 3380000,
  },
  {
    month: "Apr",
    balance: 3650000,
  },
  {
    month: "May",
    balance: 3980000,
  },
  {
    month: "Jun",
    balance: 4250000,
  },
];

const COLORS = ["#3b82f6", "#22c55e", "#f59e0b"];

// =====================================================
// CUSTOM TOOLTIP
// =====================================================

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className="manager-chart-tooltip">
      <span className="manager-tooltip-label">{label}</span>

      {payload.map((item, index) => (
        <div className="manager-tooltip-row" key={`${item.name}-${index}`}>
          <span>{item.name}</span>

          <strong>
            {typeof item.value === "number"
              ? item.value.toLocaleString()
              : item.value}
          </strong>
        </div>
      ))}
    </div>
  );
}

// =====================================================
// MAIN COMPONENT
// =====================================================

export default function ManagerReports() {
  return (
    <div className="manager-reports-page">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="manager-reports-header">
        <div>
          <span className="manager-reports-eyebrow">
            <i className="bi bi-bar-chart-line"></i>
            Branch Analytics
          </span>

          <h1>Branch Reports</h1>

          <p>
            Monitor branch performance, transactions, balances and customer
            growth.
          </p>
        </div>

        <div className="manager-reports-actions">
          <div className="manager-report-period">
            <i className="bi bi-calendar3"></i>

            <select defaultValue="7days">
              <option value="7days">Last 7 Days</option>

              <option value="30days">Last 30 Days</option>

              <option value="90days">Last 90 Days</option>

              <option value="year">This Year</option>
            </select>
          </div>

          <button type="button" className="manager-report-refresh">
            <i className="bi bi-arrow-clockwise"></i>
            Refresh
          </button>
        </div>
      </div>

      {/* =================================================
          SUMMARY CARDS
      ================================================= */}

      <div className="manager-report-stats">
        {/* Total Deposits */}

        <div className="manager-report-stat">
          <div className="manager-report-stat-top">
            <div className="manager-report-stat-icon report-green">
              <i className="bi bi-arrow-down-left"></i>
            </div>

            <span>Total Deposits</span>
          </div>

          <strong>₹14.25L</strong>

          <div className="manager-report-stat-bottom">
            <span className="positive">
              <i className="bi bi-arrow-up"></i>
              12.8%
            </span>

            <small>vs last period</small>
          </div>
        </div>

        {/* Total Withdrawals */}

        <div className="manager-report-stat">
          <div className="manager-report-stat-top">
            <div className="manager-report-stat-icon report-orange">
              <i className="bi bi-arrow-up-right"></i>
            </div>

            <span>Total Withdrawals</span>
          </div>

          <strong>₹8.42L</strong>

          <div className="manager-report-stat-bottom">
            <span className="negative">
              <i className="bi bi-arrow-up"></i>
              6.4%
            </span>

            <small>vs last period</small>
          </div>
        </div>

        {/* Customers */}

        <div className="manager-report-stat">
          <div className="manager-report-stat-top">
            <div className="manager-report-stat-icon report-blue">
              <i className="bi bi-people"></i>
            </div>

            <span>Total Customers</span>
          </div>

          <strong>695</strong>

          <div className="manager-report-stat-bottom">
            <span className="positive">
              <i className="bi bi-arrow-up"></i>
              9.6%
            </span>

            <small>this month</small>
          </div>
        </div>

        {/* Branch Balance */}

        <div className="manager-report-stat">
          <div className="manager-report-stat-top">
            <div className="manager-report-stat-icon report-purple">
              <i className="bi bi-bank"></i>
            </div>

            <span>Branch Balance</span>
          </div>

          <strong>₹42.50L</strong>

          <div className="manager-report-stat-bottom">
            <span className="positive">
              <i className="bi bi-arrow-up"></i>
              7.2%
            </span>

            <small>current balance</small>
          </div>
        </div>
      </div>

      {/* =================================================
          TRANSACTION TREND
      ================================================= */}

      <div className="manager-chart-grid">
        <div className="manager-chart-card manager-chart-large">
          <div className="manager-chart-header">
            <div className="manager-chart-title">
              <div className="manager-chart-icon report-blue">
                <i className="bi bi-graph-up"></i>
              </div>

              <div>
                <h3>Transaction Performance</h3>

                <p>Deposit and withdrawal activity.</p>
              </div>
            </div>

            <span className="manager-chart-period">Weekly</span>
          </div>

          <div className="manager-chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={transactionTrend}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(148,163,184,0.08)"
                  vertical={false}
                />

                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#718096",
                    fontSize: 10,
                  }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#718096",
                    fontSize: 9,
                  }}
                  tickFormatter={(value) => `${value / 1000}K`}
                />

                <Tooltip content={<ChartTooltip />} />

                <Legend
                  verticalAlign="top"
                  align="right"
                  height={35}
                  iconType="circle"
                  wrapperStyle={{
                    fontSize: "9px",
                    color: "#94a3b8",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="deposits"
                  name="Deposits"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{
                    r: 4,
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="withdrawals"
                  name="Withdrawals"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{
                    r: 4,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* =================================================
            ACCOUNT DISTRIBUTION
        ================================================= */}

        <div className="manager-chart-card">
          <div className="manager-chart-header">
            <div className="manager-chart-title">
              <div className="manager-chart-icon report-purple">
                <i className="bi bi-pie-chart"></i>
              </div>

              <div>
                <h3>Account Distribution</h3>

                <p>Accounts by type.</p>
              </div>
            </div>
          </div>

          <div className="manager-pie-container">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={accountDistribution}
                  cx="50%"
                  cy="45%"
                  innerRadius={58}
                  outerRadius={82}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {accountDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>

                <Tooltip content={<ChartTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            <div className="manager-pie-center">
              <strong>1,050</strong>
              <span>Accounts</span>
            </div>
          </div>

          <div className="manager-pie-legend">
            {accountDistribution.map((account, index) => (
              <div className="manager-pie-legend-item" key={account.name}>
                <div>
                  <span
                    className="manager-pie-dot"
                    style={{
                      background: COLORS[index],
                    }}
                  ></span>

                  <span>{account.name}</span>
                </div>

                <strong>{account.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =================================================
          CUSTOMER / ACCOUNT GROWTH
      ================================================= */}

      <div className="manager-chart-grid">
        <div className="manager-chart-card manager-chart-large">
          <div className="manager-chart-header">
            <div className="manager-chart-title">
              <div className="manager-chart-icon report-blue">
                <i className="bi bi-people-fill"></i>
              </div>

              <div>
                <h3>Customer & Account Growth</h3>

                <p>Monthly branch growth.</p>
              </div>
            </div>
          </div>

          <div className="manager-chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyGrowth}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(148,163,184,0.08)"
                  vertical={false}
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#718096",
                    fontSize: 10,
                  }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#718096",
                    fontSize: 9,
                  }}
                />

                <Tooltip content={<ChartTooltip />} />

                <Legend
                  verticalAlign="top"
                  align="right"
                  height={35}
                  iconType="circle"
                  wrapperStyle={{
                    fontSize: "9px",
                  }}
                />

                <Bar
                  dataKey="customers"
                  name="Customers"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                  barSize={13}
                />

                <Bar
                  dataKey="accounts"
                  name="Accounts"
                  fill="#8b5cf6"
                  radius={[4, 4, 0, 0]}
                  barSize={13}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* =================================================
            BRANCH BALANCE
        ================================================= */}

        <div className="manager-chart-card">
          <div className="manager-chart-header">
            <div className="manager-chart-title">
              <div className="manager-chart-icon report-green">
                <i className="bi bi-wallet2"></i>
              </div>

              <div>
                <h3>Branch Balance</h3>

                <p>Monthly balance trend.</p>
              </div>
            </div>
          </div>

          <div className="manager-balance-value">
            <strong>₹42.50L</strong>

            <span>
              <i className="bi bi-arrow-up"></i>
              7.2%
            </span>
          </div>

          <div className="manager-small-chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={balanceTrend}>
                <defs>
                  <linearGradient
                    id="balanceGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.25} />

                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <XAxis dataKey="month" hide />

                <YAxis hide />

                <Tooltip content={<ChartTooltip />} />

                <Area
                  type="monotone"
                  dataKey="balance"
                  name="Balance"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#balanceGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* =================================================
          TELLER PERFORMANCE
      ================================================= */}

      <div className="manager-chart-card manager-teller-card">
        <div className="manager-chart-header">
          <div className="manager-chart-title">
            <div className="manager-chart-icon report-orange">
              <i className="bi bi-person-workspace"></i>
            </div>

            <div>
              <h3>Teller Performance</h3>

              <p>Transaction activity handled by branch staff.</p>
            </div>
          </div>

          <span className="manager-chart-period">This Month</span>
        </div>

        <div className="manager-teller-chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={tellerPerformance}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(148,163,184,0.08)"
                vertical={false}
              />

              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#718096",
                  fontSize: 10,
                }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#718096",
                  fontSize: 9,
                }}
              />

              <Tooltip content={<ChartTooltip />} />

              <Legend
                verticalAlign="top"
                align="right"
                height={35}
                iconType="circle"
                wrapperStyle={{
                  fontSize: "9px",
                }}
              />

              <Bar
                dataKey="deposits"
                name="Deposits"
                fill="#22c55e"
                radius={[4, 4, 0, 0]}
                barSize={18}
              />

              <Bar
                dataKey="withdrawals"
                name="Withdrawals"
                fill="#f59e0b"
                radius={[4, 4, 0, 0]}
                barSize={18}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* =================================================
          REPORT SUMMARY
      ================================================= */}

      <div className="manager-report-summary-grid">
        <div className="manager-summary-item">
          <i className="bi bi-arrow-down-circle"></i>

          <div>
            <span>Average Daily Deposit</span>
            <strong>₹2.03L</strong>
          </div>
        </div>

        <div className="manager-summary-item">
          <i className="bi bi-arrow-up-circle"></i>

          <div>
            <span>Average Daily Withdrawal</span>
            <strong>₹1.20L</strong>
          </div>
        </div>

        <div className="manager-summary-item">
          <i className="bi bi-receipt"></i>

          <div>
            <span>Total Transactions</span>
            <strong>371</strong>
          </div>
        </div>

        <div className="manager-summary-item">
          <i className="bi bi-person-check"></i>

          <div>
            <span>Active Customers</span>
            <strong>628</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
