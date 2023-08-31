import "./pagination.css"
import React, {useEffect, useState} from 'react'
import usePagination from '../hooks/usePagination'
import useFetch from '../hooks/useFetch'
import { apiBooksUrl } from "../services/api"

function PaginatedList({name, bookList, setNewBooks, setBookList, setLoading}) {
    const [page, setPage] = useState(apiBooksUrl.newBooks)
    const urlList = (page && name) ? apiBooksUrl.searchBooks(name, page) : apiBooksUrl.newBooks
    const { data, loading, error, hasMore, text } = useFetch(urlList)
    const { books } = data

    const {currentPage, totalPages, goToPage, getPageNumbers} = usePagination(data?.total,books?.length)
    useEffect(()=>{
       setLoading(loading)
    },[loading])

    useEffect(()=>{
          setPage(currentPage);
          //console.log("urlList", urlList)
    }, [currentPage])

    useEffect(() => {
        setNewBooks(books)
     }, [data, setNewBooks])

     useEffect(()=>{
         if(bookList?.length > 0){
             setBookList(prevBookList => prevBookList.concat(books));
            } 
            //console.log("pageNumber",page)
        }, [data])

    return (
  <>
     {(name && currentPage) && <div className="pagination">
        <button className="pagination__prev" onClick={()=>goToPage(currentPage - 1)} disabled={currentPage <= 1}>-</button>
        <div className="pagination__list">
          {getPageNumbers().map(number=>{
              return <span key={number} onClick={()=>goToPage(number)} className={number === currentPage ? 'pagination__active' : 'pagination__hover'}>
                  {number}
                </span>
          })}
        </div>
          
        <button className="pagination__next" onClick={()=>goToPage(currentPage + 1)} disabled={currentPage === totalPages}>+</button>
     </div>}
  </>
  )
}

export default PaginatedList