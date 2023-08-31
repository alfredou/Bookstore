import {useState, useRef, useEffect} from "react"

export function useNearPractice({rootMargin = "0px"} = {}){
  const [near, setIsNear] = useState(false)
  const el = useRef(null) 
  let observer; 
  

  useEffect(()=>{
      if(el.current === "undefined") return; 
     
    Promise.resolve(()=>{
        return window.IntersectionObserver !== "undefined" ? window.IntersectionObserver : import("intersection-observer")
    }).then(()=>{
        const observerElement = (entries, observe)=>{
          const { isIntersecting } = entries[0]
          if(isIntersecting){
              setIsNear(true)
              observe.disconnect()
          }
        }

       observer = new IntersectionObserver(observerElement, {rootMargin})
       observer.observe(document.getElementById("visor"))
    })
    return ()=> observer && observer.disconnect()

}, [el, rootMargin])

 return [near, el]
}
