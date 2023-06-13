import { useShoppingCart } from '../context/ShoppingCartContext'
import { formatCurrency } from '../utilities/formatCurrency'
import { NewPrice } from '../utilities/newPrice'
import Button from './Button'
import './cartitem.css'

//cartItem
export function CartItem({ id, quantity, image, price, title }) {
    const { removeFromCart, increaseCartQuantity, decreaseCartQuantity } = useShoppingCart()

    return (
        <>
            <div className="cartitem">
                <img className="cartitem__img" src={image} />

                <div className='cartitem__quantityprice'>
                    <div className='cartitem__tqcontainer'>
                        {title}{" "}
                        {quantity > 1 && (
                            <span className='cartitem__quantity'>
                                x{quantity}
                            </span>
                        )}
                    </div>
                    <div className='cartitem__price'>
                        {formatCurrency(NewPrice(null, price))}
                    </div>
                </div>
                <div className='cartitem__buttonsquantity'>
                    <div>{formatCurrency(NewPrice(null, price) * quantity)}</div>

                    <div className='cartitem__buttons'>
                        <Button buttonStyle="btn--red" buttonSize="btn--small" onClick={() => removeFromCart(Number(id))}>&times;</Button>
                        <Button buttonSize="btn--small" onClick={() => decreaseCartQuantity(id)}>-</Button>
                        <Button buttonSize="btn--small" onClick={() => increaseCartQuantity(id, image, title, price)}>+</Button>
                    </div>
                </div>
            </div>
        </>
    )
}