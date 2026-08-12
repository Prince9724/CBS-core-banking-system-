import React from "react";
import { BsCalendar3, BsDownload, BsFileEarmarkPdf } from "react-icons/bs";
import "./reportsHeader.css";

export default function ReportsHeader() {
  return (
    <div className="reports-header">
      <div className="reports-header-left">
        <h2 className="reports-title">Branch Performance Reports</h2>
        <p className="reports-breadcrumb">
          Dashboard  Reports  Branch Performance
        </p>
      </div>

      <div className="reports-header-right">
        <button className="date-range-btn">
          <BsCalendar3 />
          <span>01 Jul 2024 - 31 Jul 2024</span>
        </button>

        <button className="export-btn excel-btn">
          <BsDownload />
          <span>Export Excel</span>
        </button>

        <button className="export-btn pdf-btn">
          <BsFileEarmarkPdf />
          <span>Export PDF</span>
        </button>
      </div>
    </div>
  );
}