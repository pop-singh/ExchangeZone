import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div style={{textAlign:'center', padding:'80px 16px'}}>
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/">Go Home</Link>
    </div>
  )
}

export default NotFound