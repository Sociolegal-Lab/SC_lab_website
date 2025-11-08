import React from "react";
import styles from "./Homepage.module.css"; // ✅ 修正命名統一為 styles
import logo from "../../assets/logo_full_white_font.png";

export default function Landing() {
  return (
    <section
      className={styles["landing"]}
      role="banner"
      aria-labelledby="brand"
    >
      <div>
        <img
          src={logo}
          className={styles["brand-img"]}
          alt="Lab Logo"
        />
      </div>

      <div className={styles["landing__inner"]}>
        {/* 左側：三行小字 */}
        <div className={styles["landing__left"]}>
          <ul className={styles["mini-list"]}>
            <li>Data</li>
            <li>Law</li>
            <li>Society</li>
          </ul>
        </div>

        {/* 右側：學校資訊 */}
        <div className={styles["landing__right"]}>
          <p>
            National Cheng Kung University
            <br />
            Min Wu School of Computing
          </p>
        </div>
      </div>
    </section>
  );
}
