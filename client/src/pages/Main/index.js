import React from 'react'

import SocketContext from 'network/Socket'
import { useGet } from 'network/useNetwork'
import Competition from './Competition'

import './main.css'

function Main() {
  const [data, loading, error] = useGet('competition')
  const { socket } = React.useContext(SocketContext)
  const [competition, setCompetition] = React.useState(null)

  React.useEffect(() => {
    if (data && data.competition && !error) {
      setCompetition(data.competition)
    }
  }, [data, loading])

  socket.on(
    'competition-start',
    ({ competitionId, episodeId, currentQuestionIndex }) => {
      console.log(competitionId, episodeId, currentQuestionIndex)
      setCompetition({ competitionId, episodeId })
    }
  )

  if (competition) {
    return <Competition competitionId={competition._id} />
  }
  return <div>Main</div>
}

export default Main
