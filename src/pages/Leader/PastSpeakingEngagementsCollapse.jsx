import React from "react";
import "./Leader.css";
import data from "./pastSpeakingEngagementsData.json";

export default function PastSpeakingEngagementsCollapse() {
  // 依年份自動排序（降序：最新講座在上）
  const sortedEngagements = [...data["Past Speaking Engagements"]].sort(
    (a, b) => b.year - a.year
  );

  return (
    <div className="collapse-wrap">
      <details className="collapse" open={false}>
        <summary className="collapse-sum">
          <span className="collapse-title">Past Speaking Engagements</span>
          <span className="collapse-plus" aria-hidden="true" />
        </summary>

        <div className="collapse-body">
          {sortedEngagements.map((item, index) => (
            <div key={index} className="collapse-section">
              <p className="collapse-text-title">
                {item.title} ({item.year})
              </p>
              <p className="collapse-text">
                {item.event}, {item.location}
              </p>
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
