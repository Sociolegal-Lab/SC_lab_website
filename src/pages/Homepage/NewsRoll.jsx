import React, { useEffect, useRef, useState } from "react";
import styles from "./Homepage.module.css";
import left_arrow from "../../assets/left_arrow.png";
import right_arrow from "../../assets/right_arrow.png";
import rawNews from "../../data/news/news.json";
import "../../styles/font.css";

export default function NewsRoll({
  items: itemsProp,
  interval = 5000,
  pauseAfterInteractMs = 5000,
  className = "",
  loop = true,
  maxChars = 250,
  hideBefore = null,
}) {
  const normalize = (it) => ({
    title: it.title ?? it.headline ?? it.name ?? "",
    subtitle: it.subtitle ?? it.content ?? it.bio ?? "",
    date: it.date ?? "",
  });

  const ts = (d) => {
    if (!d) return -Infinity;
    const t = Date.parse(d);
    return Number.isNaN(t) ? -Infinity : t;
  };

  const clamp = (s, n) => (n > 0 && s && s.length > n ? s.slice(0, n) + "…" : s);

  let items = (itemsProp?.length ? itemsProp : rawNews).map(normalize);
  if (hideBefore) {
    const cutoff = ts(hideBefore);
    items = items.filter((x) => ts(x.date) >= cutoff);
  }
  items.sort((a, b) => ts(b.date) - ts(a.date));
  if (maxChars > 0) {
    items = items.map((x) => ({ ...x, subtitle: clamp(x.subtitle, maxChars) }));
  }

  const scrollerRef = useRef(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const autoplayRef = useRef(null);
  const resumeTimerRef = useRef(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      window.requestAnimationFrame(() => {
        const center = el.scrollLeft + el.clientWidth / 2;
        let nearest = 0, minDist = Infinity;
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

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let isDown = false, startX = 0, scrollStart = 0;
    const onDown = (e) => {
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollStart = el.scrollLeft;
      el.setPointerCapture?.(e.pointerId);
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
    if (!items?.length) return;
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
    resumeTimerRef.current = window.setTimeout(() => startAutoplay(), pauseAfterInteractMs);
  };

  useEffect(() => {
    startAutoplay();
    return () => {
      stopAutoplay();
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length, interval]);

  return (
    <div className={styles["events-container"]}>
        {/* 主標題 → Inter 800 */}
        <h1 className={`rufina-bold ${styles["title"]}`}>Latest News</h1>

      <div className={styles["mr-stage-wrap"]}>
        <div className={styles["mr-stage"]}>
          <button
            aria-label="上一張"
            className={`${styles["mr-nav"]} ${styles["mr-nav-left"]}`}
            onClick={() => {
              go(-1);
              pauseAutoplay();
            }}
          >
            <div className={styles["arrow-circle-left-gold"]}></div>
          </button>


          <div ref={scrollerRef} className={`${styles["mr-scroller"]} ${styles["mr-no-scrollbar"]}`}>
            {items.map((m, i) => (
              <section key={i} className={styles["mr-section"]}>
                <article className={styles["mr-card"]} role="article" aria-roledescription="news item">
                  {/* 卡片標題 → Inter 800 */}
                  <h3 className={`inter-bold ${styles["mr-card-title"]}`}>{m.title}</h3>
                  {/* 內文 → Inter 700 */}
                  <p className={`inter-medium ${styles["mr-card-subtitle"]}`}>{m.subtitle}</p>
                  {/* 日期 → Inter 500（若你偏好 700 也可改成 inter-bold） */}
                  {m.date ? <div className={`roboto-condensed-medium ${styles["mr-card-date"]}`}>{m.date}</div> : null}
                </article>
              </section>
            ))}
          </div>

          <button
              aria-label="下一張"
              className={`${styles["mr-nav"]} ${styles["mr-nav-right"]}`}                  onClick={() => {
                go(1);
                pauseAutoplay();
              }}
          >
            <div className={styles["arrow-circle-right-gold"]}></div>
          </button>
        </div>

        <div className={styles["mr-dots"]} aria-hidden="true">
          {items.map((_, i) => (
            <button
              key={i}
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
