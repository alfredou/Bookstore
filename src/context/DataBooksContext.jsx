import { useContext, useState, createContext } from "react";


const bookContext = createContext()

export const useBookContext = () => {
    return useContext(bookContext)
}

export const BookContextProvider = ({ children }) => {
    const [bookList, setBookList] = useState([])
    const [newbooks, setNewBooks] = useState([])
    const [name, setName] = useState('')
    const [productRatingReview, setProductRatingReview] = useState({rating: 0, reviews: 0})

    return (
        <bookContext.Provider value={{ bookList, setBookList, newbooks, setNewBooks, name, setName, productRatingReview, setProductRatingReview}}>
            {children}
        </bookContext.Provider>
    )
}