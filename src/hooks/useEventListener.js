import { useEffect, useRef } from "react"
//cuando presiono una tecla me dice que tipo de tecla fue la que presioné es grandioso cuando necesitamos hacer cosas como reajustar el tamaño de la ventana etc. 
export default function useEventListener(
  eventType,
  callback,
  element = window
) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (element == null) return
    const handler = e => callbackRef.current(e)
    element.addEventListener(eventType, handler)

    return () => element.removeEventListener(eventType, handler)
  }, [eventType, element])
}
