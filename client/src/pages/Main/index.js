import React from 'react'

import SocketContext from 'network/Socket'
import { useGet } from 'network/useNetwork'

import './main.css'
import CurrentQuestion from './CurrentQuestion'

function Main() {
  const [data, loading, error] = useGet('competition')
  const { socket } = React.useContext(SocketContext)
  const [competitionId, setCompetitionId] = React.useState(null)

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
  if (competitionId) {
    return <CurrentQuestion competitionId={competitionId} />
  }
  return <div />
}

export default Main
