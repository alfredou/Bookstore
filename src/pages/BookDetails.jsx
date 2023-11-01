import "./bookdetails.css"
import { StoreItem } from '../components/StoreItem/StoreItem'
import { useLocation } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { useBookContext } from '../context/DataBooksContext';
import { useEffect } from 'react';
import Rate from '../components/Rate/Rate';
import Comments from "../components/Comments/Comments";
import { apiBooksUrl } from "../services/api";

function Bookdetails() {
    const location = useLocation();
    const id = location.pathname.split("/")[2]
    const { setBookList, setName } = useBookContext();

    useEffect(()=>{    
        setBookList([])
        setName('')
    }, [])

    const { data } = useFetch(`${apiBooksUrl.singleBook}/${id}`)
    return (
        <>
            <StoreItem {...data}/>
            <div className="ratingform__container">
                <Comments isbn13={id}/>
                <Rate {...data}/>
            </div>
        </>
    )
}

export default Bookdetails