import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
    //usamos el tipo de funcion dentro del useState porque queremos invocarla para que revise el localStorage una vez porque es un tipo de operación lenta y no la queremos hacer cada vez que nuestro componente se renderiza
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(key)
        //si encuentra ese valor almacenado en jsonValue en localStorage lo convierte a json y lo retorna
        if (jsonValue != null) return JSON.parse(jsonValue)
        //es solo para entender algunos problemas de typescript porque esto piensa que posiblemente el valor de T del initial value de la funcion podria ser una funcion pero nosotros sabemos por datos o hechos de que no puede serlo
        if (typeof initialValue === "function") {
            return initialValue
        } else {
            //al comienzo como no tenemos items almacenados devolvera el initialValue que es el array vacio []
            return initialValue
        }
    })

    useEffect(() => {
        //actualizara el localStorage con el key predeterminada que no cambia, y el valor que son nuestros objetos con id y quantity
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]
}
