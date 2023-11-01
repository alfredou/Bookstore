import { useEffect } from "react"
import useMediaQuery from "./useMediaQuery"
import { useLocalStorage } from "./useLocalStorage"
//pone el tema oscuro en la pagina en la que estemos
export default function useDarkMode() {
  const [darkMode, setDarkMode] = useLocalStorage("useDarkMode")
  //le decimos aqui al custom hook useMediaQuery que preferimos el esquema de color negro o dark
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
  //prefersDarkMode sera true cuando le demos click al boton y lo cambiemos a dark
  const enabled = darkMode ?? prefersDarkMode
  //cuando este habilitado el darkmode hara un toggle y lo pondra
  useEffect(() => {
    document.body.classList.toggle("dark-mode", enabled)
  }, [enabled])

  return [enabled, setDarkMode]
}
