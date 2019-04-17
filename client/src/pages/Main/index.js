import React from 'react'

import Layout from 'components/Layout'
import SocketContext from 'network/Socket'
import { useGet } from 'network/useNetwork'

import './main.css'
import CurrentQuestion from './CurrentQuestion'
import Points from './Points'

function Main() {
  const [data, loading, error] = useGet('competition')
  const { socket } = React.useContext(SocketContext)
  const [competitionId, setCompetitionId] = React.useState(null)
  const [currentPoints, setCurrentPoints] = React.useState(null)

  React.useEffect(() => {
    if (data && data.competition && !error) {
      setCompetitionId(data.competition._id)
    }
  }, [data, loading, competitionId])

  socket.on(
    'competition-start',
    ({ competitionId, episodeId, currentQuestionIndex }) => {
      console.log(competitionId, episodeId, currentQuestionIndex)
      setCompetitionId(competitionId)
    }
  )

  socket.on('competition-cancelled', () => {
    setCompetitionId(null)
  })

  socket.on('show-points', points => {
    setCurrentPoints(points)
  })

  if (competitionId) {
    return (
      <Layout main>
        {currentPoints ? (
          <Points teams={currentPoints} />
        ) : (
          <CurrentQuestion competitionId={competitionId} />
        )}
      </Layout>
    )
  }
  return <Layout main />
}

export default Main
