import React from "react";
import "./Leader.css";
import data from "./fellowshipsAndAwardsData.json";

export default function FellowshipsAndAwardsCollapse() {
  // 自動依年份排序（降序：最新在上）
  const sortedAwards = [...data["Fellowships and Awards"]].sort(
    (a, b) => b.year - a.year
  );

  return (
    <div className="collapse-wrap">
      <details className="collapse" open={false}>
        <summary className="collapse-sum">
          <span className="collapse-title">Fellowships and Awards</span>
          <span className="collapse-plus" aria-hidden="true" />
        </summary>

        <div className="collapse-body">
          {sortedAwards.map((item, index) => (
            <div key={index} className="collapse-section">
              <p className="collapse-text-title">
                {item.title} ({item.year})
              </p>
              <p className="collapse-text">{item.organization}</p>
              {item.description && (
                <p className="collapse-text">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
