import React from 'react'

import { useGet, useRest } from 'network/useNetwork'
import Container from 'components/Container'
import Button from 'components/Button'
import Questions from './components/Questions'

function CurrentCompetition({ match, history }) {
  const [episode, setEpisode] = React.useState(null)
  const [competition, setCompetition] = React.useState(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0)
  const [data, loading, error] = useGet(`competition/${match.params.id}`)
  const endCompetition = useRest(`competition/${match.params.id}`, 'DELETE')

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

  const handleEndCompetition = async () => {
    const res = await endCompetition()
    if (res.ok) {
      history.push('/control')
    }
  }
  return (
    <Container>
      <div style={{ padding: '2rem 0' }}>
        <div
          style={{
            border: '1px solid white',
            marginBottom: '4rem',
            textAlign: 'center'
          }}
        >
          <Button onClick={handleEndCompetition}>Yarismayi bitir</Button>
        </div>
        {episode && (
          <Questions
            currentQuestionIndex={currentQuestionIndex}
            competition={competition}
            questions={JSON.parse(episode.questions)}
          />
        )}
      </div>
    </Container>
  )
}

export default CurrentCompetition
