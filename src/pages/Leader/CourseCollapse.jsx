import React from "react";
import styles from "./Leader.module.css";
import coursesData from "../../data/leader/leader.json";

export default function CoursesCollapse() {
  const extractYear = (text) => {
    if (!text) return 0;
    const matches = text.match(/(19|20)\d{2}/g);
    if (!matches) return 0;
    // 有些是 (2023 Fall, 2024 Fall)，取最大那個年份
    return Math.max(...matches.map((y) => parseInt(y, 10)));
  };

  const courseCategories = ["Courses"];

  const sortedData = courseCategories.map((category) => {
    const items = coursesData[category] || [];
    const sortedItems = [...items].sort(
      (a, b) => extractYear(b.semester) - extractYear(a.semester)
    );
    return [category, sortedItems];
  });

  return (
    <div className={styles["collapse-wrap"]}>
      <details className={styles["collapse"]}>
        <summary className={styles["collapse-sum"]}>
          <span className={styles["collapse-title"]}>Courses</span>
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
                  {item.title}, {item.semester}
                </p>
              ))}
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
