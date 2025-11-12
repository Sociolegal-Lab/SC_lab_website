import React, { useEffect, useRef, useState } from "react";
import styles from "./Homepage.module.css";
import left_arrow from "../../assets/left_arrow.png";
import right_arrow from "../../assets/right_arrow.png";
import projectIndex from "../../data/projects/projects_index.json"; // ← 檔名陣列
import "../../styles/font.css";

// 轉換專案物件到 UI 需要的欄位
const normalize = (p = {}) => ({
  name: p.name || "",
  bio: p.brief_introduction || p.introduction || "",
  photo: p.photo
    ? new URL(`../../data/projects/${p.photo}`, import.meta.url).href
    : "",
});

export default function ProjectsRoll({
  items: itemsProp,
  interval = 4000,
  pauseAfterInteractMs = 5000,
  className = "",
  loop = true,
}) {
  // ← 用 state 保存真正要渲染的 items
  const [items, setItems] = useState([]);

  // 一次載入所有 project_X.json，並依 index 的順序整理
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      // 1) 載入資料來源：優先用 props.items（若外層傳進來）
      if (itemsProp && itemsProp.length) {
        setItems(itemsProp);
        return;
      }

      // 2) 用 import.meta.glob 掃描資料夾中的所有 json（eager: true 直接同步載入）
      const modules = import.meta.glob("../../data/projects/*.json", {
        eager: true,
      });

      // 3) 依 index 指定的檔名排序 & 取出 default
      const loaded = projectIndex
        .map((filename) => {
          const key = `../../data/projects/${filename}`;
          const mod = modules[key];
          return mod && mod.default ? normalize(mod.default) : null;
        })
        .filter(Boolean);

      if (!cancelled) setItems(loaded);
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [itemsProp]);

  const scrollerRef = useRef(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const autoplayRef = useRef(null);
  const resumeTimerRef = useRef(null);

  // 依中心點判定目前卡片
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      window.requestAnimationFrame(() => {
        const center = el.scrollLeft + el.clientWidth / 2;
        let nearest = 0;
        let minDist = Infinity;
        Array.from(el.children).forEach((child, i) => {
          const c = child.offsetLeft + child.offsetWidth / 2;
          const d = Math.abs(c - center);
          if (d < minDist) {
            minDist = d;
            nearest = i;
          }
        });
        setActive(nearest);
        activeRef.current = nearest;
        ticking = false;
      });
      ticking = true;
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // 拖曳操作
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let scrollStart = 0;

    const onDown = (e) => {
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollStart = el.scrollLeft;
      el.setPointerCapture?.(e.pointerId);
      el.style.cursor = "grabbing";
      pauseAutoplay();
    };

    const onMove = (e) => {
      if (!isDown) return;
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.2;
      el.scrollLeft = scrollStart - walk;
      e.preventDefault();
    };

    const onUp = (e) => {
      isDown = false;
      try {
        el.releasePointerCapture?.(e.pointerId);
      } catch {}
      el.style.cursor = "";
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointerleave", onUp);

    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointerleave", onUp);
    };
  }, []);

  const scrollToIndex = (i) => {
    const el = scrollerRef.current;
    if (!el) return;
    const child = el.children[i];
    if (!child) return;
    el.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
  };

  const go = (dir) => {
    const last = items.length - 1;
    let next = activeRef.current + dir;
    if (loop) {
      if (next < 0) next = last;
      if (next > last) next = 0;
    } else {
      next = Math.max(0, Math.min(last, next));
    }
    scrollToIndex(next);
  };

  const startAutoplay = () => {
    stopAutoplay();
    if (!items.length) return;
    autoplayRef.current = window.setInterval(() => {
      const next = (activeRef.current + 1) % items.length;
      scrollToIndex(next);
    }, interval);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    autoplayRef.current = null;
  };

  const pauseAutoplay = () => {
    stopAutoplay();
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(
      () => startAutoplay(),
      pauseAfterInteractMs
    );
  };

  useEffect(() => {
    startAutoplay();
    return () => {
      stopAutoplay();
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    };
  }, [items.length, interval]);

  return (
    <div className={`${styles["mr-root-projects"]} ${className || ""}`}>
      <br />
      <div className={styles["mr-container"]}>
        {/* 左右箭頭 */}
        <button
          aria-label="上一張"
          className={`${styles["mr-nav"]} ${styles["mr-nav-left"]}`}
          onClick={() => {
            go(-1);
            pauseAutoplay();
          }}
        >
          <img src={left_arrow} alt="" height={50} />
        </button>
        <button
          aria-label="下一張"
          className={`${styles["mr-nav"]} ${styles["mr-nav-right"]}`}
          onClick={() => {
            go(1);
            pauseAutoplay();
          }}
        >
          <img src={right_arrow} alt="" height={50} />
        </button>

        {/* 專案卡片 */}
        <div
          ref={scrollerRef}
          className={`${styles["mr-scroller"]} ${styles["mr-no-scrollbar"]}`}
        >
          {items.map((m, i) => (
            <section key={i} className={styles["mr-section"]}>
              <article className={styles["mr-profile"]}>
                <div className={styles["mr-photo-wrap"]}>
                  {m.photo ? (
                    <img className={styles["mr-photo"]} src={m.photo} alt={m.name} />
                  ) : (
                    <div className={styles["mr-photo"]} />
                  )}
                </div>
                <div className={styles["mr-text"]}>
                  <h2 className={`inter-extrabold ${styles["mr-name"]}`}>{m.name}</h2>
                  <p className={`inter-bold ${styles["mr-bio"]}`}>{m.bio}</p>
                </div>
              </article>
            </section>
          ))}
        </div>

        {/* 點點導航 */}
        <div className={styles["mr-dots"]}>
          {items.map((_, i) => (
            <button
              key={i}
              aria-label={`跳到第 ${i + 1} 張`}
              className={`${styles["mr-dot"]} ${active === i ? styles["is-active"] ?? "" : ""}`}
              onClick={() => {
                scrollToIndex(i);
                pauseAutoplay();
              }}
            />
          ))}
        </div>
        <br />
      </div>
    </div>
  );
}
