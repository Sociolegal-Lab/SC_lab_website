import React from "react";
import "./Leader.css";
import data from "./internationalConferenceData.json";

export default function InternationalConferenceCollapse() {
  // 依年份自動排序（降序）
  const sortedConferences = [...data["International Conference"]].sort(
    (a, b) => b.year - a.year
  );

  return (
    <div className="collapse-wrap">
      <details className="collapse" open={false}>
        <summary className="collapse-sum">
          <span className="collapse-title">International Conference</span>
          <span className="collapse-plus" aria-hidden="true" />
        </summary>

        <div className="collapse-body">
          {sortedConferences.map((conf, index) => (
            <div key={index} className="collapse-section">
              <p className="collapse-text-title">
                {conf.title} ({conf.year})
              </p>
              <p className="collapse-text">
                {conf.conference}, {conf.location}
              </p>
              {conf.description && (
                <p className="collapse-text">{conf.description}</p>
              )}
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
