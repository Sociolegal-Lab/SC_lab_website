import style from "./News.module.css";
import { useEffect, useState, useCallback } from "react";
import news_data from "../../data/news/news.json";
import Search from "./Search";

const news_covers = import.meta.glob("../../data/news/*.png", {eager: true});

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
        lang="en"
        className={` ${style.shelf} ${style.marginLR}`}
      >
        {displayNews.map((n) => (
          <li key={n.id} className={style.piece} >
            <div className={style.img43}>
              <img
              // Checking if the news cover image exists. If not, it will render 0.png as a fallback, preventing errors when the image is missing.
                src={
                  news_covers[`../../data/news/${n.id}.png`]
                    ? news_covers[`../../data/news/${n.id}.png`].default
                    : news_covers[`../../data/news/0.png`].default
                }
                alt="news picture"
              />
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
