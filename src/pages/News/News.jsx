import style from "./News.module.css";
import { useEffect, useState, useCallback } from "react";
import fallbackNews from "../../data/news/news.json";
import Search from "./Search";

function News() {
  const [news, setNews] = useState(null);
  const [selectedYear, setSelectedYear] = useState("All");
  const AMOUNT_OF_NEWS = 15;
  const [newslimit, setNewslimit] = useState(AMOUNT_OF_NEWS);

  const handleSearchResult = useCallback((results) => {
    // setNews(results);
    setSelectedYear("All");
    setNewslimit(AMOUNT_OF_NEWS);
  }, []);

  useEffect(() => {
    async function fetchNews() {
      try {
        // 1️⃣ 取得 content-version
        const v = await fetch("/data/content-version.txt")
          .then((r) => r.text())
          .catch(() => Date.now()); // fallback 使用當前時間

        // 2️⃣ 用 cache-busting URL 取得最新 news.json
        const response = await fetch(
          `/data/news/news.json?v=${encodeURIComponent(v)}`
        );
        const data = await response.json();

        // 3️⃣ 更新 state
        setNews(data);
      } catch (err) {
        // 4️⃣ fetch 失敗時使用 fallback
        console.error("Failed to fetch news:", err);
        setNews(fallbackNews);
      }
    }

    fetchNews();
  }, []);

  if (!news) {
    return <>Loading. . .</>;
  }
  // Avoid mutating news in place!
  const sortedNews = [...news].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  // year categorize
  const year_set = Array.from(
    new Set(news.map((n) => new Date(n.date).getFullYear()))
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

  return (
    <>
      <div className={`${style.title} ${style.marginLR} rufina-bold`}>
        Keep up with SC Lab!
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
              setNews(results); // 如果你要直接覆蓋 news 的話
            }
          }}
        /> */}
      </div>
      <ul
        className={` ${style.shelf} ${style.marginLR}`}
        style={{ backgroundColor: "gray" }}
      >
        {displayNews.map((n) => (
          <li key={n.id} className={style.piece}>
            <div className={style.img43}>
              <img src={`/data/news/${n.id}.png`} alt="news picture" />
            </div>
            <div className={`${style.date} inter-bold`}>
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
      {/* switch page */}
      {newslimit < selectedNews.length && (
        <div
          className={`${style.switch_page} ${style.marginLR} inter-bold`}
          onClick={() => setNewslimit((existing_news) => existing_news + 9)}
        >
          Older ---&gt;
        </div>
      )}
      {/* year tab */}
      <div className={`${style.news_nav_bar} ${style.marginLR} inter-bold`}>
        <div>
          <button
            onClick={() => {
              setSelectedYear("All");
              setNewslimit(AMOUNT_OF_NEWS);
              window.scrollTo({ top: 0, behavior: "smooth" });
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
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              {year}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default News;
