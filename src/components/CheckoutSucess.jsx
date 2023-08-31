import "./checkoutsucess.css"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { useEffect } from "react"
import runFireworks from "../utilities/utils"
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
    const {removeAllFromCart} = useShoppingCart()
  //enviar correo de la compra con resend crear en el backend ruta o en el front con el item comprado.
    useEffect(()=>{
       removeAllFromCart()
       runFireworks()
   },[])

    return (
    <div className="success__container">
        <div className="success">
            <div className="success__icon">
               <FontAwesomeIcon icon={faBagShopping} />
            </div>
            <h2 className="success__title">Thank you for your order</h2>
            <p className="success__description">Check your email inbox for the receipt</p>
            <div className="success__help">
                <p>If you have any question, please email <a className="email" href="mailto:order@example.com">order@example.com</a></p>
                <Link to="/" className="success__button">CONTINUE SHOPPING</Link>
            </div>
        </div>
    </div>
    )
}

export default CheckoutSuccess