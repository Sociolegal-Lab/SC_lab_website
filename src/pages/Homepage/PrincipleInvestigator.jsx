import React from "react";
import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import "../../styles/font.css";

// ⬇ 讀取教授的 JSON（假設放在 src/data/leader/professor.json）
import professorRaw from "../../data/leader/professor.json";

/** 把 professor.json 轉成乾淨一點的物件 */
const normalizeProfessor = (m = {}) => ({
  name: m.name ?? "",
  photo: m.photo ?? null,
  position: m.position ?? "",
  motto: m.motto ?? "",
  region: Array.isArray(m.region) ? m.region : [],
});

/** 依照 src/data/leader 位置去算圖片實際路徑（跟 MembersRoll 類似） */
const toLeaderSrc = (m) => {
  const p = m.photo;
  if (p) {
    // 如果是絕對路徑或 http，就直接用
    if (p.startsWith("/") || /^https?:\/\//i.test(p)) return p;

    try {
      // 假設圖片放在 src/data/leader 下面
      return new URL(`../../data/leader/${p}`, import.meta.url).href;
    } catch {
      return p;
    }
  }
  return "";
};

export default function PrincipleInvestigator() {
  const professor = normalizeProfessor(professorRaw);
  const photoSrc = toLeaderSrc(professor);

  return (
    <div className={styles["mr-root"]}>
      <div className={styles["mr-container"]}>
        <div className={`rufina-bold ${styles["section-title"]}`}>
          Principle Investigator
        </div>

        <div className={styles["principleinvestigator"]}>
          <Link to="/leader">
            <div className={styles["principleinvestigator-photo"]}>
              {photoSrc ? (
                <img
                  src={photoSrc}
                  alt={professor.name || "Principle Investigator"}
                  className={styles["principleinvestigator-photo"]}
                  onError={(e) => {
                    // 如果圖壞掉，就隱藏圖片避免壞圖示
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className={styles["principleinvestigator-photo"]} />
              )}
            </div>

            <div className={styles["principleinvestigator-title"]}>
              {professor.name}
            </div>
            <div className={styles["seemore"]}>
                See More
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
