import React from "react";
import './Leader.css';

export default function PublicationCollapse() {
  return (
    <div className="collapse-wrap">
      <details className="collapse" open={false}>
        <summary className="collapse-sum">
          <span className="collapse-title">Past Speaking Engagements</span>
          <span className="collapse-plus" aria-hidden="true" />
        </summary>

        <div className="collapse-body">
          {/* 這裡放你的內容*/}

        </div>
      </details>
    </div>
  );
}
