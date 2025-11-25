import React from "react";
import styles from "./Members.module.css"; // ← 用物件匯入
import membersData from "../../data/members/members.json";

/** 跟 MembersRoll 一樣的抓圖片邏輯 */
const toSrc = (m = {}) => {
  const p = m.photo;
  if (p) {
    // 若 JSON 內 photo 有值，優先用它
    if (p.startsWith("/") || /^https?:\/\//i.test(p)) return p;
    try {
      return new URL(`../../data/members/${p}`, import.meta.url).href;
    } catch {
      return p;
    }
  }
  // 若 photo 為 null，就依 id 對應成 src/data/members/{id}.jpeg
  try {
    return new URL(`../../data/members/${m.id}.jpeg`, import.meta.url).href;
  } catch {
    return "";
  }
};

export default function Members() {
  return (
    <section className={styles["members-section"]}>
      <p className="rufina-bold">
        <h2>OUR MEMBERS</h2>
      </p>
      <div className={styles["subtitle"]}>LAB TEAM</div>
      <div className={styles["member-grid"]}>
        {membersData.map((member, index) => {
          const bio = Array.isArray(member.bio) ? member.bio : [];
          const socials = member.socials ?? {};
          const imgSrc = toSrc(member);

          return (
            <div className={styles["member-card"]} key={member.id ?? index}>
              {/* 頭像區：套用 MembersRoll 的圖片載入方式 */}
              <div className={styles["member-avatar"]} aria-hidden="true">
                {imgSrc && (
                  <img
                    src={imgSrc}
                    alt={
                      member.English_name ||
                      member.Chinese_name ||
                      member.title ||
                      `member-${index}`
                    }
                    className={styles["member-avatar-img"]} // 可選，用來在 CSS 控制尺寸
                    onError={(e) => {
                      // 如果圖片載入失敗，就把它隱藏起來，保留版面
                      e.currentTarget.style.display = "none";
                    }}
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
                {/*若是新增社群網頁類別，請同時於此更新 */}
                {socials.linkedin && (
                  <a
                    href={socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    in
                  </a>
                )}
                {socials.github && (
                  <a
                    href={socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    GH
                  </a>
                )}
                {socials.facebook && (
                  <a
                    href={socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    FB
                  </a>
                )}
                {socials.instagram && (
                  <a
                    href={socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
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
