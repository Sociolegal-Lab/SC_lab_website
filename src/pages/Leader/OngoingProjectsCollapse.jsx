import React from "react";
import styles from "./Leader.module.css"; // ✅ 正確導入 CSS Modules
import data from "../../data/leader/leader.json"; // 匯入 JSON 資料

export default function OngoingProjectsCollapse() {
  // 自動依年份排序（降序：最新計畫在上）
  const sortedProjects = [...data["Ongoing Projects"]].sort((a, b) => {
    const extractYear = (text) => {
      const match = text.match(/(19|20)\d{2}/);
      return match ? parseInt(match[0], 10) : 0;
    };
    return extractYear(b.period) - extractYear(a.period);
  });

  return (
    <div className={styles["collapse-wrap"]}>
      <details className={styles["collapse"]}>
        <summary className={styles["collapse-sum"]}>
          <span className={styles["collapse-title"]}>Ongoing Projects</span>
          <span className={styles["collapse-plus"]} aria-hidden="true" />
        </summary>

        <div className={styles["collapse-body"]}>
          {sortedProjects.map((proj, index) => (
            <div key={index} className={styles["collapse-section"]}>
              <p className={styles["collapse-text-title"]}>
                {proj.title} ({proj.period})
              </p>
              <p className={styles["collapse-text"]}>
                {proj.organization} — {proj.role}
              </p>
              {proj.description && (
                <p className={styles["collapse-text"]}>{proj.description}</p>
              )}
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
