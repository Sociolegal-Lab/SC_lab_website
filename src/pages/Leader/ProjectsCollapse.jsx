import React from "react";
import styles from "./Leader.module.css";
import projectsData from "../../data/leader/leader.json";

export default function ProjectsCollapse() {
  const extractYear = (text) => {
    if (!text) return 0;
    const matches = text.match(/(19|20)\d{2}/g);
    if (!matches) return 0;
    // 像 "2022-2025" 會抓到 ["2022", "2025"]，取最大值 2025
    return Math.max(...matches.map((y) => parseInt(y, 10)));
  };

  const projectsCategories = ["Projects"];

  const sortedData = projectsCategories.map((category) => {
    const items = projectsData[category] || [];
    const sortedItems = [...items].sort(
      (a, b) => extractYear(b.year) - extractYear(a.year)
    );
    return [category, sortedItems];
  });

  return (
    <div className={styles["collapse-wrap"]}>
      <details className={styles["collapse"]}>
        <summary className={styles["collapse-sum"]}>
          <span className={styles["collapse-title"]}>Projects</span>
          <span className={styles["collapse-plus"]} aria-hidden="true" />
        </summary>

        <div className={styles["collapse-body"]}>
          {sortedData.map(([category, items]) => (
            <div key={category} className={styles["collapse-section"]}>
              <p className={styles["collapse-text-title"]}>{category}</p>
              {items.map((item, index) => (
                <p
                  className={styles["collapse-text"]}
                  key={`${category}-${index}`}
                >
                  {item.title} ({item.year}){item.organization ? ` — ${item.organization}` : ""}{item.description ? ` — ${item.description}` : ""}
                </p>
              ))}
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
