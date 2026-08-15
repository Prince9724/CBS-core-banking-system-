import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import "./portfolioCard.css";

const data = [
  { name: "Deposits", value: 845.60, percentage: 58 },
  { name: "Loans", value: 612.35, percentage: 42 },
];

const COLORS = ["#36D66B", "#3B82F6"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="tooltip-label">{payload[0].name}</p>
        <p className="tooltip-value">₹{payload[0].value.toFixed(2)} Cr</p>
        <p className="tooltip-percentage">{payload[0].payload.percentage}%</p>
      </div>
    );
  }
  return null;
};

export default function OverallPortfolio() {
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsSmallMobile(window.innerWidth < 480);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const innerRadius = isSmallMobile ? 35 : isMobile ? 45 : 55;
  const outerRadius = isSmallMobile ? 60 : isMobile ? 75 : 90;
  const labelFontSize = isSmallMobile ? 10 : isMobile ? 12 : 14;

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#F8FAFC"
        fontSize={labelFontSize}
        fontWeight={700}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="portfolio-card">
      <div className="portfolio-header">
        <h3>Overall Portfolio (All Branches)</h3>
      </div>

      <div className="portfolio-content">
        <div className="portfolio-chart">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                paddingAngle={2}
                dataKey="value"
                labelLine={false}
                label={renderCustomLabel}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="#23272F"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="portfolio-stats">
          <div className="stat-item deposits">
            <div className="stat-header">
              <div className="stat-dot deposits-dot"></div>
              <span className="stat-label">Deposits</span>
            </div>
            <div className="stat-value">₹845.60 Cr</div>
            <div className="stat-percentage">58%</div>
          </div>

          <div className="stat-item loans">
            <div className="stat-header">
              <div className="stat-dot loans-dot"></div>
              <span className="stat-label">Loans</span>
            </div>
            <div className="stat-value">₹612.35 Cr</div>
            <div className="stat-percentage">42%</div>
          </div>
        </div>
      </div>
    </div>
  );
}