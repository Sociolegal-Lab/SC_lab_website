import React from "react";
import styles from "./Members.module.css"; // ← 用物件匯入
import membersData from "../../data/members/members.json";
import getMemberPhotoUrl from "../../utils/getMemberPhotoUrl";

/** 現任成員＝status 不是 "former" 的人（沒填 status 的舊資料視為現任） */
const currentMembers = membersData.filter((m) => m?.status !== "former");

export default function Members() {
  return (
    <section className={styles["members-section"]}>
      <p className="rufina-bold">
        <h2>Our Members</h2>
      </p>
      <div className={styles["subtitle"]}>CURRENT MEMBERS</div>
      <div className={styles["member-grid"]}>
        {currentMembers.map((member, index) => {
          const bio = Array.isArray(member.bio) ? member.bio : [];
          const socials = member.socials ?? {};
          const imgSrc = getMemberPhotoUrl(member.photo);

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
