import Router from 'next/router'
import { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { api } from '../services/api'

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth()

  useEffect(() => {
    api
      .get('/me')
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <div>
      <h2>Dashboard: {user?.email}</h2>
    </div>
  )
}
