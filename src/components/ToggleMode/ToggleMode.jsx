import useDarkMode from "../../hooks/useDarkMode"
import Switch from "../Switch/Switch"

export default function DarkModeComponent() {
  const [darkMode, setDarkMode] = useDarkMode()

  const handleDarkMode = ()=>{
    setDarkMode(prevDarkMode => !prevDarkMode)
  }

  return (
    <Switch handleDarkMode={handleDarkMode} darkMode={darkMode}/>
  )
}