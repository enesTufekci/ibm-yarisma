import React from 'react'

import { useGet, useRest } from 'network/useNetwork'
import Layout from 'components/Layout'
import Container from 'components/Container'
import Button from 'components/Button'
import Questions from './components/Questions'
import WrongAnswers from './components/WrongAnswers'
import CurrentPoints from './components/CurrentPoints'

function CurrentCompetition({ match, history }) {
  const [episode, setEpisode] = React.useState(null)
  const [competition, setCompetition] = React.useState(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0)
  const [wrongAnswers, setWrongAnswers] = React.useState([])
  const [teams, setTeams] = React.useState([])
  const [data, loading, error] = useGet(`competition/${match.params.id}`)
  const endCompetition = useRest(`competition/${match.params.id}`, 'DELETE')
  const updateWrongAnswers = useRest('competition/wrong-answers')

  React.useEffect(() => {
    handleSet()
  }, [data, loading])

  const handleSet = () => {
    if (data && !error) {
      if (data.competition) {
        setCompetition(data.competition)
        data.competition.teams && setTeams(JSON.parse(data.competition.teams))
      }
      if (data.episode) {
        setEpisode(data.episode)
      }

      if (data.currentQuestionIndex) {
        setCurrentQuestionIndex(JSON.parse(data.currentQuestionIndex))
      }

      if (data.competition.wrongAnswers) {
        setWrongAnswers(JSON.parse(data.competition.wrongAnswers))
      }
    }
  }

  const handleUpdateWrongAnswers = (index, count) => async () => {
    const updatedWrongAnswers = wrongAnswers.map((w, i) => {
      if (i === index) {
        return { ...w, count }
      }
      return w
    })
    setWrongAnswers(updatedWrongAnswers)
    try {
      const res = await updateWrongAnswers({
        wrongAnswers: updatedWrongAnswers
      })
      console.log(await res.json())
    } catch (error) {
      console.log(error)
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
        <div>
          <h1 style={{ textAlign: 'center' }}>Puan Durumu</h1>
          <CurrentPoints
            teams={teams}
            currentPoints={teams.map(team => Number(team.points))}
          />
        </div>
        <div style={{ border: '1px solid white' }}>
          <h1 style={{ textAlign: 'center' }}>Yanlis Cevaplar</h1>
          <WrongAnswers
            handleUpdateWrongAnswers={handleUpdateWrongAnswers}
            wrongAnswers={wrongAnswers}
          />
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
