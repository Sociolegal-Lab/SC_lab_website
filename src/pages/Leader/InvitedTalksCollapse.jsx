import React from "react";
import styles from "./Leader.module.css"; // ✅ 正確導入 CSS Modules
import data from "../../data/leader/leader.json"; // 匯入 JSON 資料

export default function InvitedTalksCollapse() {
  // 依年份自動排序（降序：最新講座在上）
  const sortedInvitedTalks = [...data["Invited Talks"]].sort(
    (a, b) => b.year - a.year
  );

  return (
    <div className={styles["collapse-wrap"]}>
      <details className={styles["collapse"]}>
        <summary className={styles["collapse-sum"]}>
          <span className={styles["collapse-title"]}>
            Invited Talks
          </span>
          <span className={styles["collapse-plus"]} aria-hidden="true" />
        </summary>

        <div className={styles["collapse-body"]}>
          {sortedInvitedTalks.map((item, index) => (
            <div key={index} className={styles["collapse-section"]}>
              <p className={styles["collapse-text-title"]}>
                {item.title} ({item.year})
              </p>
              <p className={styles["collapse-text"]}>
                {item.event}, {item.location}
              </p>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
