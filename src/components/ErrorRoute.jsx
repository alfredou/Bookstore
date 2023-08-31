import "./errorroute.css"
import React from 'react'

function ErrorRoute() {
  return (
    <div className="error__message">
        <div>
           <h2>Error 404 😑</h2>
           <p>This route doesn't exist</p>
        </div>
    </div>
  )
}

export default ErrorRoute