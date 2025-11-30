import React, { useEffect, useRef, useState } from "react";
import styles from "./Homepage.module.css";
import left_arrow from "../../assets/left_arrow.png";
import right_arrow from "../../assets/right_arrow.png";
import membersData from "../../data/members/members.json";
import "../../styles/font.css";

/** 將 members.json 欄位轉成渲染用格式 */
const normalize = (m = {}) => ({
  id: m.id ?? "",
  name: m.English_name || m.Chinese_name || m.title || "",
  bio: m.short_bio || m.research_interests || "",
  photo: m.photo || null,
});

/** 根據 src/data/members 資料夾載入 .jpeg 照片 */
const toSrc = (m) => {
  const p = m.photo;
  if (p) {
    // 若 JSON 內 photo 有值，仍優先用它
    if (p.startsWith("/") || /^https?:\/\//i.test(p)) return p;
    try {
      return new URL(`../../data/members/${p}`, import.meta.url).href;
    } catch {
      return p;
    }
  }
  // 若 photo 為 null，就依 id 對應成 src/data/members/{id}.jpeg
  try {
    return new URL(`../../data/members/${m.id}.jpeg`, import.meta.url).href;
  } catch {
    return "";
  }
};

export default function MembersRoll({
  items: itemsProp,
  interval = 4000,
  pauseAfterInteractMs = 5000,
  className = "",
  loop = true,
}) {
  const raw = (itemsProp && itemsProp.length ? itemsProp : membersData) ?? [];
  const list = Array.isArray(raw)
    ? raw
    : raw.members || raw.data || raw.items || [];
  const items = list.map(normalize);

  const scrollerRef = useRef(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const autoplayRef = useRef(null);
  const resumeTimerRef = useRef(null);

  // 判定目前卡片
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      window.requestAnimationFrame(() => {
        const center = el.scrollLeft + el.clientWidth / 2;
        let nearest = 0,
          minDist = Infinity;
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

  // 拖曳橫向滑動
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let isDown = false,
      startX = 0,
      scrollStart = 0;
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
    
    <div className={`${styles["mr-root"]} ${className || ""}`}>
      <div className={styles["mr-container"]}>
        <div className={`rufina-bold ${styles["section-title"]} `}>Members</div>
        <div className={styles["mr-stage"]}>
          {/* 左箭頭 */}
          <button
            aria-label="上一張"
            className={`${styles["mr-nav"]} ${styles["mr-nav-left"]}`}
            onClick={() => {
              go(-1);
              pauseAutoplay();
            }}
          >
            <div className={styles["arrow-circle-left"]}></div>
          </button>

          {/* 成員區塊（中間可橫向捲動） */}
          <div
            ref={scrollerRef}
            className={`${styles["mr-scroller"]} ${styles["mr-no-scrollbar"]}`}
          >
            {items.length === 0 ? (
              <div style={{ color: "#fff", padding: 16 }}>
                （沒有找到成員資料，請檢查 members.json 結構或圖片路徑）
              </div>
            ) : (
              items.map((m, i) => (
                <section key={m.id || i} className={styles["mr-section"]}>
                  <article className={styles["mr-profile"]}>
                    {/* 照片 */}
                    <div className={styles["mr-photo-wrap"]}>
                      {toSrc(m) ? (
                        <img
                          className={styles["mr-photo"]}
                          src={toSrc(m)}
                          alt={m.name || `member-${i}`}
                          onError={(e) =>
                            (e.currentTarget.style.display = "none")
                          }
                        />
                      ) : (
                        <div className={styles["mr-photo"]} />
                      )}
                    </div>

                    {/* 文字 */}
                    <div className={styles["mr-text"]}>
                      <p className={styles["mr-name"]}>
                        {m.name || "Unnamed Member"}
                      </p>
                      <div className={styles["scroll-box"]} tabIndex={0}>
                        <p className={`inter-medium ${styles["mr-bio"]}`}>
                          {m.bio || "—"}
                        </p>
                      </div>
                    </div>
                  </article>
                </section>
              ))
            )}
          </div>

          {/* 右箭頭 */}
          <button
            aria-label="下一張"
            className={`${styles["mr-nav"]} ${styles["mr-nav-right"]}`}
            onClick={() => {
              go(1);
              pauseAutoplay();
            }}
          >
            <div className={styles["arrow-circle-right"]}></div>
          </button>
        </div>

        {/* 點點導航 */}
        <div className={styles["mr-dots"]}>
          {items.map((_, i) => (
            <button
              key={i}
              aria-label={`跳到第 ${i + 1} 張`}
              className={`${styles["mr-dot"]} ${
                active === i ? styles["is-active"] : ""
              }`}
              onClick={() => {
                scrollToIndex(i);
                pauseAutoplay();
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
