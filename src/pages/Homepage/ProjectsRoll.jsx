import React, { useEffect, useRef, useState } from "react";
import styles from "./Homepage.module.css";
import left_arrow from "../../assets/left_arrow.png";
import right_arrow from "../../assets/right_arrow.png";
import projectData from "../../data/projects/projects_index.json";

export default function ProjectsRoll({
  items: itemsProp,
  interval = 4000,
  pauseAfterInteractMs = 5000,
  className = "",
  loop = true,
}) {
  // 資料來源：props 優先，否則使用 JSON
  const items = (itemsProp && itemsProp.length ? itemsProp : projectData) || [];

  const scrollerRef = useRef(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const autoplayRef = useRef(null);
  const resumeTimerRef = useRef(null);

  // 依中心計算目前卡片
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
          if (d < minDist) { minDist = d; nearest = i; }
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

  // 拖曳
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
      try { el.releasePointerCapture?.(e.pointerId); } catch {}
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
        {/* 左右圓形箭頭 */}
        <button
          aria-label="上一張"
          className={`${styles["mr-nav"]} ${styles["mr-nav-left"]}`}
          onClick={() => { go(-1); pauseAutoplay(); }}
        >
          <img src={left_arrow} alt="" height={50} />
        </button>
        <button
          aria-label="下一張"
          className={`${styles["mr-nav"]} ${styles["mr-nav-right"]}`}
          onClick={() => { go(1); pauseAutoplay(); }}
        >
          <img src={right_arrow} alt="" height={50} />
        </button>

        {/* 橫向滑動區（每頁 1 張） */}
        <div
          ref={scrollerRef}
          className={`${styles["mr-scroller"]} ${styles["mr-no-scrollbar"]}`}
        >
          {items.map((m, i) => (
            <section key={i} className={styles["mr-section"]}>
              <article className={styles["mr-profile"]}>
                {/* 左：大圖（或灰色方塊） */}
                <div className={styles["mr-photo-wrap"]}>
                  {m.photo ? (
                    <img className={styles["mr-photo"]} src={m.photo} alt={m.name} />
                  ) : (
                    <div className={styles["mr-photo"]} />
                  )}
                </div>
                {/* 右：標題＋內文 */}
                <div className={styles["mr-text"]}>
                  <h2 className={styles["mr-name"]}>{m.name}</h2>
                  <p className={styles["mr-bio"]}>{m.bio}</p>
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
              onClick={() => { scrollToIndex(i); pauseAutoplay(); }}
            />
          ))}
        </div>
        <br />
      </div>
    </div>
  );
}
