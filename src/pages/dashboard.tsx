import { Can } from '../components/Can'
import { useAuth } from '../contexts/AuthContext'
import { withSSRAuth } from '../utils/withSSRAuth'

export default function Dashboard() {
  const { user, signOut } = useAuth()

  return (
    <div>
      <h2>Dashboard: {user?.email}</h2>

      <button onClick={signOut}>SignOut</button>

      <Can permissions={['metrics.list']}>
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
