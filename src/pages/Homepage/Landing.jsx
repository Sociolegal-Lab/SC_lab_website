import React from "react";
import styles from "./Homepage.module.css";
import logo from "../../assets/logo_full_white_font.png";
import "../../styles/font.css";

// 從 JSON 讀資料
import landingInfoRaw from "../../data/homepage/landinginfo.json";

/** 簡單保護一下結構，避免陣列不存在爆掉 */
const elements = Array.isArray(landingInfoRaw.elements)
  ? landingInfoRaw.elements
  : [];

const schoolLines = Array.isArray(landingInfoRaw.school)
  ? landingInfoRaw.school
  : [];

export default function Landing() {
  return (
    <section
      className={`${styles["mr-root"]} ${styles["landing"]}`}
      role="banner"
      aria-labelledby="brand"
    >
      <div>
        <img src={logo} className={styles["brand-img"]} alt="Lab Logo" />
      </div>

      <div className={styles["landing__inner"]}>
        {/* 左側：從 JSON 的 elements 產生三行文字 */}
        <div className={styles["landing__left"]}>
          <ul className={`${styles["mini-list"]} inter-bold`}>
            {elements.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        {/* 右側：從 JSON 的 school 陣列產生多行（用 <br /> 分行） */}
        <div className={styles["landing__right"]}>
          <p className="inter-bold">
            {schoolLines.map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                {idx !== schoolLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
