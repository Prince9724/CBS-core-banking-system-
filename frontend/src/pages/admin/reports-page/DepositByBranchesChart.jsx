import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  LabelList,
  CartesianGrid,
} from "recharts";
import "./depositbybranches.css";

const data = [
  { name: "Surat Main", value: 125.6 },
  { name: "Navsari", value: 74.25 },
  { name: "Vapi", value: 58.4 },
  { name: "Bharuch", value: 45.3 },
  { name: "Ankleshwar", value: 41.8 },
  { name: "Valsad", value: 36.75 },
  { name: "Rajkot", value: 32.4 },
  { name: "Ahmedabad", value: 29.6 },
  { name: "Bhavnagar", value: 24.1 },
  { name: "Jamnagar", value: 21.4 },
];

const colors = [
  "#36D66B", "#32CC66", "#2FC563", "#2AB85D", "#27AE58",
  "#22A84A", "#1E9A42", "#1A8C3A", "#167E32", "#12702A"
];

export default function DepositByBranchesChart() {
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

  // Responsive sizes
  const getResponsiveSizes = () => {
    if (isSmallMobile) {
      return {
        fontSize: 9,
        valueFontSize: 8,
        barSize: 12,
        barGap: 4,
        barRadius: 3,
        marginTop: 10,
        marginBottom: 25,
        marginRight: 25,
        marginLeft: 0,
        labelOffset: 4,
        axisFontSize: 8,
      };
    } else if (isMobile) {
      return {
        fontSize: 10,
        valueFontSize: 9,
        barSize: 14,
        barGap: 5,
        barRadius: 4,
        marginTop: 12,
        marginBottom: 30,
        marginRight: 35,
        marginLeft: 0,
        labelOffset: 5,
        axisFontSize: 9,
      };
    } else {
      return {
        fontSize: 12,
        valueFontSize: 11,
        barSize: 18,
        barGap: 8,
        barRadius: 5,
        marginTop: 15,
        marginBottom: 40,
        marginRight: 50,
        marginLeft: 0,
        labelOffset: 6,
        axisFontSize: 10,
      };
    }
  };

  const sizes = getResponsiveSizes();

  // Format Y-axis labels (branch names)
  const formatYAxisTick = (value) => {
    if (value.length > 12) {
      return value.substring(0, 10) + "...";
    }
    return value;
  };

  // Custom label at the end of each bar
  const CustomValueLabel = (props) => {
    const { x, y, width, value } = props;
    return (
      <text
        x={x + width + sizes.labelOffset}
        y={y}
        fill="#94A3B8"
        fontSize={sizes.valueFontSize}
        fontWeight={600}
        dominantBaseline="middle"
      >
        {Number(value).toFixed(1)}
      </text>
    );
  };

  return (
    <div className="branches-card">
      <div className="branches-header">
        <h3>Deposits by Branch (₹ Cr)</h3>
      </div>

      <div className="branches-chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: sizes.marginTop,
              right: sizes.marginRight,
              left: sizes.marginLeft,
              bottom: sizes.marginBottom,
            }}
            barCategoryGap={sizes.barGap}
            barGap={0}
          >
            {/* X-axis with values */}
            <XAxis
              type="number"
              axisLine={{ stroke: '#2D3139', strokeWidth: 1 }}
              tickLine={{ stroke: '#2D3139' }}
              tick={{ 
                fill: '#64748B', 
                fontSize: sizes.axisFontSize,
                fontWeight: 500
              }}
              domain={[0, 150]}
              ticks={[0, 50, 100, 150]}
              tickFormatter={(value) => `${value} Cr`}
            />

            {/* Y-axis with branch names */}
            <YAxis
              type="category"
              dataKey="name"
              axisLine={{ stroke: '#2D3139', strokeWidth: 1 }}
              tickLine={false}
              width={isSmallMobile ? 50 : isMobile ? 60 : 80}
              tick={{ 
                fill: '#E5E7EB', 
                fontSize: sizes.fontSize,
                fontWeight: 500
              }}
              tickFormatter={formatYAxisTick}
              orientation="left"
            />

            {/* Grid lines */}
            <CartesianGrid
              horizontal={false}
              vertical={true}
              stroke="#2D3139"
              strokeDasharray="3 3"
              opacity={0.3}
            />

            {/* Bars */}
            <Bar
              dataKey="value"
              radius={[0, sizes.barRadius, sizes.barRadius, 0]}
              barSize={sizes.barSize}
              minPointSize={3}
              background={false}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={colors[index % colors.length]} 
                />
              ))}
              <LabelList 
                dataKey="value" 
                content={<CustomValueLabel />}
                position="right"
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}