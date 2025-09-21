import style from './News.module.css';
import { use, useEffect, useState } from 'react';
import fallbackNews from '../../data/news/news.json';
import Search from './Search';

function News(){
    const [news, setNews] = useState(null);
  useEffect(() => {
    async function fetchNews() {
      try {
        // 1️⃣ 取得 content-version
        const v = await fetch('/data/content-version.txt')
          .then(r => r.text())
          .catch(() => Date.now()); // fallback 使用當前時間

        // 2️⃣ 用 cache-busting URL 取得最新 news.json
        const response = await fetch(`/data/news/news.json?v=${encodeURIComponent(v)}`);
        const data = await response.json();

        // 3️⃣ 更新 state
        setNews(data);
      } catch (err) {
        // 4️⃣ fetch 失敗時使用 fallback
        console.error('Failed to fetch news:', err);
        setNews(fallbackNews);
      }
    }

    fetchNews();
  }, []);
    
    if(!news){
        return <>Loading. . .
        </>
    };


    const sortedNews = news.sort((a, b) => new Date(b.date) - new Date(a.date));
    const year_set = [new Set(news.map(n => new Date(n.date).getFullYear()))];
    return (<>
        <div className={`${style.title} rufina-bold`}>Keep up with SC Lab!</div>
        <div className={style.padding}>
            <Search/>
        </div>
        <ul className={` ${style.shelf} ${style.padding}`} style={{backgroundColor: "gray"}}>
            {sortedNews.map(n => <li key={n.id} className={style.piece}>
                <div className={style.img43}>
                  <img src={`/data/news/${n.id}.png`} alt='news picture'/>
                </div>
                <div className={`${style.date} inter-bold`}>{new Date(n.date).toLocaleDateString("en-US", {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</div>
                <div className={`${style.headline} inter-bold`}>{n.headline}</div>
                <div className={`${style.content} inter-medium`}>{n.content}</div>
            </li>)}
        </ul>
        <div className={`${style.switch_page}`}>
          older
        </div>
        <div className={`${style.news_nav_bar} inter-bold`}>
          {year_set.map(x => <div key={x} className={`${style.news_nav_bar_item}`}>{x}</div>)}
        </div>
    </>
    
    );
}

export default News