import React from "react";
import styles from "./Homepage.module.css";
import "../../styles/font.css";

export default function AboutUs() {
  return (
    <section className={styles["mr-about"]}>
      <div className={styles["mr-about__inner"]}>
        {/* 標題原本在 CSS 設 700，可加 inter-bold 交由 font.css 控制（可選） */}
        <h2 className={`inter-bold ${styles["mr-about__title"]}`}>About Us</h2>

        <div className={styles["mr-about__grid"]}>
          {/* DATA */}
          <div className={styles["mr-about__item"]}>
            <img src="/images/circle.png" alt="circle" className={styles["mr-shape-img"]} />
            <div className={`inter-extrabold ${styles["mr-about__label"]}`}>DATA</div>
            <div className={`inter-bold ${styles["mr-about__lines"]}`}>
              <div>50465406845</div>
              <div>05306543032</div>
              <div>053022000</div>
              <div>000</div>
            </div>
          </div>

          {/* LAW */}
          <div className={styles["mr-about__item"]}>
            <img src="/images/triangle.png" alt="triangle" className={styles["mr-shape-img"]} />
            <div className={`inter-extrabold ${styles["mr-about__label"]}`}>LAW</div>
            <div className={`inter-bold ${styles["mr-about__lines"]}`}>
              <div>50465406845</div>
              <div>05306543032</div>
              <div>053022000</div>
              <div>000</div>
            </div>
          </div>

          {/* SOCIETY */}
          <div className={styles["mr-about__item"]}>
            <img src="/images/star.png" alt="star" className={styles["mr-shape-img"]} />
            <div className={`inter-extrabold ${styles["mr-about__label"]}`}>SOCIETY</div>
            <div className={`inter-bold ${styles["mr-about__lines"]}`}>
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
