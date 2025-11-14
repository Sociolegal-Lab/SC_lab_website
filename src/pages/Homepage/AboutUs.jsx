import React from "react";
import styles from "./Homepage.module.css";
import "../../styles/font.css";
import dataImg from "../../data/homepage/DATA.png";
import lawImg from "../../data/homepage/LAW.png";
import societyImg from "../../data/homepage/SOCIETY.png";

export default function AboutUs() {
  return (
    <section className={`${styles["mr-about"]} ${styles["mr-root"]}`} aria-labelledby="about-us-title">
      <div className={styles["mr-about__inner"]}>
        <h2 className={`inter-bold ${styles["mr-about__title"]}`}>About Us</h2>

        <div className={styles["mr-about__grid"]}>
          <div className={styles["mr-about__item"]}>
            <img src={dataImg} alt="DATA" className={styles["mr-shape-img"]} />
            <div className={`inter-extrabold ${styles["mr-about__label"]}`}>DATA</div>
            <div className={`inter-bold ${styles["mr-about__lines"]}`}>
            </div>
          </div>

          <div className={styles["mr-about__item"]}>
            <img src={lawImg} alt="LAW" className={styles["mr-shape-img"]} />
            <div className={`inter-extrabold ${styles["mr-about__label"]}`}>LAW</div>
            <div className={`inter-bold ${styles["mr-about__lines"]}`}>
            </div>
          </div>
          
          <div className={styles["mr-about__item"]}>
            <img src={societyImg} alt="SOCIETY" className={styles["mr-shape-img"]} />
            <div className={`inter-extrabold ${styles["mr-about__label"]}`}>SOCIETY</div>
            <div className={`inter-bold ${styles["mr-about__lines"]}`}>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
