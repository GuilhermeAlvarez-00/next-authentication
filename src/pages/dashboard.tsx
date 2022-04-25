import Router from 'next/router'
import { destroyCookie, parseCookies } from 'nookies'
import { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { AuthTokenError } from '../errors/AuthTokenError'
import { useCan } from '../hooks/useCan'
import { setupAPIClient } from '../services/api'
import { api } from '../services/apiClient'
import { withSSRAuth } from '../utils/withSSRAuth'

export default function Dashboard() {
  const { user } = useAuth()

  const userCanSeeMetrics = useCan({
    permissions: ['metrics.list'],
  })

  return (
    <div>
      <h2>Dashboard: {user?.email}</h2>

      {userCanSeeMetrics && <div>Metricas</div>}
    </div>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {},
  }
})
