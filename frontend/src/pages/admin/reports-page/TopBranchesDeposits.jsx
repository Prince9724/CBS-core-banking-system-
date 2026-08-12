import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  LabelList,
} from "recharts";
import "./topBranchesDeposits.css";

const data = [
  { name: "Surat Main Branch", value: 125.6 },
  { name: "Navsari Branch", value: 74.25 },
  { name: "Vapi Branch", value: 58.4 },
  { name: "Bharuch Branch", value: 45.3 },
  { name: "Ankleshwar Branch", value: 41.8 },
];

const colors = ["#36D66B", "#32CC66", "#2FC563", "#2AB85D", "#27AE58"];

const ValueLabel = (props) => {
  const { x, y, width, value } = props;
  return (
    <text
      x={x + width + 10}
      y={y + 14}
      fill="#E5E7EB"
      fontSize={13}
      fontWeight={500}
    >
      ₹{Number(value).toFixed(2)} Cr
    </text>
  );
};

export default function TopBranchesDeposits() {
  return (
    <div className="branches-card">
      <div className="branches-header">
        <h3>Top 5 Branches by Deposits</h3>
        <a href="#">View All</a>
      </div>

      <div className="branches-chart">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 8, right: 90, left: 10, bottom: 8 }}
            barCategoryGap={18}
          >
            <XAxis type="number" hide />

            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              width={170}
              tick={({ x, y, payload, index }) => (
                <g transform={`translate(${x},${y})`}>
                  <text
                    x={-12}
                    y={0}
                    textAnchor="end"
                    fill="#64748B"
                    fontSize={13}
                    fontWeight={600}
                    dominantBaseline="middle"
                  >
                    {index + 1}
                  </text>

                  <text
                    x={0}
                    y={0}
                    textAnchor="start"
                    fill="#E5E7EB"
                    fontSize={13}
                    dominantBaseline="middle"
                  >
                    {payload.value}
                  </text>
                </g>
              )}
            />

            <Bar
              dataKey="value"
              radius={[0, 8, 8, 0]}
              barSize={14}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={colors[index]} />
              ))}
              <LabelList dataKey="value" content={<ValueLabel />} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}