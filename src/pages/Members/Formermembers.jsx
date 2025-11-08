import React from "react";
import styles from "./Members.module.css";
import membersData from "./Formermembers.json";

export default function Members() {
  return (
    <section className={styles["members-section"]}>
      <div className={styles["subtitle"]}>FORMER MEMBERS</div>

      <div className={styles["member-grid"]}>
        {membersData.map((member, index) => (
          <div className={styles["member-card"]} key={index}>
            <div className={styles["member-avatar"]}></div>
            <div className={styles["member-name"]}>{member.name}</div>
            <div className={styles["member-title"]}>{member.title}</div>

            <ul className={styles["member-bio"]}>
              {member.bio.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>

            <span className={styles["member-email"]}>{member.email}</span>

            <div className={styles["socials"]}>
              {member.socials.linkedin && (
                <a
                  href={member.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  in
                </a>
              )}
              {member.socials.github && (
                <a
                  href={member.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  GH
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
