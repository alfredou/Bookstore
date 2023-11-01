import "./pagination.css"
import React, {useEffect, useState} from 'react'
import usePagination from '../../hooks/usePagination'

function PaginatedList({data, updatePage, name}) { 
    const {currentPage, totalPages, goToPage, getPageNumbers} = usePagination(data?.total, data.books?.length)
    
    useEffect(()=>{
        goToPage(1)
    }, [name])

    useEffect(()=>{//
        updatePage(currentPage);
        //console.log("urlList", urlList)
     }, [currentPage])
 
    return (
             <>
                {(name && currentPage) && <div className="pagination">
                   <button className="pagination__prev" onClick={()=>goToPage(currentPage - 1)} disabled={currentPage <= 1}>-</button>
                   <div className="pagination__list">
                     {getPageNumbers().map(number=>{
                         return <button key={number} onClick={()=>goToPage(number)} className={number === currentPage ? 'pagination__pages pagination__active' : 'pagination__pages pagination__hover'}>
                             {number}
                           </button>
                     })}
                   </div>
                     
                   <button className="pagination__next" onClick={()=>goToPage(currentPage + 1)} disabled={currentPage === totalPages}>+</button>
                </div>}
             </>
  )
}

export default PaginatedList