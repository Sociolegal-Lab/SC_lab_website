import React from "react";
import "./Leader.css";
import educationData from "./educationData.json"; // 匯入 JSON 資料

export default function EducationCollapse() {
  return (
    <div className="collapse-wrap">
      <details className="collapse" open={false}>
        <summary className="collapse-sum">
          <span className="collapse-title">Education</span>
          <span className="collapse-plus" aria-hidden="true" />
        </summary>

        <div className="collapse-body">
          {educationData.Education.map((edu, index) => (
            <div key={index} className="collapse-section">
              <p className="collapse-text-title">{edu.degree}</p>
              <p className="collapse-text">
                {edu.institution} ({edu.period})
              </p>
              {edu.description && (
                <p className="collapse-text">{edu.description}</p>
              )}
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
