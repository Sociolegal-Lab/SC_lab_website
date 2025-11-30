import React from "react";
import styles from "./Members.module.css";
import { Link } from "react-router-dom";
import professorRaw from "../../data/leader/professor.json";

/** 轉換 JSON 結構 */
const normalizeProfessor = (m = {}) => ({
  name: m.name ?? "",
  photo: m.photo ?? null,
  position: m.position ?? "",
  motto: m.motto ?? "",
  region: Array.isArray(m.region) ? m.region : [],
  tel: m.tel ?? "",
  email: m["e-mail"] ?? "",
});

/** 依照 src/data/leader 位置去算圖片路徑 */
const toLeaderSrc = (m) => {
  const p = m.photo;
  if (!p) return "";

  // 若為絕對或網址
  if (p.startsWith("/") || /^https?:\/\//i.test(p)) return p;

  try {
    // 圖片與 professor.json 同資料夾：src/data/leader/
    return new URL(`../../data/leader/${p}`, import.meta.url).href;
  } catch {
    return p;
  }
};

export default function Leaderarea() {
  const professor = normalizeProfessor(professorRaw);
  const photoSrc = toLeaderSrc(professor);

  return (
    <div className={styles["profile-wrap"]}>
      <div className={styles["profile-card"]}>
        {/* LEFT: Avatar + Contact */}
        <div className={styles["avatar-col"]}>
          <div className={styles["avatar-wrapper"]}>
            {photoSrc ? (
              <div
                className={styles["avatar"]}
                style={{
                  backgroundImage: `url(${photoSrc})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className={styles["avatar"]} />
            )}
          </div>

          {/* Contact Info */}
          <div className={styles["contact"]}>
            {/* Phone */}
            {professor.tel && (
              <div className={styles["contact-item"]}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.8 19.8 0 012.08 4.2 2 2 0 014.06 2h3a2 2 0 012 1.72c.12.9.33 1.78.63 2.62a2 2 0 01-.45 2.11l-1.27 1.27a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.84.3 1.72.51 2.62.63A2 2 0 0122 16.92z"
                    fill="currentColor"
                  />
                </svg>
                <div className="roboto-condensed-bold">{professor.tel}</div>
              </div>
            )}

            {/* Email */}
            {professor.email && (
              <div className={styles["contact-item"]}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm16 3.2l-7.1 5.32a2 2 0 01-1.8 0L4 7.2V6l8 6 8-6v1.2z"
                    fill="currentColor"
                  />
                </svg>
                <div className="roboto-condensed-bold">
                  <a href={`mailto:${professor.email}`}>{professor.email}</a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Professor Info */}
        <div className={styles["info-col"]}>
          <h1 className={`rufina-bold ${styles["name"]}`}>
            {professor.name}
          </h1>

          <p className={styles["subtitle"]}>
            {professor.region.join("; ")}
          </p>

          <p className={styles["affil"]}>{professor.position}</p>

          <blockquote className={`inter-bold ${styles["motto"]}`}>
            “{professor.motto}”
          </blockquote>

          <div className={styles["cta-row"]}>
            <Link to="/leader" className={styles["button"]}>
              <span className={styles["inter-bold"]}>View Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
