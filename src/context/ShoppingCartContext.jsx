import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { ShoppingCart } from '../components/ShoppingCart/ShoppingCart'
import { useLocalStorage } from '../hooks/useLocalStorage'

const ShoppingCartContext = createContext({})

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false)
    //cartItems esta vacio al comienzo solo tiene un array vacio de tipo cartItem cuando se incrementa guarda el id y la cantidad en localstorage y en el estado.
    const [cartItems, setCartItems] = useLocalStorage("shopping-cart", [])

    //si no hay ningun objeto la cantidad inicial sera 0 como se especifica al final
    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity, 0)

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    function getItemQuantity(id) {
        //en caso de que el id sea igual al id (almacenado cuando se incrementa) accede a la cantidad almacenada, si no existe un objeto con el id y la cantidad devuelve 0 
        return cartItems.find(items => items.id === id)?.quantity || 0
    }
    function increaseCartQuantity(id, image, title, price) {
        setCartItems(currItems => {
            //si el item.id es diferente a id evalua a null y si es undefined también
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, quantity: 1, image, title, price }]
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        //toma el item actual ...item id que es igual a id: item.id
                        return { id: item.id, quantity: item.quantity + 1, image, title, price }
                    } else {
                        return item
                    }
                })
            }
        })
    }
    function decreaseCartQuantity(id) {
        setCartItems(currItems => {
            //si la cantidad es 1 y el id es el mismo que el del item encontrado
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                //filtraremos y retornaremos un array con los items con id diferentes del id enviado en la funcion
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        //retornara y decrementara en 1 la cantidad del item que tenga el id igual al enviado en la funcion
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }
    function removeFromCart(id) {
        setCartItems(currItems => {
            //filtraremos y retornaremos un array con los items con id diferentes del id enviado en la funcion
            return currItems.filter(item => item.id !== id)
        })
    }

    function removeAllFromCart(){
        setCartItems([])
    }
    //cambiar logica de use fetch mañana añadir al home (crear estado nuevo)
    //ingresar la información de los details en el contexto de los fetchs (crear estado nuevo)
    //enlazar los datos del carrito con la información solicitada en la barra de busqueda cuando vamos por la parte de detalles

    return (
        <ShoppingCartContext.Provider value={{ getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, removeAllFromCart, cartItems, cartQuantity, openCart, closeCart }}>
            {children}
            {/** cuando se da click en el carrito del navbar actualiza el estado de isOPen a true y por tanto renderiza ese componente cuando esta en true el isOpen*/}
            <ShoppingCart isOpen={isOpen} />
        </ShoppingCartContext.Provider>
    )
}