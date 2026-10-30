import React, { useState, useEffect } from "react";
import styles from "./Members.module.css";

// 讀 JSON
import jsonData from "../../data/carousel/thelabinaction.json";

// 使用 Vite 的 import.meta.glob 讀取整個資料夾的圖片
const imageModules = import.meta.glob("../../data/carousel/*", { eager: true });

export default function Thelabinaction() {
  const [activeIndex, setActiveIndex] = useState(0);

  // 建立 JSON 檔名對應到實際匯入的圖片 URL。
  // photo 可能是純檔名（1.jpg）或內容管理後台寫入的帶路徑格式（/carousel/1.jpg），
  // 因此只取檔名來比對；比對時在檔名前加上 "/"，避免 1.jpg 誤配到 11.jpg。
  const images = jsonData
    .map((item) => {
      const filename = String(item?.photo ?? "").split("/").pop();
      if (!filename) return null;
      const key = Object.keys(imageModules).find((path) =>
        path.endsWith(`/${filename}`)
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
