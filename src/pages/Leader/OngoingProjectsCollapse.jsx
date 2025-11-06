import React from "react";
import "./Leader.css";
import data from "./ongoingProjectsData.json";

export default function OngoingProjectsCollapse() {
  // 自動依年份排序（降序：最新計畫在上）
  const sortedProjects = [...data["Ongoing Projects"]].sort((a, b) => {
    // 從期間中提取年份（例如 "2024 – Present" -> 2024）
    const extractYear = (text) => {
      const match = text.match(/(19|20)\d{2}/);
      return match ? parseInt(match[0], 10) : 0;
    };
    return extractYear(b.period) - extractYear(a.period);
  });

  return (
    <div className="collapse-wrap">
      <details className="collapse" open={false}>
        <summary className="collapse-sum">
          <span className="collapse-title">Ongoing Projects</span>
          <span className="collapse-plus" aria-hidden="true" />
        </summary>

        <div className="collapse-body">
          {sortedProjects.map((proj, index) => (
            <div key={index} className="collapse-section">
              <p className="collapse-text-title">
                {proj.title} ({proj.period})
              </p>
              <p className="collapse-text">
                {proj.organization} — {proj.role}
              </p>
              {proj.description && (
                <p className="collapse-text">{proj.description}</p>
              )}
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
