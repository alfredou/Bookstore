import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { CartItem } from "./CartItem";
import { useNavigate } from "react-router-dom";
import { NewPrice } from "../utilities/newPrice";
import Button from './Button'
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './shoppingcart.css'
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import axios from "axios";

export function ShoppingCart({ isOpen }) {
    const { closeCart, cartItems, cartQuantity } = useShoppingCart()
    const { user } = useContext(AuthContext)
    //console.log(cartItems)
    const navigate = useNavigate()
    //cargar datos en la caja
    const handleSubTotal = () => {
        return cartItems.reduce((total, cartItem) => {
            //si el id del json es igual al id de cartItems
            //negro como cadena azul como numero
            const item = cartItems.find(i => Number(i.id) === cartItem.id)
            //console.log(item)
            return total + (NewPrice(item) || 0) * cartItem.quantity
        }, 0)
    }
    const handlePay = () => {
        if (!user) {
            closeCart()
            return navigate("/login")
        } else {
            const NcartItems = cartItems.map(item => {
                return {
                    ...item,
                    price: Number(NewPrice(null, item.price))
                }
            })
            axios.post(`http://localhost:3001/api/stripe/create-checkout-session`, {
                NcartItems,
                userId: user._id
            }).then((res) => {
                if (res.data.url) {
                    //console.log(res.data.url)
                    window.location.href = res.data.url
                }
            }).catch((e) => console.log(e.message))
        }
    }

    return (
        <div className={isOpen ? `cartmenu__bg` : ``}>
            <div className={isOpen ? `cartmenu active` : 'cartmenu'}>
                <div className="cartmenu__top">
                    <span className="cartmenu__items">Cart ({cartQuantity} items)</span>
                    <FontAwesomeIcon icon={faCircleXmark}
                        className="cartmenu__close"
                        onClick={() => closeCart()}
                    />
                </div>
                <div className="cartmenu__elements">
                    <div className="cartmenu__element">
                        {cartItems.map(item => (
                            <CartItem key={item.id} {...item} />
                        ))}
                        <div className="cartmenu__subtotal">
                            SubTotal{" "}
                            {formatCurrency(
                                handleSubTotal()
                            )}
                        </div>
                        {cartQuantity == 0 ? <Button buttonStyle="btn--blue" onClick={() => {
                            closeCart()
                            navigate('/')
                        }}>add Books to cart</Button> :
                            <Button buttonStyle="btn--blue" onClick={handlePay}>{(user) ? `Pay with stripe` : `Login to Check out`}</Button>}
                    </div>
                </div>
            </div>
        </div>
    )
}