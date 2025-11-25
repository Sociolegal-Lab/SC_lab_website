import React from "react";
import styles from "./Members.module.css";
import membersData from "../../data/members/formermembers.json";

export default function Members() {
  return (
    <section className={styles["members-section"]}>
      <div className={styles["subtitle"]}>FORMER MEMBERS</div>
      <div className={styles["member-grid"]}>
        {membersData.map((member, index) => {
          const bio = Array.isArray(member.bio) ? member.bio : [];
          const socials = member.socials ?? {};
          return (
            <div className={styles["member-card"]} key={member.id ?? index}>
              <div className={styles["member-avatar"]} aria-hidden="true" />
              <div className={styles["member-name"]}>{member.English_name}</div>
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
