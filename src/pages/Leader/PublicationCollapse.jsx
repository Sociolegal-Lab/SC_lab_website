import React from "react";
import styles from "./Leader.module.css"; // ✅ 正確導入 CSS Modules
import publicationData from "./publicationData.json";

export default function PublicationCollapse() {
  // 提取年份
  const extractYear = (text) => {
    const match = text?.match?.(/(19|20)\d{2}/);
    return match ? parseInt(match[0], 10) : 0;
  };

  // 各分類依年份（降序）排序
  const sortedData = Object.entries(publicationData).map(([category, items]) => {
    const safeItems = Array.isArray(items) ? items : [];
    const sortedItems = [...safeItems].sort(
      (a, b) => extractYear(b.publication) - extractYear(a.publication)
    );
    return [category, sortedItems];
  });

  return (
    <div className={styles["collapse-wrap"]}>
      <details className={styles["collapse"]}>
        <summary className={styles["collapse-sum"]}>
          <span className={styles["collapse-title"]}>Publication</span>
          <span className={styles["collapse-plus"]} aria-hidden="true" />
        </summary>

        <div className={styles["collapse-body"]}>
          {sortedData.map(([category, items]) => (
            <div key={category} className={styles["collapse-section"]}>
              <p className={styles["collapse-text-title"]}>{category}</p>
              {items.map((item, index) => (
                <p className={styles["collapse-text"]} key={`${category}-${index}`}>
                  {item.title}, {item.publication}
                </p>
              ))}
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
