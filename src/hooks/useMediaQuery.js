import { useState, useEffect } from "react"
import useEventListener from "./useEventListener"
//una de las grandes quejas de react es que no puedes escribir mediaqueries dentro de la etiqueta style en jsx pero
//este custom hook es para esto para añadir media queries en react con codigo javascript
export default function useMediaQuery(mediaQuery) {
  const [isMatch, setIsMatch] = useState(false)
  const [mediaQueryList, setMediaQueryList] = useState(null)

  useEffect(() => {
    const list = window.matchMedia(mediaQuery)
    setMediaQueryList(list)
    setIsMatch(list.matches)
  }, [mediaQuery])

  useEventListener("change", e => setIsMatch(e.matches), mediaQueryList)

  return isMatch
}