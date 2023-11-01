import { useNavigate, NavLink, redirect } from 'react-router-dom'
import { useShoppingCart } from '../../context/ShoppingCartContext'
import './navbar.css'
import { faUser, faCartShopping, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from '../Button/Button';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { apiUrl } from '../../services/api';
import DarkModeComponent from '../ToggleMode/ToggleMode';

export function Navbar() {
    const { openCart, cartQuantity } = useShoppingCart()
    const { navigate } = useNavigate();
    const { user, loading, error, dispatch } = useContext(AuthContext)

    const handleLogout = ()=>{
        apiUrl.get("/logout", { withCredentials: true }).then(res=>{
            if(res.data){
                dispatch({ type: "LOGOUT" })
                console.log(res.data)
            }
            }).catch(e=> e.message)
    }

    return (
        <header className="header">
            <div className="header__container">
                    <NavLink to="/" className='header__logo'>Bookstore</NavLink>
              <nav className='header__nav'>
                <div className='header__info'>
                    <DarkModeComponent/>
                    {user && <NavLink to={`/user/profile`} className="header__icon">
                        <FontAwesomeIcon icon={faUser} />
                    </NavLink>}
                    {(!user) ? (<NavLink to="/login" className="header__icon">
                            {<Button buttonStyle="btn--blue--medium" buttonSize="btn--small">Login /Register</Button>}
                        </NavLink>) 
                        :(<NavLink to="" className="header__icon">
                            <Button buttonStyle="btn--blue--medium" buttonSize="btn--small" onClick={handleLogout}>Logout</Button>
                        </NavLink>)}
                    {cartQuantity > 0 && (<NavLink className="header__carticons" onClick={openCart}>
                        <FontAwesomeIcon icon={faCartShopping} className="header__icon" />
                        <div className="header__quantity">{cartQuantity}</div>
                    </NavLink>
                    )}
                 </div>
              </nav>
            </div>
        </header >
    )
}