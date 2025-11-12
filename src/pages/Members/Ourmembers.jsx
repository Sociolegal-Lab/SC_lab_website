import React from "react";
import styles from "./Members.module.css"; // ← 用物件匯入
import membersData from "./Ourmembers.json";

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
          return (
            <div className={styles["member-card"]} key={member.id ?? index}>
              <div className={styles["member-avatar"]} aria-hidden="true" />
              <div className={styles["member-name"]}>{member.name}</div>
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
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
