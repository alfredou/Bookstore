import { useNavigate, NavLink, redirect } from 'react-router-dom'
import { useShoppingCart } from '../context/ShoppingCartContext'
import './navbar.css'
import { faUser, faCartShopping, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from './Button';
import SearchInput from './SearchInput';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

export function Navbar() {
    const { openCart, cartQuantity } = useShoppingCart()
    const { navigate } = useNavigate();
    const { user, loading, error, dispatch } = useContext(AuthContext)

    return (
        <header className="header">
            <div className="header__container">
                <NavLink to="/bookstore" className='header__logo'>Bookstore</NavLink>
                <nav className='header__nav'>
                    <SearchInput />
                </nav>
                <div className='header__info'>
                    {/*cambiar ruta hacer el formulario de login con formik y dar estilos
                    mostrar información del usuario de su perfil en esta ruta también mostrar el carrito en la otra ruta
                    abrir documento de word para mas informarse mejor*/}
                    <NavLink to="/users/:id" className="header__icon">
                        <FontAwesomeIcon icon={faUser} />
                    </NavLink>
                    {(user) ?
                        (<NavLink to="" className="header__icon">
                            <Button buttonStyle="btn--blue--medium" buttonSize="btn--small" onClick={() => {
                                dispatch({ type: "LOGOUT" })
                            }}>Logout</Button>
                        </NavLink>)
                        : <NavLink to="/bookstore/login" className="header__icon">
                            {<Button buttonStyle="btn--blue--medium" buttonSize="btn--small">Login /Register</Button>}
                        </NavLink>}
                    {cartQuantity > 0 && (<NavLink className="header__carticons" onClick={openCart}>
                        <FontAwesomeIcon icon={faCartShopping} className="header__icon" />
                        <div className="header__quantity">{cartQuantity}</div>
                    </NavLink>
                    )}
                </div>
            </div>
        </header >
    )
}