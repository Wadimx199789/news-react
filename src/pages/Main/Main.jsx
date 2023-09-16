
import { useEffect, useState } from 'react';
import { getCategories, getNews } from '../../api/apiNews';
import NewsBanner from '../../components/NewsBanner/NewsBanner';
import styles from './styles.module.css';
import NewsList from '../../components/NewsList/NewsList';
import Skeleton from '../../components/Skeleton/Skeleton';
import Pagination from '../../components/Pagination/Pagination';
import Categories from '../../components/Categories/Categories';


const Main = ()=>{
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true);
    const [currentPage,setCurrentPage] = useState(1);
    const [categories,setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('All')
    const totalPages=10;
    const pageSize=10;
    const fetchNews = async (currentPage) =>{
        try {
            setLoading(true);
            const response = await getNews({
                page_number:currentPage,
                page_size:pageSize,
                category:selectedCategory==="All"?null:selectedCategory
            });
            setNews(response.news);
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    const fetchCategories = async () =>{
        try {
            const response = await getCategories();
            setCategories(["All",...response.categories])
        } catch (error) {
            console.log(error)
        }
    }
    console.log(categories)
    useEffect(()=>{
        fetchCategories()
    },[])
    useEffect(()=>{
        fetchNews(currentPage)
    },[currentPage,selectedCategory]);

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
        <Categories categories={categories} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory}/>
        {news.length>0 && !loading ? <NewsBanner item={news[0]}/>:<Skeleton count={1} type="banner"/>}
        {!loading ? <NewsList news={news}/>:<Skeleton count={10} type="item"/>}
    <Pagination currentPage={currentPage} handlePageClick={handlePageClick} handlePreviosPage={handlePreviosPage} handleNextPage={handleNextPage} totalPages={totalPages}/>
        
    </main>
}

export default Main;