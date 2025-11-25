import React from "react";
import styles from "./Leader.module.css"; // ✅ 正確導入 CSS Modules
import data from "../../data/leader/leader.json"; // 匯入 JSON 資料
export default function InternationalConferenceCollapse() {
  // 依年份自動排序（降序）
  const sortedConferences = [...data["International Conference"]].sort(
    (a, b) => b.year - a.year
  );

  return (
    <div className={styles["collapse-wrap"]}>
      <details className={styles["collapse"]}>
        <summary className={styles["collapse-sum"]}>
          <span className={styles["collapse-title"]}>
            International Conference
          </span>
          <span className={styles["collapse-plus"]} aria-hidden="true" />
        </summary>

        <div className={styles["collapse-body"]}>
          {sortedConferences.map((conf, index) => (
            <div key={index} className={styles["collapse-section"]}>
              <p className={styles["collapse-text-title"]}>
                {conf.title} ({conf.year})
              </p>
              <p className={styles["collapse-text"]}>
                {conf.conference}, {conf.location}
              </p>
              {conf.description && (
                <p className={styles["collapse-text"]}>{conf.description}</p>
              )}
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
