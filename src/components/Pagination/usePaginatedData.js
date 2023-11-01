import { useState, useEffect } from "react";
import { useBookContext } from "../../context/DataBooksContext";
import useFetch from "../../hooks/useFetch";
import { apiBooksUrl } from "../../services/api";

export default function usePaginatedData (){
    const { bookList, newbooks, setNewBooks, setBookList} = useBookContext();
    const [name, setName] = useState("") 
    const [page, setPage] = useState(apiBooksUrl.newBooks)

    //const urlList = (page && name) ? apiBooksUrl.searchBooks(name, page) : apiBooksUrl.newBooks
    const urlList = (page && name) ? apiBooksUrl.searchBooks(name, page) : apiBooksUrl.newBooks
    const { data, loading, error, hasMore, text } = useFetch(urlList)
    const { books } = data
    //arreglar para mañana que todo funcione

   useEffect(() => {
      setNewBooks(books)
   }, [data, setNewBooks])

   useEffect(()=>{
       if(bookList?.length > 0){
           setBookList(prevBookList => prevBookList.concat(books));
          } 
          //console.log("pageNumber",page)
      }, [data])
    
    const updateName = (name)=>{
        setName(name)
    }
    const updatePage = (page)=>{
        setPage(page)
    }     
    return {
           loading, bookList, newbooks, data, updatePage, name, updateName, data
    }
}