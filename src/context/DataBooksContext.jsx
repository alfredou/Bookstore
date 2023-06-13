import { useContext, useState, createContext } from "react";


const bookContext = createContext()

export const useBookContext = () => {
    return useContext(bookContext)
}

export const BookContextProvider = ({ children }) => {
    const [bookList, setBookList] = useState([])
    const [newbooks, setNewBooks] = useState([])
    return (
        <bookContext.Provider value={{ bookList, setBookList, newbooks, setNewBooks }}>
            {children}
        </bookContext.Provider>
    )
}