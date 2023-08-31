import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import UserCard from "../components/UserCard"     

export function Profile() {
        const { user } = useContext(AuthContext)

        return (
            <>
                         <UserCard user={user}/>
            </>
        )                
    }
    
    export default Profile