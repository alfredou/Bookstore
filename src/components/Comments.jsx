import "./comments.css"
import React, {useEffect, useState} from 'react'
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {format} from "date-fns"
import { useBookContext } from "../context/DataBooksContext";
import { apiUrl } from "../services/api";

function Comments({ isbn13 }) {
  const [comments, setComments] = useState([])
  const {setProductRatingReview} = useBookContext()

  useEffect(()=>{
    apiUrl.get(`/comment/${isbn13}`, {
        withCredentials: true,
        Headers: {
          "Content-Type": "application/json"
         }
       }).then(res=>{
             setComments(res.data.comments) 
             
             if(res.data.productRating){
                  setProductRatingReview({rating: res.data.productRating, reviews: res.data.comments.length})
                }else{
                  setProductRatingReview({rating: 0, reviews: 0})
                }
       })
  },[isbn13])

  return (
    <div className="comments">
        <h2 className="comments__title">Reviews</h2>
        {comments?.length > 0 ? comments.map((comment, index)=>(
            <div key={comment._id} className="comments__container">
              <h3 className="comments__username">{comment.user.username}</h3>
              <span>
                {[...Array(5)].map((star, i)=>{
                    const currentRating = i + 1 
                return <FontAwesomeIcon 
                      key={currentRating}
                      className="comments__stars" 
                      icon={faStar} 
                      size="lg" 
                      color={currentRating <= comment.rating ? "#ffc107" : "#e4e5e9"}
                      />
              })}
              </span>
              <span className="comments__date">{format(new Date(comment.createdAt), 'dd-MM-yy')}</span>  
              <div className="comments__containerdesc">
                   <p>{comment.comment}</p>
              </div>  
            </div> 
         )) : <div className="comments__noreview">
                  <h2>No reviews to show</h2>
             </div> } 
    </div>
  )
}

export default Comments