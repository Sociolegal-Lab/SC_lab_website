import React from "react";
import './Leader.css';

export default function EducationCollapse() {
  return (
    <div className="collapse-wrap">
      <details className="collapse" open={false}>
        <summary className="collapse-sum">
          <span className="collapse-title">Education</span>
          <span className="collapse-plus" aria-hidden="true" />
        </summary>

        <div className="collapse-body">
          {/* 這裡放你的內容*/}

        </div>
      </details>
    </div>
  );
}
