import { useShoppingCart } from '../context/ShoppingCartContext'
import { formatCurrency } from '../utilities/formatCurrency'
import { NewPrice } from '../utilities/newPrice'
import Button from './Button'
import './storeitem.css'

export function StoreItem({ title, subtitle, authors, publisher, isbn13, year, price, desc, image, rating }) {
    const Nprice = NewPrice(null, price)
    const id = Number(isbn13)
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart()
    const quantity = getItemQuantity(id)

    return (
        <>
            <div className='cardDetails'>
                <img
                    className='cardDetails__img'
                    src={image}
                />
                <div className='cardDetails__items'>
                    <span className='cardDetails__item'>{publisher}</span>
                    <span className='cardDetails__item'>{authors}</span>
                    <span className='cardDetails__item'>{year}</span>
                    <span className='cardDetails__item'>{isbn13}</span>
                </div>
                <div className='cardDetails__items'>
                    <div className='cardDetails__title'>
                        <span>{title}</span>
                    </div>
                    <div className='cardDetails__items'>
                        <span className='cardDetails__subtitle'>{subtitle}</span>
                        <span className='cardDetails__rating'>Rat:({rating})</span>
                        <span className='cardDetails__price'>Price: {formatCurrency(Nprice)}</span>
                    </div>
                    <h5 className='cardDetails__details'>Details</h5>
                    <div className='cardDetails__desc'>{decodeURIComponent(desc)}</div>
                    <div className='cardDetails__btns'>
                        {quantity === 0 ? (
                            <Button buttonStyle="btn--blue" buttonSize="btn--large" onClick={() => increaseCartQuantity(id, image, title, price)}>+ Add to Cart</Button>
                        )
                            : (<div className='cardDetails__btn1'>
                                <div className='cardDetails__btn2'>
                                    <Button buttonSize="btn--small" onClick={() => decreaseCartQuantity(id)}>-</Button>
                                    <div>
                                        <span className='cardDetails__quantity'>{quantity}</span>In Cart
                                    </div>
                                    <Button buttonSize="btn--small" onClick={() => increaseCartQuantity(id, image, title, price)}>+</Button>
                                </div>
                                <Button buttonStyle="btn--red" buttonSize="btn--medium" onClick={() => removeFromCart(id)}>Remove</Button>
                            </div>
                            )}
                    </div>
                </div>
            </div>
        </>
    )
}
