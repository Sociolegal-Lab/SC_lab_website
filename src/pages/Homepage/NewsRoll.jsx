import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Homepage.css";
import left_arrow from "../../assets/left_arrow.png";
import right_arrow from "../../assets/right_arrow.png";

export default function NewsRoll({
  items: itemsProp,
  interval = 5000,
  pauseAfterInteractMs = 5000,
  className = "",
  loop = true,
}) {
  // 預設資料（可被 props 覆寫）
  const defaultItems = useMemo(
    () => [
      {
        title: "Undergrad and High School Poster Session",
        subtitle:
          "Hiring 4 postdocs — organismal biophysics, soft robotics, frugal Raman diagnostics, or your own bold idea",
        date: "July 23, 2025",
      },
      {
        title: "Call for Undergraduate Researchers",
        subtitle:
          "Hands-on projects in soft robotics and diagnostics. Prior experience is a plus, curiosity is a must.",
        date: "June 2, 2025",
      },
    ],
    []
  );

  const items = (itemsProp?.length ? itemsProp : defaultItems).map((it) => ({
    title: it.title ?? it.name ?? "",
    subtitle: it.subtitle ?? it.bio ?? "",
    date: it.date ?? "",
  }));

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
    <div className={`mr-root ${className}`}>
      {/* 標題獨立 div */}
      <div className="mr-title">
        <h1 className="news-title">Latest News from our Lab</h1>
      </div>

      {/* 箭頭＋框框（卡片）為另一個 div，內部垂直置中 */}
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

        {/* 指示點（需要時可顯示） */}
        <div className="mr-dots" aria-hidden="true">
          {items.map((_, i) => (
            <button
              key={i}
              className={`mr-dot ${active === i ? "is-active" : ""}`}
              onClick={() => { scrollToIndex(i); pauseAutoplay(); }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
