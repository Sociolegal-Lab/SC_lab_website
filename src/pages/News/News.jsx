import style from "./News.module.css";
import { useEffect, useState, useCallback, useRef } from "react";
import news_data from "../../data/news/news.json";
import Search from "./Search";

const news_covers = import.meta.glob('../../data/news/*.{png,jpg,jpeg,webp}', { eager: true, as: 'url' });

// map basename (id) -> url, e.g. "1.png" -> "…/1.hash.png"
const cover_filename = Object.fromEntries(
  Object.entries(news_covers).map(([path, url]) => {
    const m = path.match(/\/([^\/]+)\.(png|jpe?g|webp)$/i);
    const key = m ? m[1] : path;
    return [key, url];
  })
);

function News() {
  const [selectedYear, setSelectedYear] = useState("All");
  
  // Determine how many news should display in a page
  const AMOUNT_OF_NEWS = 12;
  const [newslimit, setNewslimit] = useState(AMOUNT_OF_NEWS);

  const handleSearchResult = useCallback((results) => {
    // setNews(results);
    setSelectedYear("All");
    setNewslimit(AMOUNT_OF_NEWS);
  }, []);

  // Avoid mutating news in place!
  const sortedNews = [...news_data].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  // year categorize
  const year_set = Array.from(
    new Set(news_data.map((n) => new Date(n.date).getFullYear()))
  );
  let selectedNews = [];
  for (let i = 0; i < sortedNews.length; i++) {
    if (selectedYear === new Date(sortedNews[i].date).getFullYear()) {
      selectedNews.push(sortedNews[i]);
    }
    // All case
    else if (selectedYear === "All") {
      selectedNews = sortedNews;
      break;
    }
  }

  // Display news
  const displayNews = selectedNews.slice(0, newslimit);

  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedYear]);

  // --- NEW: popup state + refs + handlers (behaves like header menuOpen) ---
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupSrc, setPopupSrc] = useState('');
  const popupRef = useRef(null);

  const openCoverPopup = (src) => {
    setPopupSrc(src);
    setPopupOpen(true);
  };

  useEffect(() => {
    if (!popupOpen) return;

    const handleOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setPopupOpen(false);
      }
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") setPopupOpen(false);
    };

    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [popupOpen]);
  // --- end new ---

  return (
    <>
      <div className={`${style.title} ${style.marginLR} inter-bold`}>
        Latest News
      </div>
      <div className={style.marginLR}>
        {/* <Search
          news={sortedNews}
          onSearchResult={(results) => {
            if (results === null) {
              // 沒輸入時，顯示全部 news
              setSelectedYear("All");
              setNewslimit(AMOUNT_OF_NEWS);
            } else {
              // 有搜尋結果時，顯示結果（你可以改成 setNews 或另外存一個 filteredNews state）
              setSelectedYear("All");
              setNewslimit(AMOUNT_OF_NEWS);
              setNewslimit(AMOUNT_OF_NEWS);
              setNews(results); // 如果你要直接覆蓋 news 的話
            }
          }}
        /> */}
      </div>
      <ul
        lang="en"
        className={` ${style.shelf} ${style.marginLR}`}
      >
        {displayNews.map((n) => (
          <li key={n.id} className={style.piece} >
            <div
              className={style.img43}
              onClick={() => openCoverPopup(cover_filename[n.id] ?? cover_filename['0'] ?? '')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter") openCoverPopup(cover_filename[n.id] ?? cover_filename['0'] ?? ''); }}
            >
              <img
                src={cover_filename[n.id] ?? cover_filename['0'] ?? ''}
                alt="news picture"
              />
            </div>
            <div className={`${style.date} roboto-condensed-medium`}>
              {new Date(n.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className={`${style.headline} inter-bold`}>
              {n.headline}
            </div>
            <div className={`${style.content} inter-medium`}>
              {n.content}
            </div>
          </li>
        ))}
      </ul>

      {/* popup overlay + centered image */}
      {popupOpen && (
        <>
          <div
            // overlay
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.45)',
              zIndex: 999,
            }}
            onClick={() => setPopupOpen(false)}
          />
          <div
            ref={popupRef}
            role="dialog"
            aria-modal="true"
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1000,
              maxWidth: '90vw',
              maxHeight: '90vh',
              boxShadow: '0 6px 24px rgba(0,0,0,0.3)',
              borderRadius: 12,
              background: '#fff',
              padding: 8,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={popupSrc}
              alt="news cover"
              style={{
                display: 'block',
                maxWidth: 'calc(90vw - 16px)',
                maxHeight: 'calc(90vh - 16px)',
                borderRadius: 8,
              }}
            />
          </div>
        </>
      )}

      {/* switch page */}
      {newslimit < selectedNews.length && (
        <div
          className={`${style.switch_page} ${style.marginLR} roboto-condensed-bold`}
          onClick={() => setNewslimit((existing_news) => existing_news + 9)}
        >
          Older <span className="inter-bold" >---&gt;</span>
        </div>
      )}
      {/* year tab */}
      <div className={`${style.news_nav_bar} ${style.marginLR} roboto-condensed-bold`}>
        <div>
          <button
            onClick={() => {
              setSelectedYear("All");
              setNewslimit(AMOUNT_OF_NEWS);
            }}
          >
            All
          </button>
        </div>
        {year_set.map((year) => (
          <div key={year}>
            <button
              onClick={() => {
                setSelectedYear(year);
                setNewslimit(AMOUNT_OF_NEWS);
              }}
            >
              {year}
            </button>
          </div>
        ))}
      </div>
      {/* band */}
      <div style={{background: "#CDD3FE", height: "6px", width:"100vw"}}> </div>
    </>
  );
}

export default News;
