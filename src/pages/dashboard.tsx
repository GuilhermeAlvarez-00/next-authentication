import Router from 'next/router'
import { destroyCookie, parseCookies } from 'nookies'
import { useEffect } from 'react'
import { Can } from '../components/Can'
import { useAuth } from '../contexts/AuthContext'
import { AuthTokenError } from '../errors/AuthTokenError'
import { useCan } from '../hooks/useCan'
import { setupAPIClient } from '../services/api'
import { api } from '../services/apiClient'
import { withSSRAuth } from '../utils/withSSRAuth'

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div>
      <h2>Dashboard: {user?.email}</h2>

      <Can permissions={['metric.list']}>
        <div>Metricas</div>
      </Can>
    </div>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {},
  }
})
