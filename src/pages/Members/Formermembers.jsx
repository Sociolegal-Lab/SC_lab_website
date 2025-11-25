import React from "react";
import styles from "./Members.module.css";
import membersData from "../../data/members/formermembers.json";

/** 與 Ourmembers.jsx 完全一致的抓圖片邏輯 */
const toSrc = (m = {}) => {
  const p = m.photo;
  if (p) {
    if (p.startsWith("/") || /^https?:\/\//i.test(p)) return p;
    try {
      return new URL(`../../data/members/${p}`, import.meta.url).href;
    } catch {
      return p;
    }
  }
  try {
    return new URL(`../../data/members/${m.id}.jpeg`, import.meta.url).href;
  } catch {
    return "";
  }
};

export default function FormerMembers() {
  return (
    <section className={styles["members-section"]}>
      <div className={styles["subtitle"]}>FORMER MEMBERS</div>

      <div className={styles["member-grid"]}>
        {membersData.map((member, index) => {
          const bio = Array.isArray(member.bio) ? member.bio : [];
          const socials = member.socials ?? {};
          const imgSrc = toSrc(member);     // ← 新增：抓圖片

          return (
            <div className={styles["member-card"]} key={member.id ?? index}>

              {/* ★ 圓形頭像（與現有 Members 一樣） */}
              <div className={styles["member-avatar"]} aria-hidden="true">
                {imgSrc && (
                  <img
                    src={imgSrc}
                    alt={member.English_name || `member-${index}`}
                    className={styles["member-avatar-img"]}
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                )}
              </div>

              <div className={styles["member-name"]}>
                {member.English_name}
              </div>
              <div className={styles["member-title"]}>{member.title}</div>

              <ul className={styles["member-bio"]}>
                {bio.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              {member.email && (
                <span className={styles["member-email"]}>{member.email}</span>
              )}

              <div className={styles["socials"]}>
                {socials.linkedin && (
                  <a href={socials.linkedin} target="_blank" rel="noreferrer">
                    in
                  </a>
                )}
                {socials.github && (
                  <a href={socials.github} target="_blank" rel="noreferrer">
                    GH
                  </a>
                )}
                {socials.facebook && (
                  <a href={socials.facebook} target="_blank" rel="noreferrer">
                    FB
                  </a>
                )}
                {socials.instagram && (
                  <a href={socials.instagram} target="_blank" rel="noreferrer">
                    IG
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
