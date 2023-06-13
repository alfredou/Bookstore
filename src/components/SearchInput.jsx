import React from "react";
import { useState, useEffect } from "react"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetch from '../hooks/useFetch';
import { useBookContext } from '../context/DataBooksContext';

function SearchInput() {
    const [name, setName] = useState('')
    const [search, setSearch] = useState('')
    const { bookList, setBookList } = useBookContext()
    const { data, loading, error } = useFetch(`https://api.itbook.store/1.0/search/${name}`)

    useEffect(() => {
        setBookList(data.books)
    }, [data])


    const handleSubmit = (e) => {
        e.preventDefault()
        setName(search)
    }

    return (
        <form onSubmit={handleSubmit} className='header__nav'>
            <input type="text" onChange={(e) => setSearch(e.target.value)} className='header__input' placeholder='Search your book' value={search} />
            <button className='header__loupe'><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
        </form>
    )
}

export default SearchInput