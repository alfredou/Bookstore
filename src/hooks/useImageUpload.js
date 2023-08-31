import { useState, useEffect } from "react";

function useImageUpload() {
  const [image, setImage] = useState([]);
  const [active, setActive] = useState(false);
  
  const handleDrop=(e)=> {
    e.preventDefault();
    const files = e.dataTransfer.files;
    showFiles(files)
    setActive(false)
  }
 
 const showFiles = (files)=>{
     if(files.length === undefined){
       processFile(files)
     }else{
       for(const file of files){
         processFile(file)
       }
     }
 }
 const processFile = (file)=>{
   let docType = file.type

  const validExtensions = ["image/jpeg", "image/jpg", "image/png", "image/gif"]; 

  if(validExtensions.includes(docType)){
      const fileReader = new FileReader()
      const id = `file-${Math.random().toString(32).substring(7)}`
      
      fileReader.addEventListener("load", (e)=>{
         const fileUrl = fileReader.result
         
         //setImage((prev)=> [...prev, fileUrl])
         setImage([fileUrl])
      })
      //función de devolución de llamada que se ejecuta cuando el archivo ha sido leído. 
      fileReader.readAsDataURL(file)
     //window.alert("archivo valido")
   }else{
    window.alert("no es un archivo valido")
   }
 }
  
  const handleDragOver=(event)=> {
    event.preventDefault();
    setActive(true)
  }

  const handleDragLeave=(event)=>{
    event.preventDefault();
    setActive(false)
  }

  return {
    handleDragLeave,
    handleDragOver,
    handleDrop,
    showFiles,
    active,  
    image
  }
}  
  export default useImageUpload;
  