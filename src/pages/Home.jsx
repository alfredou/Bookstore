import React, { useEffect } from "react"
import { Link } from "react-router-dom";
import { useBookContext } from "../context/DataBooksContext";
import useFetch from "../hooks/useFetch";
import './home.css'

export function Home() {
    const { data, loading, error } = useFetch('https://api.itbook.store/1.0/new')
    const { books } = data

    const { bookList, newbooks, setNewBooks, setBookList } = useBookContext();

    useEffect(() => {
        setNewBooks(books)
    }, [data, setNewBooks])

    return (
        <>
            <h1 className="title">{bookList ? `Results from search` : `new releases books`}</h1>
            <div className="books">
                {loading ? <div className="spinner spinner--aligned"></div>
                    : (bookList) ? bookList?.map((book, i) => (
                        <Link key={i} to={`books/${book.isbn13}`} className="books__link" >
                            <img className="books__img" src={book.image} alt="" />
                            <div className="books__texts">
                                <span>{book.title}</span>
                                <span>{book.isbn13}</span>
                                <span>{book.price}</span>
                            </div>
                        </Link>
                    )) :
                        newbooks?.map((book, i) => (
                            <Link key={i} to={`books/${book.isbn13}`} className="books__link" >
                                <img className="books__img" src={book.image} alt="" />
                                <div className="books__texts">
                                    <span>{book.title}</span>
                                    <span>{book.isbn13}</span>
                                    <span>{book.price}</span>
                                </div>
                            </Link>
                        ))}
            </div>
        </>
    )
}