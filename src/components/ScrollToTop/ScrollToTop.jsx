import { useEffect, useState, useRef } from "react"; // 導入 useRef
import { useLocation } from "react-router-dom";
import style from "./ScrollToTop.module.css";


function ScrollToTop({ children }) {
  const { key } = useLocation();
  const [visible, setVisible] = useState(false);
  const pageRef = useRef(null); // 1. 創建 Ref 來引用 main 元素

  // 1️⃣ 每次 pathname 變化就回頂端
  useEffect(() => {
    const currentMain = pageRef.current;
    if (!currentMain) return; // 安全性檢查

    window.scrollTo({ top: 0, behavior: "instant" });
    
    // 2. 【關鍵：禁用淡出】
    // 在狀態變為 false (透明) 之前，強制禁用 transition
    currentMain.style.transition = 'none'; 
    
    // 3. 立即將狀態設為 false (瞬間透明)

    // 暫時取消效果，若要恢復，請取消comment
    // setVisible(false); 

    let rafHandle;
    const timer = setTimeout(() => {
      // 4. 【關鍵：重新啟用淡入】
      // 在動畫開始排程之前，重新啟用 transition 規則
      currentMain.style.transition = ''; // 設為空字串，讓 CSS Modules 規則重新生效

      rafHandle = requestAnimationFrame(() => {
        setVisible(true); // 觸發 $0 \to 1$ 淡入動畫
      })
    }, 50); // 延遲淡入時間 (1000ms)

    // 5. 清理函式
    return () => {
      clearTimeout(timer);
      if (rafHandle){
        cancelAnimationFrame(rafHandle);
      }
       // 確保元件卸載時 transition 樣式是乾淨的
      if (currentMain) {
        currentMain.style.transition = ''; 
      }
    };
  }, [key]);

  return (
    // 6. 綁定 ref 到 main 元素
    <main ref={pageRef} className={`${style.page_wrapper} ${visible ? style.visible : ""}`}>
      {children}
    </main>
  );
}

export default ScrollToTop;