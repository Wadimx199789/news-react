
import { useEffect, useState } from 'react';
import { getNews } from '../../api/apiNews';
import NewsBanner from '../../components/NewsBanner/NewsBanner';
import styles from './styles.module.css';
import NewsList from '../../components/NewsList/NewsList';


const Main = ()=>{
    const [news, setNews] = useState([])
    useEffect(()=>{
        const fetchNews = async () =>{
            try {
                const response = await getNews();
                setNews(response.news);
            } catch (error) {
                console.log(error)
            }
        }
        fetchNews()
    },[])
    return <main className={styles.main}>
        {news.length>0 ? <NewsBanner item={news[0]}/>:null}
        {news.length>0 ? <NewsList news={news}/>:null}
        
    </main>
}

export default Main;