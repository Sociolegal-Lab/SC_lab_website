import React from "react";
import styles from "./Leader.module.css"; 
import avatar from "../../data/members/Leaderprofile.PNG";/*更換老師頭貼請更改此處連結*/ 

export default function Leaderarea() {
  return (
    <div className={styles["profile-wrap"]}>
      <div className={styles["profile-card"]}>
        <div className={styles["avatar-col"]}>
          <div
            className={styles["avatar"]}
            style={{
              backgroundImage: `url(${avatar})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            aria-label="avatar"
          />

          {/* Contact block */}
          <div className={styles["contact"]}>
            <div className={styles["contact-item"]}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                   xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path
                  d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.8 19.8 0 012.08 4.2 2 2 0 014.06 2h3a2 2 0 012 1.72c.12.9.33 1.78.63 2.62a2 2 0 01-.45 2.11l-1.27 1.27a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.84.3 1.72.51 2.62.63A2 2 0 0122 16.92z"
                  fill="currentColor"
                />
              </svg>
              <div className="roboto-condensed-bold">
                <span>+886 2757575&nbsp;#80980</span>
              </div>
            </div>

            <div className={styles["contact-item"]}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                   xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path
                  d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm16 3.2l-7.1 5.32a2 2 0 01-1.8 0L4 7.2V6l8 6 8-6v1.2z"
                  fill="currentColor"
                />
              </svg>
              <div className="roboto-condensed-bold">
                <a href="mailto:shaomanlee@gs.ncku.edu.tw">
                    shaomanlee@gs.ncku.edu.tw
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Details */}
        <div className={styles["info-col"]}>
          <h1 className={`rufina-bold ${styles["name"]}`}>Shao-Man Lee</h1>
          <p className={styles["subtitle"]}>
            AI and Law;
            Legal Natural Language Processing;
            Empirical Legal Studies;
            AI Governance; Constitutional Law
          </p>
          <p className={styles["affil"]}>
            NCKU Miin Wu School of Computing Assistant Professor
          </p>

          <blockquote className={`inter-bold ${styles["motto"]}`}>
            Shao-Man Lee is Assistant Professor at the Miin Wu School of Computing at National Cheng Kung University (NCKU), with a joint appointment in the Department of Psychology. Shao-Man’s research focuses on developing culturally fair legal AI systems, computational approaches to legal analysis, and governance frameworks for responsible AI development. Shao-Man serves as Executive Secretary of the International Society of Public Law Taiwan Chapter and as an advisor to the Taiwan Bar Association’s AI Development and Response Committee. She recently led the Ministry of Justice’s Prosecutorial AI Assistance System project. Shao-Man graduated from National Taiwan University College of Law and obtained her LL.M. from Yale Law School and her J.S.D. from the University of California, Berkeley.
          </blockquote>
        </div>
      </div>
    </div>
  );
}

