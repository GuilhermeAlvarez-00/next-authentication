import { withSSRAuth } from '../utils/withSSRAuth'

export default function Metrics() {
  return (
    <div>
      <h2>Metricas</h2>
    </div>
  )
}

export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    return {
      props: {},
    }
  },
  {
    permissions: ['metrics.list'],
    roles: ['administrator'],
  }
)
