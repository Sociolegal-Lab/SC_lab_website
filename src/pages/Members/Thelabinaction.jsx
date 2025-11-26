import React, { useState, useEffect } from "react";
import styles from "./Members.module.css";

// 讀 JSON
import jsonData from "../../data/carousel/thelabinaction.json";

// 使用 Vite 的 import.meta.glob 讀取整個資料夾的圖片
const imageModules = import.meta.glob("../../data/carousel/*", { eager: true });

export default function Thelabinaction() {
  const [activeIndex, setActiveIndex] = useState(0);

  // 建立 JSON 檔名對應到實際匯入的圖片 URL
  const images = jsonData
    .map((item) => {
      const key = Object.keys(imageModules).find((path) =>
        path.endsWith(item.photo)
      );
      return key ? imageModules[key].default : null;
    })
    .filter(Boolean); // 避免 null

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`rufina-bold ${styles["thelabinaction"]}`}>
      <h2>The Lab In Action</h2>
      <br />
      <img
        src={images[activeIndex]}
        alt="The Lab in Action"
        className={styles["members-picture"]}
      />
    </div>
  );
}
