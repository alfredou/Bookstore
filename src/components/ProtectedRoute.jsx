import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

function ProtectedRoute({ redirectTo='/'}) {
  const {user} = useContext(AuthContext)

  if(!user){
      return <Navigate to={redirectTo} replace/>
  }

  return <Outlet/>
}

export default ProtectedRoute