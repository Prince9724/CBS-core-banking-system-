import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-dark border-secondary rounded-3 p-3 text-white">
      <strong>{label}</strong>
      {payload.map((item, index) => (
        <div key={index} className="d-flex justify-content-between gap-3">
          <span>{item.name}</span>
          <strong>₹{item.value?.toLocaleString()}</strong>
        </div>
      ))}
    </div>
  );
}

export default function DepositByBranchesChart({ branchData = [] }) {
  const colors = ["#3b82f6", "#22c55e", "#f59e0b", "#8b5cf6", "#ef4444", "#06b6d4", "#ec4899"];

  const chartData = branchData.map((branch) => ({
    name: branch.branchname || branch.branchcode,
    Deposits: branch.deposits || 0,
    Withdrawals: branch.withdrawals || 0,
    Balance: branch.balance || 0,
  }));

  if (chartData.length === 0) {
    return (
      <div className="text-center py-5 text-secondary">
        <i className="bi bi-bar-chart fs-1 d-block mb-2"></i>
        <p>No branch data available</p>
      </div>
    );
  }

  return (
    <div>
      <h5 className="text-white mb-3">
        <i className="bi bi-bar-chart-fill me-2 text-primary"></i>
        Branch-wise Deposits & Withdrawals
      </h5>
      <div style={{ height: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: "#718096", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#718096", fontSize: 9 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v/1000}K`} />
            <Tooltip content={<ChartTooltip />} />
            <Legend verticalAlign="top" align="right" height={35} iconType="circle" wrapperStyle={{ fontSize: "9px", color: "#94a3b8" }} />
            <Bar dataKey="Deposits" fill="#22c55e" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Withdrawals" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}