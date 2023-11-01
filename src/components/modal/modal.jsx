import React from 'react'
import { createPortal } from 'react-dom'
import "./modal.css"

function modal({children, setShowModal}) {

  const handleShowModal = (e)=>{
        if(e.target.id === "modal__container"){
             setShowModal(false)
        } 
  }

  return (
    <div id="modal__container" className="modal" onClick={handleShowModal}>{children}</div>
  )
}

export function ModalPortal({children, setShowModal}){
  return <>
      {createPortal(
           modal({children, setShowModal}),
           document.getElementById("root")
        )}   
     </>
}

