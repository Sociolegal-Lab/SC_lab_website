import React from "react";
import styles from "./Leader.module.css"; // ✅ 正確導入 CSS Modules
import data from "./pastSpeakingEngagementsData.json";

export default function PastSpeakingEngagementsCollapse() {
  // 依年份自動排序（降序：最新講座在上）
  const sortedEngagements = [...data["Past Speaking Engagements"]].sort(
    (a, b) => b.year - a.year
  );

  return (
    <div className={styles["collapse-wrap"]}>
      <details className={styles["collapse"]}>
        <summary className={styles["collapse-sum"]}>
          <span className={styles["collapse-title"]}>
            Past Speaking Engagements
          </span>
          <span className={styles["collapse-plus"]} aria-hidden="true" />
        </summary>

        <div className={styles["collapse-body"]}>
          {sortedEngagements.map((item, index) => (
            <div key={index} className={styles["collapse-section"]}>
              <p className={styles["collapse-text-title"]}>
                {item.title} ({item.year})
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
