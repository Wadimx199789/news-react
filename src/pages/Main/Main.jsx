
import { useEffect, useState } from 'react';
import { getNews } from '../../api/apiNews';
import NewsBanner from '../../components/NewsBanner/NewsBanner';
import styles from './styles.module.css';
import NewsList from '../../components/NewsList/NewsList';
import Skeleton from '../../components/Skeleton/Skeleton';


const Main = ()=>{
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const fetchNews = async () =>{
            try {
                setLoading(true)
                const response = await getNews();
                setNews(response.news);
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        fetchNews()
    },[])
    return <main className={styles.main}>
        {news.length>0 && !loading ? <NewsBanner item={news[0]}/>:<Skeleton count={1} type="banner"/>}
        {!loading ? <NewsList news={news}/>:<Skeleton count={10} type="item"/>}
        
    </main>
}

export default Main;