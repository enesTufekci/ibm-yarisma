import React from 'react'

import { useGet } from 'network/useNetwork'
import Container from 'components/Container'
import Questions from './components/Questions'

function CurrentCompetition({ match }) {
  const [episode, setEpisode] = React.useState(null)
  const [competition, setCompetition] = React.useState(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0)
  const [data, loading, error] = useGet(`competition/${match.params.id}`)

  React.useEffect(() => {
    handleSet()
  }, [data, loading])

  const handleSet = () => {
    if (data && !error) {
      if (data.competition) {
        setCompetition(data.competition)
      }
      if (data.episode) {
        setEpisode(data.episode)
      }

      if (data.currentQuestionIndex) {
        setCurrentQuestionIndex(data.currentQuestionIndex)
      }
    }
  }

  return (
    <Container>
      {episode && (
        <Questions
          currentQuestionIndex={currentQuestionIndex}
          competition={competition}
          questions={JSON.parse(episode.questions)}
        />
      )}
    </Container>
  )
}

export default CurrentCompetition
