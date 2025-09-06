import React, { useEffect, useMemo, useRef, useState } from "react";
import "./MembersRoll.css";

export default function MembersRoll({
  items: itemsProp,
  interval = 1000,
  //切換間隔秒數
  pauseAfterInteractMs = 5000,
  //互動後的暫停時間秒數
  className="",
  loop = true,
}) {
  const defaultItems = useMemo(
    () => [
      { title: "專案一", desc: "支援滑動與拖曳", variant: "indigo-blue" },
      { title: "專案二", desc: "自動播放功能", variant: "fuchsia-rose" },
      { title: "專案三", desc: "Scroll Snap 對齊", variant: "emerald-lime" },
      { title: "專案四", desc: "點點導航", variant: "amber-orange" },
      { title: "專案五", desc: "易於客製化", variant: "sky-cyan" },
    ],
    []
  );

  const items = itemsProp && itemsProp.length ? itemsProp : defaultItems;

  const scrollerRef = useRef(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0); // 供 setInterval 使用，避免閉包舊值
  const autoplayRef = useRef(null);
  const resumeTimerRef = useRef(null);

  // 依中心點計算最近卡片，更新 active
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
    onScroll(); // 初始化
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Pointer 拖曳（滑鼠/觸控）
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
      el.classList.add("mr-cursor-grabbing");
      pauseAutoplay();
    };

    const onMove = (e) => {
      if (!isDown) return;
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.2; // 拖曳靈敏度
      el.scrollLeft = scrollStart - walk;
      e.preventDefault();
    };

    const onUp = (e) => {
      isDown = false;
      try {
        el.releasePointerCapture?.(e.pointerId);
      } catch {}
      el.classList.remove("mr-cursor-grabbing");
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

  // Helpers
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
    <div className={`mr-root ${className}`}>
      <header className="mr-header">
        <h1 className="mr-title">左右滑動區塊</h1>
        <p className="mr-subtitle">支援觸控滑動、滑鼠拖曳、按鈕、點點導航與自動播放。</p>
      </header>

      <div className="mr-container">
        <button
          aria-label="上一張"
          className="mr-btn mr-btn-prev"
          onClick={() => {
            go(-1);
            pauseAutoplay();
          }}
        >
          ◀
        </button>
        <button
          aria-label="下一張"
          className="mr-btn mr-btn-next"
          onClick={() => {
            go(1);
            pauseAutoplay();
          }}
        >
          ▶
        </button>

        <div ref={scrollerRef} className="mr-scroller mr-no-scrollbar">
          {items.map((it, i) => (
            <section key={i} className="mr-section">
              <div className={`mr-card mr-gradient-${it.variant || "indigo-blue"}`}>
                <div className="mr-card-content">
                  <h3 className="mr-card-title">{it.title}</h3>
                  <p className="mr-card-desc">{it.desc}</p>
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="mr-dots">
          {items.map((_, i) => (
            <button
              key={i}
              aria-label={`跳到第 ${i + 1} 張`}
              className={`mr-dot ${active === i ? "is-active" : ""}`}
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
