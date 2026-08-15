import React, { useEffect, useState } from "react";
import "./topBranchesDeposits.css";

const data = [
  { name: "Surat Main Branch", value: 125.6 },
  { name: "Navsari Branch", value: 74.25 },
  { name: "Vapi Branch", value: 58.4 },
  { name: "Bharuch Branch", value: 45.3 },
  { name: "Ankleshwar Branch", value: 41.8 },
];

const colors = ["#36D66B", "#32CC66", "#2FC563", "#2AB85D", "#27AE58"];

export default function TopBranchesDeposits() {
  const [mounted, setMounted] = useState(false);
  const maxValue = Math.max(...data.map((d) => d.value));

  useEffect(() => {
    // small delay so the browser paints the 0% state first,
    // otherwise the transition can get skipped on mount
    const timer = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <div className="branches-card">
      <div className="branches-header">
        <h3>Top 5 Branches by Deposits</h3>
        <a href="#">View All</a>
      </div>

      <div className="branches-list">
        {data.map((item, index) => {
          const widthPercent = (item.value / maxValue) * 100;
          return (
            <div className="branch-row" key={item.name}>
              <span className="branch-rank">{index + 1}</span>
              <span className="branch-name" title={item.name}>
                {item.name}
              </span>
              <div className="branch-bar-track">
                <div
                  className="branch-bar"
                  style={{
                    width: mounted ? `${widthPercent}%` : "0%",
                    backgroundColor: colors[index],
                    boxShadow: `0 0 10px ${colors[index]}66`,
                    transitionDelay: `${index * 110}ms`,
                  }}
                >
                  <span className="branch-bar-shine" />
                </div>
              </div>
              <span
                className="branch-value"
                style={{
                  transitionDelay: `${index * 110 + 300}ms`,
                  opacity: mounted ? 1 : 0,
                }}
              >
                ₹{item.value.toFixed(2)} Cr
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}