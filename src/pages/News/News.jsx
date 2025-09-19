import style from './News.module.css';
import { use, useEffect, useState } from 'react';
import fallbackNews from '../../data/news/news.json';

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
            
    return (
    <ul>
      {news.map(n => <li key={n.id}>{n.headline} {n.content}</li>)}
    </ul>
    );
}

export default News