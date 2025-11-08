import React from "react";
import styles from "./Leader.module.css"; // ✅ 正確導入

export default function Schedule() {
  return (
    <div>
      <p className={styles["schedule"]}>Schedule</p>
      <p className={styles["schedule"]}></p>
      <p className={styles["schedule"]}></p>
      <p className={styles["schedule"]}></p>
      <p className={styles["schedule"]}></p>
    </div>
  );
}
