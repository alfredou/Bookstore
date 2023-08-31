import "./rate.css"
import React, {useState} from 'react'
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../services/api";

const notify = () => toast.success('Comment Sent Sucessfully');
const submitError = ()=> toast.error('You can not submit without rating and comment')

function Rate({title, isbn13}) {
    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)
    const [comment, setComment] = useState('')
    const { user } = useContext(AuthContext)
    const [isSending, setIsSending] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (e)=>{
         e.preventDefault();
         setIsSending(true)
      
        if(!user){
            navigate('/register')
         }
         const commentObj = {
            bookisbn: isbn13,
            rating: rating,
            comment: comment,
            userId: user._id,
         } 
      
      if(comment == '' && rating == null){
            submitError()
            setIsSending(false)
      }
      else{

        if(commentObj){
          apiUrl.post("/comment/", commentObj, {
              withCredentials: true,
              Headers: {
                "Content-Type": "application/json"
              }
            }).then(res=>{
                 if(res.data){
                      setIsSending(false)
                      notify()
                      setRating(null)
                      setHover(null)
                      setComment('')
                    }
                  })
                }  
  
              }
            }
              
  return (
    <div className="rate">
      <Toaster
          position="bottom-right"
          reverseOrder={false}
       />
      <div className="rating">
        <h3>WRITE A CUSTOMER REVIEW</h3>
        <label className="rating__label">Rating:</label>
        <div className="rating__container">
            {[...Array(5)].map((star, i)=>{
                const currentRating = i + 1 
                return (
                <label key={i}>
                    <input type="radio" name="rating" value={currentRating} onClick={()=> setRating(currentRating)}/>
                    <FontAwesomeIcon 
                       className="star" 
                       icon={faStar} 
                       size="lg" 
                       color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                       onMouseEnter={()=> setHover(currentRating)}
                       onMouseLeave={()=> setHover(null)}
                       />
                </label>)
            })}
            {rating && <p>Your rating is: {rating}</p>}
        </div>
           
            <form onSubmit={handleSubmit} className="comment__container">
                <label className="comment__label">Comment:</label>
                <textarea className="comment__textarea" name="comment" id="comment" cols="30" rows="10" onChange={(e)=> setComment(e.target.value)} value={comment}></textarea>
                <button disabled={isSending} className="comment__button">{user ? 'SUBMIT' : 'LOGIN TO SUBMIT'}</button>
            </form>
      </div>
    </div>
  )
}

export default Rate