import React from "react";
import styles from "./Homepage.module.css";
import logo from "../../assets/logo_full_white_font.png";
import "../../styles/font.css";

export default function Landing() {
  return (
    <section className={styles["landing"]} role="banner" aria-labelledby="brand">
      <div>
        <img src={logo} className={styles["brand-img"]} alt="Lab Logo" />
      </div>

      <div className={styles["landing__inner"]}>
        {/* 左側：三行小字 → 保持 IBM Plex Mono 700 */}
        <div className={styles["landing__left"]}>
          <ul className={`${styles["mini-list"]} ibm-plex-mono-bold`}>
            <li>Data</li>
            <li>Law</li>
            <li>Society</li>
          </ul>
        </div>

        {/* 右側：學校資訊 → 你原本就用 inter-bold，維持不變 */}
        <div className={styles["landing__right"]}>
          <p className="inter-bold">
            National Cheng Kung University
            <br />
            Min Wu School of Computing
          </p>
        </div>
      </div>
    </section>
  );
}
