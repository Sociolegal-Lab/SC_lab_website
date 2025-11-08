import React from "react";
import styles from "./Homepage.module.css"; // ✅ 正確導入 CSS Modules

export default function AboutUs() {
  return (
    <section className={styles["mr-about"]}>
      <div className={styles["mr-about__inner"]}>
        <h2 className={styles["mr-about__title"]}>About Us</h2>

        <div className={styles["mr-about__grid"]}>
          {/* DATA */}
          <div className={styles["mr-about__item"]}>
            <img
              src="/images/circle.png"
              alt="circle"
              className={styles["mr-shape-img"]}
            />
            <div className={styles["mr-about__label"]}>DATA</div>
            <div className={styles["mr-about__lines"]}>
              <div>50465406845</div>
              <div>05306543032</div>
              <div>053022000</div>
              <div>000</div>
            </div>
          </div>

          {/* LAW */}
          <div className={styles["mr-about__item"]}>
            <img
              src="/images/triangle.png"
              alt="triangle"
              className={styles["mr-shape-img"]}
            />
            <div className={styles["mr-about__label"]}>LAW</div>
            <div className={styles["mr-about__lines"]}>
              <div>50465406845</div>
              <div>05306543032</div>
              <div>053022000</div>
              <div>000</div>
            </div>
          </div>

          {/* SOCIETY */}
          <div className={styles["mr-about__item"]}>
            <img
              src="/images/star.png"
              alt="star"
              className={styles["mr-shape-img"]}
            />
            <div className={styles["mr-about__label"]}>SOCIETY</div>
            <div className={styles["mr-about__lines"]}>
              <div>50465406845</div>
              <div>05306543032</div>
              <div>053022000</div>
              <div>000</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
