import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Homepage.css";
import left_arrow from "../../assets/left_arrow.png";
import right_arrow from "../../assets/right_arrow.png";

export default function ProjectsRoll({
  items: itemsProp,
  interval = 4000,
  pauseAfterInteractMs = 5000,
  className = "",
  loop = true,
}) {

  const defaultItems = useMemo(
    () => [
      { name: "001", bio: "A first-year student at NCKU Miin Wu School of Computing, specializing in the integration of large language models (LLMs) with system and cloud architecture. Focused on developing scalable, efficient AI-driven solutions that bridge cutting-edge technology with practical applications.", photo: "/src/assets/shaoman.jpg" },
      { name: "002", bio: "Second-year undergraduate focusing on computer vision and deep learning. Interested in applying AI to healthcare and medical imaging.", photo: "/src/assets/yiting.jpg" },
      { name: "003", bio: "Graduate student in information engineering, researching distributed systems and scalable cloud infrastructures. Enthusiastic about open-source contributions.", photo: "/src/assets/kaihsian.jpg" },
      { name: "004", bio: "Specializes in human-computer interaction (HCI) and UX design. Passionate about bridging the gap between AI technology and everyday user experiences.", photo: null },
      { name: "005", bio: "Research assistant focusing on reinforcement learning and robotics. Loves building autonomous systems and exploring AI-driven control methods.", photo: "/src/assets/junhao.png" },
    ],
    []
  );

  const items = itemsProp && itemsProp.length ? itemsProp : defaultItems;

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
      const walk = (x - startX) * 1.2;
      el.scrollLeft = scrollStart - walk;
      e.preventDefault();
    };

    const onUp = (e) => {
      isDown = false;
      try { el.releasePointerCapture?.(e.pointerId); } catch {}
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
    <div className={`mr-root-projects mr-root-projects-news ${className}`}>
      <br></br>
      <div className="mr-container mr-container-news">

        {/* 左右圓形箭頭 */}
        <button
          aria-label="上一張"
          className="mr-nav mr-nav-news mr-nav-left"
          onClick={() => { go(-1); pauseAutoplay(); }}
        >
          <img src={left_arrow} alt="" height={50} />
        </button>
        <button
          aria-label="下一張"
          className="mr-nav mr-nav-news mr-nav-right"
          onClick={() => { go(1); pauseAutoplay(); }}
        >
          <img src={right_arrow} alt="" height={50} />
        </button>

        {/* 橫向滑動區（每頁 1 張） */}
        <div ref={scrollerRef} className="mr-scroller mr-no-scrollbar">
          {items.map((m, i) => (
            <section key={i} className="mr-section mr-section-news">
              <article className="mr-profile mr-profile-news">
                {/* 左：大圖（或灰色方塊） */}
                <div className="mr-photo-wrap">
                  {m.photo ? (
                    <img className="mr-photo mr-photo-news" src={m.photo} alt={m.name} />
                  ) : (
                    <div className="mr-photo mr-photo-news placeholder" />
                  )}
                </div>
                {/* 右：標題＋內文 */}
                <div className="mr-text">
                  <h2 className="mr-name">{m.name}</h2>
                  <p className="mr-bio">{m.bio}</p>
                </div>
              </article>
            </section>
          ))}
        </div>

        {/* 點點導航 */}
        <div className="mr-dots">
          {items.map((_, i) => (
            <button
              key={i}
              aria-label={`跳到第 ${i + 1} 張`}
              className={`mr-dot ${active === i ? "is-active" : ""}`}
              onClick={() => { scrollToIndex(i); pauseAutoplay(); }}
            />
          ))}
        </div>
        <br></br>
      </div>
    </div>
  );
}
