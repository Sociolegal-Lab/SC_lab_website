import React from "react";
import styles from "./Homepage.module.css";
import "../../styles/font.css";
import landingInfo from "../../data/homepage/landinginfo.json";

// 三張圖改由 landinginfo.json 的 about_us 決定檔名，才能從內容管理後台更換。
// 欄位值可能是純檔名（DATA.png）或後台寫入的帶路徑格式（/homepage/DATA.png），
// 因此只取檔名來比對。
const images = import.meta.glob("../../data/homepage/*.{png,jpg,jpeg,gif,webp}", {
  eager: true,
  as: "url",
});

const resolveImage = (value) => {
  const filename = String(value ?? "").split("/").pop();
  if (!filename) return "";
  const key = Object.keys(images).find((path) => path.endsWith(`/${filename}`));
  return key ? images[key] : "";
};

const aboutUs = landingInfo.about_us ?? {};
const dataImg = resolveImage(aboutUs.data_image);
const lawImg = resolveImage(aboutUs.law_image);
const societyImg = resolveImage(aboutUs.society_image);

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
