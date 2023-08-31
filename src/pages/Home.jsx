import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useBookContext } from "../context/DataBooksContext";
import './home.css'
import {Image} from "../components/Image"
import PaginatedList from "../components/PaginatedList";
import SearchInput from "../components/SearchInput";

export function Home() {
    //const [page, setPage] = useState(1) 
    const [name, setName] = useState("")
    const { bookList, newbooks, setNewBooks, setBookList} = useBookContext();
    const [loading, setLoading] = useState(false)
    /*const urlList = (page && name) ? `https://api.itbook.store/1.0/search/${name}/${page}` : 'https://api.itbook.store/1.0/new' 
    const { data, loading, error, hasMore, text } = useFetch(urlList)
    const { books } = data*/
    {/*infine scrolling cuando llega al final hace el fetching y carga los datos que siguen*/}
    /*    
    const observer = useRef()
    //let counterIntersecting = 1
    const lastBookElementRef = useCallback((node)=>{
        if(loading) return
        if(observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries=>{
            if(entries[0].isIntersecting && hasMore){
                    console.log("visible")
                    setPage(prev=> prev + 1)
                    console.log("page", page)
                }
        })
        if(node) observer.current.observe(node)
    }, [loading, hasMore])
*/
/*
useEffect(() => {
        setNewBooks(books)
     }, [data, setNewBooks])

     useEffect(()=>{
         if(bookList?.length > 0){
             setBookList(prevBookList => prevBookList.concat(books));
            } 
        }, [page])
  */     
        return (
            <>
            <SearchInput setName={setName}/>
            <h1 className="title">{bookList ? `Results from search` : `new releases books`}</h1>
            <div className="books">
                {(bookList?.length > 0) ? bookList?.map((book, i) => {
                      //if(bookList?.length === i + 1){
                          return <Link key={i} to={`books/${book?.isbn13}`} /*ref={lastBookElementRef}*/ className="books__link">
                            {/*<img className="books__img" src={book?.image} alt="" />*/}
                            <Image key={i} src={book?.image} imageClass={`books__img`} alt={book.title}/>
                            <div className="books__texts">
                                <span>{book?.title || 'loading the first text'}</span>
                                <span>{book?.isbn13 || 'loading'}</span>
                                <span>{book?.price || 'loading'}</span>
                            </div>
                        </Link>
                        {/*}else{
                            return <Link key={i} to={`books/${book?.isbn13}`} className="books__link" >
                            <img className="books__img" src={book?.image} alt="" />
                            <Image key={i} src={book.image} imageClass={`books__img`} alt={book.title}/>
                            <div className="books__texts">
                                <span>{book?.title}</span>
                                <span>{book?.isbn13}</span>
                                <span>{book?.price}</span>
                            </div>
                        </Link>
                        }*/}
                    }) : loading ? <div className="spinner"></div> /** este loading al inicio era el que afectaba el infinite scrolling devolviendo la barra de scroll hacia arriba lo quite de arriba si no tiene utilidad lo quito de abajo, el infinite scrolling funciona poniendo el loading abajo de la iteracion de los datos*/
                    : newbooks?.map((book, i) => (
                        <Link key={i} to={`books/${book.isbn13}`} className="books__link" >
                                {<img className="books__img" src={book.image} alt={book.title} />}
                                {!book.image && <div className="booksload__img"></div>}
                                {/*<Image key={i} src={book.image} imageClass={`books__img`}/>*/}
                                <div className="books__texts">
                                    <span>{book.title}</span>
                                    <span>{book.isbn13}</span>
                                    <span>{book.price}</span>
                                </div>
                            </Link>
                        ))}       
            </div>
            <div>
                   <PaginatedList name={name} bookList={bookList} setNewBooks={setNewBooks} setBookList={setBookList} setLoading={setLoading}/>               
            </div>
        </>
    )
}