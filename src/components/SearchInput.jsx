import "./searchInput.css"
import React from "react";
import { useState } from "react"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";

function SearchInput({setName}) {

    const [search, setSearch] = useState('')
    const location = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault()
        setName(search)
    }

    return (
      <>
        <form onSubmit={handleSubmit} className='home__containerinput'>
            <input type="text" onChange={(e) => setSearch(e.target.value)} className='home__input' placeholder='Search your book' value={search} />
            <button className='home__loupe'><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
        </form>
      </>
    )
}

export default SearchInput