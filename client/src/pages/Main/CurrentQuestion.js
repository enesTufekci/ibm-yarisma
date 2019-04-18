import React from 'react'
import { isNil } from 'ramda'

import { useGet } from 'network/useNetwork'
import SocketContext from 'network/Socket'
import Container from 'components/Container'
import Answers from './Answers'
import WrongAnswersMain from './WrongAnswersMain'
import Total from './Total'
import Points from './Points'

function CurrentQuestion({ competitionId }) {
  const { socket } = React.useContext(SocketContext)
  const [episode, setEpisode] = React.useState(null)
  const [questions, setQuestions] = React.useState([])
  const [competition, setCompetition] = React.useState(null)
  const [wrongAnswers, setWrongAnswers] = React.useState([])
  const [correctAnswers, setCorrectAnswers] = React.useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(null)
  const [teams, setTeams] = React.useState(null)

  const [data, loading, error] = useGet(`competition/${competitionId}`)

  React.useEffect(() => {
    if (data && !error) {
      if (data.competition) {
        setCompetition(data.competition)
        setCorrectAnswers(JSON.parse(data.competition.correctAnswers))
      }
      if (data.episode) {
        setEpisode(data.episode)
      }

      if (data.currentQuestionIndex !== null) {
        setCurrentQuestionIndex(data.currentQuestionIndex || 0)
      }

      if (data.competition.wrongAnswers) {
        setWrongAnswers(JSON.parse(data.competition.wrongAnswers))
      }
      if (episode) {
        const { questions } = episode
        setQuestions(JSON.parse(questions))
      }
    }
  }, [data, loading, competitionId])

  socket.on('question-index-updated', index => {
    setCurrentQuestionIndex(index)
  })

  socket.on('answers-update', correctAnswers => {
    setCorrectAnswers(correctAnswers)
  })

  socket.on('toggle-points', data => {
    const { show } = data.show
    const { teams } = data
    setTeams(show ? teams : null)
  })

  if (questions[currentQuestionIndex]) {
    const total = questions[currentQuestionIndex].answers
      .map((answer, index) => {
        return correctAnswers &&
          correctAnswers[currentQuestionIndex] &&
          !isNil(correctAnswers[currentQuestionIndex][index])
          ? Number(answer.points)
          : 0
      })
      .reduce((acc, next) => acc + next)

    return teams ? (
      <Points teams={teams} />
    ) : (
      <Container>
        <Total total={total} />
        <div className="question-text">
          <h1
            style={{
              fontSize: `${Math.max(
                100 / questions[currentQuestionIndex].text.length,
                2
              )}rem`
            }}
          >
            {questions[currentQuestionIndex].text}
          </h1>
        </div>
        <Answers
          answers={questions[currentQuestionIndex].answers}
          correctAnswers={correctAnswers[currentQuestionIndex]}
        />
        <WrongAnswersMain wrongAnswers={wrongAnswers} />
      </Container>
    )
  }
  return <div>{}</div>
}

export default CurrentQuestion
