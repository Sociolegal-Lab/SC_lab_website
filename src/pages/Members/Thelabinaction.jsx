import React from "react";
import styles from "./Members.module.css"; // ← 正確載入 CSS Modules

export default function Thelabinaction() {
  return (
    <div className={styles["members-section"]}>
      <h2>The Lab In Action</h2>
      <br />
      <div className={styles["members-picture"]}>
        <img
          src="https://pbs.twimg.com/media/GzSnuLdb0AASEjf?format=jpg&name=4096x4096"
          alt="The Lab in Action"
        />
      </div>
    </div>
  );
}
