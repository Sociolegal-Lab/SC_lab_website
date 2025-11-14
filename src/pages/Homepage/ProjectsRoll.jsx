import React, { useEffect, useRef, useState } from "react";
import styles from "./Homepage.module.css";
import left_arrow from "../../assets/left_arrow.png";
import right_arrow from "../../assets/right_arrow.png";
import projectIndex from "../../data/projects/projects_index.json";
import "../../styles/font.css";

/** 🔥 只依 JSON photo 來決定圖片路徑 */
const resolvePhoto = (photo) => {
  if (!photo) return "";

  // 若是 URL 或絕對路徑
  if (photo.startsWith("/") || /^https?:\/\//i.test(photo)) return photo;

  // 其餘視為相對於 data/projects
  try {
    return new URL(`../../data/projects/${photo}`, import.meta.url).href;
  } catch {
    return "";
  }
};

/** 🔥 normalize 僅使用 JSON 的值，不再推測 id 或圖片 */
const normalize = (p = {}) => ({
  id: p.id,
  name: p.name || "",
  bio: p.brief_introduction || p.introduction || "",
  photo: resolvePhoto(p.photo),
});

export default function ProjectsRoll({
  items: itemsProp,
  interval = 4000,
  pauseAfterInteractMs = 5000,
  className = "",
  loop = true,
}) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (itemsProp && itemsProp.length) {
        setItems(itemsProp);
        return;
      }

      const modules = import.meta.glob("../../data/projects/*.json", {
        eager: true,
      });

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
    return () => { cancelled = true; };
  }, [itemsProp]);

  const scrollerRef = useRef(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const autoplayRef = useRef(null);
  const resumeTimerRef = useRef(null);

  // 中心點決定 active
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
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
      el.releasePointerCapture?.(e.pointerId);
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
      startAutoplay,
      pauseAfterInteractMs
    );
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [items.length, interval]);

  return (
    <div className={`${styles["mr-root"]} ${className || ""}`}>
      <div className={styles["mr-container"]}>
        <button
          aria-label="上一張"
          className={`${styles["mr-nav"]} ${styles["mr-nav-left"]}`}
          onClick={() => { go(-1); pauseAutoplay(); }}
        >
          <img src={left_arrow} alt="" />
        </button>
        <button
          aria-label="下一張"
          className={`${styles["mr-nav"]} ${styles["mr-nav-right"]}`}
          onClick={() => { go(1); pauseAutoplay(); }}
        >
          <img src={right_arrow} alt="" />
        </button>

        <div ref={scrollerRef} className={`${styles["mr-scroller"]} ${styles["mr-no-scrollbar"]}`}>
          {items.map((m, i) => (
            <section key={m.id || i} className={styles["mr-section"]}>
              <article className={styles["mr-profile"]}>
                <div className={styles["mr-photo-wrap"]}>
                  {m.photo ? (
                    <img
                      className={styles["mr-photo"]}
                      src={m.photo}
                      alt={m.name}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  ) : (
                    <div className={styles["mr-photo"]} />
                  )}
                </div>
                <div className={styles["mr-text"]}>
                  <h2 className={styles["mr-name"]}>{m.name}</h2>
                  <p className={styles["mr-bio"]}>{m.bio}</p>
                </div>
              </article>
            </section>
          ))}
        </div>

        <div className={styles["mr-dots"]}>
          {items.map((_, i) => (
            <button
              key={i}
              className={`${styles["mr-dot"]} ${active === i ? styles["is-active"] : ""}`}
              onClick={() => { scrollToIndex(i); pauseAutoplay(); }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
