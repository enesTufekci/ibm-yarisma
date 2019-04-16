import React from 'react'

import { useGet } from 'network/useNetwork'
import SocketContext from 'network/Socket'
import Container from 'components/Container'
import Answers from './Answers'

function CurrentQuestion({ competitionId }) {
  const { socket } = React.useContext(SocketContext)
  const [episode, setEpisode] = React.useState(null)
  const [questions, setQuestions] = React.useState([])
  const [competition, setCompetition] = React.useState(null)
  const [correctAnswers, setCorrectAnswers] = React.useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(null)

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

  if (questions[currentQuestionIndex]) {
    return (
      <Container>
        <div className="question-text">
          <h1>{questions[currentQuestionIndex].text}</h1>
        </div>
        <Answers
          answers={questions[currentQuestionIndex].answers}
          correctAnswers={correctAnswers[currentQuestionIndex]}
        />
      </Container>
    )
  }
  return <div>{}</div>
}

export default CurrentQuestion
