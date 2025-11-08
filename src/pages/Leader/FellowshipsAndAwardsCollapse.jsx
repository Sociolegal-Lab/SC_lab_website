import React from "react";
import styles from "./Leader.module.css"; // ✅ 正確導入 CSS Modules
import data from "./fellowshipsAndAwardsData.json";

export default function FellowshipsAndAwardsCollapse() {
  // 自動依年份排序（降序：最新在上）
  const sortedAwards = [...data["Fellowships and Awards"]].sort(
    (a, b) => b.year - a.year
  );

  return (
    <div className={styles["collapse-wrap"]}>
      <details className={styles["collapse"]}>
        <summary className={styles["collapse-sum"]}>
          <span className={styles["collapse-title"]}>
            Fellowships and Awards
          </span>
          <span className={styles["collapse-plus"]} aria-hidden="true" />
        </summary>

        <div className={styles["collapse-body"]}>
          {sortedAwards.map((item, index) => (
            <div key={index} className={styles["collapse-section"]}>
              <p className={styles["collapse-text-title"]}>
                {item.title} ({item.year})
              </p>
              <p className={styles["collapse-text"]}>{item.organization}</p>
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
