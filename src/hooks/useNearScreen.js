import { useState, useRef, useEffect } from "react";

export const useNearScreen = ({ rootMargin = "0px" } = {}) => {
  const [isNear, setIsNear] = useState(false);
  const el = useRef(null);
  
  useEffect(
    function() {
      if (typeof el.current === "undefined") return;

      let observer;
      Promise.resolve(
        typeof window.IntersectionObserver !== "undefined"
          ? window.IntersectionObserver
          : import("intersection-observer")
      ).then(() => {
        //este callback se va a ejecutar cada vez que detecte cambios en los elementos que esta observando
        const onIntersect = (entries, observer) => {
          const { isIntersecting } = entries[0];
          if (isIntersecting) {
            //hace que la imagen se vea al ponerla en true cuando se intersecta
            setIsNear(true);
            //deja de observar los elementos que estaba observando
            observer.disconnect();
            //observer.unobserve(entries[0].target)
          }
        };
          //recibe 2 argumentos el 1ero una funcion que actua como callback
          //el 2do argumento es un objeto de opciones que nos permite especificar el root es decir que elemento contenedor va a realizar la observacion asi como determinadas caracteristicas como por ejemplo el threshold
          //el threshold es decir cuanto porcentaje queremos establecer para que se considere que un elemento esta intersectando
          //el rootMargin es la distancia que tiene a la que hará interseccion por ejemplo con un rootMargin: 100px el elemento hara interseccion despues de 100px 
        observer = new window.IntersectionObserver(onIntersect, { rootMargin });
        //podemos observar elementos mediante el metodo observe al que le pasamos un elemento html que empezaremos a observar y cada vez que se produzca algo notificable dentro de la observacion se ejecutara el callback para decirnos el estado de ese observe
        observer.observe(el.current);
        //console.log("el", el.current)
      });
        //cuando se desmonte el hook dejara de observar esos elementos que estaba observando
      return () => observer && observer.disconnect();
    },
    [el, rootMargin]
  );

  return [isNear, el];
};
