import { useShoppingCart } from '../../context/ShoppingCartContext'
import { formatCurrency } from '../../utilities/formatCurrency'
import { NewPrice } from '../../utilities/newPrice'
import Button from '../Button/Button'
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './storeitem.css'
import { useBookContext } from '../../context/DataBooksContext'

export function StoreItem({ title, subtitle, authors, publisher, isbn13, year, price, desc, image }) {
    const Nprice = NewPrice(null, price)
    const id = Number(isbn13)
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart()
    const quantity = getItemQuantity(id)
    const {productRatingReview} = useBookContext()
    //agregar url del webhook en stripe cuando haga el deploy dejar para el final esto para que se pueda guardar la orden en la base de datos https://www.youtube.com/watch?v=_TVrn-pyTo8&ab_channel=ChaooCharles ver video de chao charles el lo explica en el minuto 1 y pico
     //arreglar el decodeUri para decodificar la descripcion y arreglar lo de stripe 
     //usar resend para enviar el mensaje de la compra.
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
                        <span className='cardDetails__Review'>{`(${productRatingReview.reviews} customer reviews)`}</span>
                        <span className='cardDetails__rating'>
                              {[...Array(5)].map((star, i)=>{
                                      const currentRating = i + 1 
                                           return <FontAwesomeIcon 
                                             key={currentRating}
                                             icon={(productRatingReview.rating !== parseInt(productRatingReview.rating)) && (currentRating === Math.floor(productRatingReview.rating + 1)) ? faStarHalfStroke : faStar} 
                                             size="lg" 
                                             color={currentRating <= Math.floor((productRatingReview.rating !== parseInt(productRatingReview.rating)) ? productRatingReview.rating + 1 : productRatingReview.rating) ? "#ffc107" : "#e4e5e9"}
                                          />
                                    })}
                        </span>
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
