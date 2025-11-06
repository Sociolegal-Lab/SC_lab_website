import React from "react";
import "./Leader.css";
import data from "./upcomingSpeakingEngagementsData.json";

export default function UpcomingSpeakingEngagementsCollapse() {
  // 依日期排序（由近到遠）
  const sortedEngagements = [...data["Upcoming Speaking Engagements"]].sort(
    (a, b) => {
      const parseDate = (text) => {
        const match = text.match(/(January|February|March|April|May|June|July|August|September|October|November|December)\s*(\d{4})/);
        if (!match) return 0;
        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        const monthIndex = monthNames.indexOf(match[1]);
        return new Date(parseInt(match[2], 10), monthIndex).getTime();
      };
      return parseDate(a.date) - parseDate(b.date); // 由近到遠
    }
  );

  return (
    <div className="collapse-wrap">
      <details className="collapse" open={false}>
        <summary className="collapse-sum">
          <span className="collapse-title">Upcoming Speaking Engagements</span>
          <span className="collapse-plus" aria-hidden="true" />
        </summary>

        <div className="collapse-body">
          {sortedEngagements.map((item, index) => (
            <div key={index} className="collapse-section">
              <p className="collapse-text-title">
                {item.title} ({item.date})
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
