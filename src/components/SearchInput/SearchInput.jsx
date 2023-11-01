import "./searchInput.css"
import React from "react";
import { useState, useCallback } from "react"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import debounce from "just-debounce-it"

function SearchInput({updateName}) {
  const [search, setSearch] = useState('')
  const location = useLocation();

    const debouncedGetBooks = useCallback(debounce(search=>{
        console.log("search", search)
        //updatePage(1)
        updateName(search)
    }, 300), [])

    const handleSubmit = (e) => {
        e.preventDefault()
        //updatePage(1)     
        updateName(search) 
    }
    const handleSearchChange=(e)=>{
      const newSearch = e.target.value
      setSearch(newSearch)
      debouncedGetBooks(newSearch)
    }

    return (
      <>
        <form onSubmit={handleSubmit} className='home__containerinput'>
            <input type="text" onChange={handleSearchChange} className='home__input' placeholder='Search your book' value={search} />
            <button title="loupe" className='home__loupe'><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
        </form>
      </>
    )
}

export default SearchInput