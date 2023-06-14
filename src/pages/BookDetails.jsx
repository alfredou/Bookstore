import { StoreItem } from '../components/StoreItem'
import { useLocation } from 'react-router-dom'
import useFetch from '../hooks/useFetch'

function Bookdetails() {
    const location = useLocation();
    const id = location.pathname.split("/")[3]  //2

    const { data, loading, error } = useFetch(`https://api.itbook.store/1.0/books/${id}`)

    return (
        <>
            <StoreItem {...data} />
        </>
    )
}

export default Bookdetails