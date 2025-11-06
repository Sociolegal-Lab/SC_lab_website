import React from "react";
import "./Leader.css";
import publicationData from "./publicationData.json";

export default function PublicationCollapse() {
  // 提取年份的輔助函式
  const extractYear = (text) => {
    const match = text.match(/(19|20)\d{2}/);
    return match ? parseInt(match[0], 10) : 0; // 若無年份則放最下
  };

  // 對每個分類自動排序（依年份降序）
  const sortedData = Object.entries(publicationData).map(([category, items]) => {
    const sortedItems = [...items].sort(
      (a, b) => extractYear(b.publication) - extractYear(a.publication)
    );
    return [category, sortedItems];
  });

  return (
    <div className="collapse-wrap">
      <details className="collapse" open={false}>
        <summary className="collapse-sum">
          <span className="collapse-title">Publication</span>
          <span className="collapse-plus" aria-hidden="true" />
        </summary>

        <div className="collapse-body">
          {sortedData.map(([category, items]) => (
            <div key={category}>
              <p className="collapse-text-title">{category}</p>
              {items.map((item, index) => (
                <p className="collapse-text" key={`${category}-${index}`}>
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
