import React from "react";
import styles from "./Leader.module.css"; // ✅ 正確導入 CSS Modules
import data from "../../data/leader/leader.json"; // 匯入 JSON 資料
export default function UpcomingSpeakingEngagementsCollapse() {
  // 依日期排序（由近到遠）
  const sortedEngagements = [...data["Upcoming Speaking Engagements"]].sort(
    (a, b) => {
      const parseDate = (text) => {
        const match = text.match(
          /(January|February|March|April|May|June|July|August|September|October|November|December)\s*(\d{4})/
        );
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
    <div className={styles["collapse-wrap"]}>
      <details className={styles["collapse"]}>
        <summary className={styles["collapse-sum"]}>
          <span className={styles["collapse-title"]}>
            Upcoming Speaking Engagements
          </span>
          <span className={styles["collapse-plus"]} aria-hidden="true" />
        </summary>

        <div className={styles["collapse-body"]}>
          {sortedEngagements.map((item, index) => (
            <div key={index} className={styles["collapse-section"]}>
              <p className={styles["collapse-text-title"]}>
                {item.title} ({item.date})
              </p>
              <p className={styles["collapse-text"]}>
                {item.event}, {item.location}
              </p>
              {item.description && (
                <p className={styles["collapse-text"]}>{item.description}</p>
              )}
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
