import "./bookSkeleton.css"
import React from 'react'

function BookSkeleton() {
  return (
           <div className="books__skeleton">
                <div className="book__skeleton-img skeleton-animation"></div>
                <div className="books___skeleton-texts">
                   <div className="booksskeleton__title skeleton-animation"></div>
                   <div className="booksskeleton__isbn skeleton-animation"></div>
                   <div className="booksskeleton__price skeleton-animation"></div>
                </div>
            </div>
  )
}

export default BookSkeleton