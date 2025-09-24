import React, { useEffect, useRef, useState } from "react";
import "./Homepage.css";
import left_arrow from "../../assets/left_arrow.png";
import right_arrow from "../../assets/right_arrow.png";
import rawNews from "../../data/news/news.json"; // ← 直接用你貼的 JSON

export default function NewsRoll({
  items: itemsProp,
  interval = 5000,
  pauseAfterInteractMs = 5000,
  className = "",
  loop = true,
  maxChars = 250,            // ← 可調：subtitle 最多顯示幾個字（0 表示不截斷）
  hideBefore = null,         // ← 可選：只顯示此日期(YYYY-MM-DD)之後的新聞，例如 "2022-01-01"
}) {
  // 將不同來源的欄位對齊為 {title, subtitle, date}
  const normalize = (it) => ({
    title: it.title ?? it.headline ?? it.name ?? "",
    subtitle: it.subtitle ?? it.content ?? it.bio ?? "",
    date: it.date ?? "",
  });

  // 安全地把 date 轉成可比較的數值（無日期放 -Infinity）
  const ts = (d) => {
    if (!d) return -Infinity;
    const t = Date.parse(d);
    return Number.isNaN(t) ? -Infinity : t;
  };

  // 可選：截斷長文字
  const clamp = (s, n) => (n > 0 && s && s.length > n ? s.slice(0, n) + "…" : s);

  // 來源：props 優先，否則用 JSON
  let items = (itemsProp?.length ? itemsProp : rawNews)
    .map(normalize);

  // 可選：過濾舊新聞
  if (hideBefore) {
    const cutoff = ts(hideBefore);
    items = items.filter((x) => ts(x.date) >= cutoff);
  }

  // 依日期新→舊排序（無日期的排後面）
  items.sort((a, b) => ts(b.date) - ts(a.date));

  // 可選：截斷內容避免超長
  if (maxChars > 0) {
    items = items.map((x) => ({ ...x, subtitle: clamp(x.subtitle, maxChars) }));
  }

  const scrollerRef = useRef(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const autoplayRef = useRef(null);
  const resumeTimerRef = useRef(null);

  // 依中心位置判斷目前卡片
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

  // 拖曳滑動
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

  // 輔助
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length, interval]);

  return (
    <div className={`mr-root ${className}`}>
      <br />
      <div className="mr-title">
        <h1 className="news-title">Latest News from our Lab</h1>
      </div>

      <div className="mr-stage-wrap">
        <div className="mr-stage">
          <button
            aria-label="Previous"
            className="mr-nav mr-nav-left"
            onClick={() => { go(-1); pauseAutoplay(); }}
          >
            <img src={left_arrow} alt="" />
          </button>

          <div ref={scrollerRef} className="mr-scroller mr-no-scrollbar">
            {items.map((m, i) => (
              <section key={i} className="mr-section">
                <article className="mr-card" role="article" aria-roledescription="news item">
                  <h3 className="mr-card-title">{m.title}</h3>
                  <p className="mr-card-subtitle">{m.subtitle}</p>
                  {m.date ? <div className="mr-card-date">{m.date}</div> : null}
                </article>
              </section>
            ))}
          </div>

          <button
            aria-label="Next"
            className="mr-nav mr-nav-right"
            onClick={() => { go(1); pauseAutoplay(); }}
          >
            <img src={right_arrow} alt="" />
          </button>
        </div>

        <div className="mr-dots" aria-hidden="true">
          {items.map((_, i) => (
            <button
              key={i}
              className={`mr-dot ${active === i ? "is-active" : ""}`}
              onClick={() => { scrollToIndex(i); pauseAutoplay(); }}
            />
          ))}
        </div>
        <br />
      </div>
    </div>
  );
}
