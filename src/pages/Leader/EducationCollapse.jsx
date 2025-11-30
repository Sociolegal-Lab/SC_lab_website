import React from "react";
import styles from "./Leader.module.css";
import educationData from "../../data/leader/leader.json";

export default function EducationCollapse() {
  return (
    <div className={styles["collapse-wrap"]}>
      <details className={styles["collapse"]}>
        <summary className={styles["collapse-sum"]}>
          <span className={styles["collapse-title"]}>Education</span>
          <span className={styles["collapse-plus"]} aria-hidden="true" />
        </summary>

        <div className={styles["collapse-body"]}>
          {educationData.Education.map((edu, index) => (
            <div key={index} className={styles["collapse-section"]}>
              <p className={styles["collapse-text-title"]}>{edu.degree}</p>
              <p className={styles["collapse-text"]}>
                {edu.institution} 
              </p>
              {edu.description && (
                <p className={styles["collapse-text"]}>{edu.description}</p>
              )}
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
