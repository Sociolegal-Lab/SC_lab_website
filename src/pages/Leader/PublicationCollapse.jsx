import React from "react";
import styles from "./Leader.module.css";
import publicationData from "../../data/leader/leader.json";

export default function PublicationCollapse() {
  const extractYear = (text) => {
    const match = text?.match?.(/(19|20)\d{2}/);
    return match ? parseInt(match[0], 10) : 0;
  };

  // 只取出版類別。[資料鍵, 畫面上顯示的標題]：
  // JSON 的 key 不能含空格（內容管理後台的欄位名稱限制），但顯示文字要保留原樣。
  const publicationCategories = [
    ["journal_articles", "Journal Articles"],
    ["book_chapters", "Book Chapters"],
    ["selected_conference_papers", "Selected Conference Papers"],
  ];

  const sortedData = publicationCategories.map(([key, label]) => {
    const items = publicationData[key] || [];
    const sortedItems = [...items].sort(
      (a, b) => extractYear(b.publication) - extractYear(a.publication)
    );
    return [label, sortedItems];
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
