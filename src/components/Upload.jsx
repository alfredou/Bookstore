import './upload.css'
import useImageUpload from '../hooks/useImageUpload'
import toast, { Toaster } from 'react-hot-toast';
import { useContext } from "react"
import { AuthContext } from '../context/AuthContext';
import { apiUrl } from '../services/api';

const notify = () => toast.success('Image updated sucessfully');
const uploadError = ()=> toast.error('Upload image before update')
const otherError = ()=> toast.error('An Error has ocurred')

const Upload = () => {
  const { user, dispatch } = useContext(AuthContext)
  const {
    handleDragLeave,
    handleDragOver,
    handleDrop,
    showFiles,
    active,  
    image
  } = useImageUpload()

  const handleFileChange = (e)=>{
       let files = e.target.files
       showFiles(files)
  }
  
  const updateProfileImage = ()=>{
    if(image.length == 0){
      uploadError()
    }
    else{
      apiUrl.patch(`/user/updateUser/${user._id}`, {img: image}, {
        withCredentials: true // Habilitar el manejo de cookies en Axios
                }).then((res) => {
                  if(res.data){
                    dispatch({ type: "LOGIN_SUCESS", payload: res.data })
                    notify()
                  }else{
                    otherError()
                  }
            })
      }
}

  return (
    <div className="uploads-container">
         <Toaster
             position="bottom-right"
             reverseOrder={false}
           />
      <div   onDrop={handleDrop}
             onDragOver={handleDragOver}
             onDragLeave={handleDragLeave}
             className={active ? 'uploads-container01 uploads-container01_active' : "uploads-container01"} 
             id="uploads-container1">
             
        <div className="uploads-container02">
          <span className="uploads-text">Choose files</span>
          <span>or drag and drop</span>
        </div>
        <div className="file-select" id="src-file1">
           <input onChange={handleFileChange} type="file" name="src-file1" hidden multiple></input>
        </div>
      </div>
      {(image.length > 0) && <span className="uploads__loaded">{image.length} loaded sucessfully</span>}
      <button className="upload__image" onClick={updateProfileImage}>Update image</button>
    </div>
  )
}

export default Upload
