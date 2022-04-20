import Router from 'next/router'
import { destroyCookie, parseCookies } from 'nookies'
import { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { AuthTokenError } from '../errors/AuthTokenError'
import { setupAPIClient } from '../services/api'
import { api } from '../services/apiClient'
import { withSSRAuth } from '../utils/withSSRAuth'

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

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get('/me')

  console.log(response.data)

  return {
    props: {},
  }
})
