import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


function ScrollToTop({ children }) {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  // 1️⃣ 每次 pathname 變化就回頂端
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setVisible(false); // reset opacity
    const timer = setTimeout(() => setVisible(true), 50); // 延遲淡入
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <main className={`page-wrapper ${visible ? "visible" : ""}`}>
      {children}
    </main>
  );
}

export default ScrollToTop;
