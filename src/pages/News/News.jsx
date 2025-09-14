import style from './News.module.css';
import { use, useEffect, useState } from 'react';
import fallbackNews from '../../data/news/news.json';

function News(){
    const [news, setNews] = useState(null);
    useEffect(() => {
        fetch('/data/news/news.json')
            .then(response => {
                const data = response.json()
                return data;
            })
            .then(data => {setNews(data);})
            .catch(()=>{setNews(fallbackNews);});
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