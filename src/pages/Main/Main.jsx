
import { useEffect, useState } from 'react';
import { getNews } from '../../api/apiNews';
import NewsBanner from '../../components/NewsBanner/NewsBanner';
import styles from './styles.module.css';
import NewsList from '../../components/NewsList/NewsList';
import Skeleton from '../../components/Skeleton/Skeleton';
import Pagination from '../../components/Pagination/Pagination';


const Main = ()=>{
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true);
    const [currentPage,setCurrentPage] = useState(1);
    const totalPages=10;
    const pageSize=10;
    const fetchNews = async (currentPage) =>{
        try {
            setLoading(true)
            const response = await getNews(currentPage,pageSize);
            setNews(response.news);
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchNews(currentPage)
    },[currentPage]);

    const handleNextPage = () =>{
        if(currentPage<totalPages){
            setCurrentPage(currentPage+1)
        }
    }
    const handlePreviosPage = () =>{
        if(currentPage>1){
            setCurrentPage(currentPage-1)
        }
    }
    const handlePageClick = (pageNumber) =>{
        setCurrentPage(pageNumber);
    }
    return <main className={styles.main}>
        {news.length>0 && !loading ? <NewsBanner item={news[0]}/>:<Skeleton count={1} type="banner"/>}
        {!loading ? <NewsList news={news}/>:<Skeleton count={10} type="item"/>}
    <Pagination currentPage={currentPage} handlePageClick={handlePageClick} handlePreviosPage={handlePreviosPage} handleNextPage={handleNextPage} totalPages={totalPages}/>
        
    </main>
}

export default Main;