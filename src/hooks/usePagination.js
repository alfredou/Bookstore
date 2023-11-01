import { useState, useEffect } from 'react'

function usePagination(totalItems, itemsPerPage) {
   const [currentPage, setCurrentPage] = useState(1)
   const totalPages = Math.ceil(totalItems / itemsPerPage);

   const goToPage = (page)=>{
         if(page>=1 && page <= totalPages){
            setCurrentPage(page)
         }
   }

   const getPageNumbers = ()=>{
            const pageNumbers = []
            const maxPageNumbersToShow = 7; // Máximo de números de página a mostrar
            const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));//4 //importante analizar
            const endPage = Math.min(startPage + maxPageNumbersToShow - 1, totalPages);//10

            for(let i = startPage; i<= endPage; i++){
                  pageNumbers.push(i)
            }
       return pageNumbers
   }   

   return {
       currentPage, 
       totalPages,
       getPageNumbers,
       goToPage
   }
}

export default usePagination