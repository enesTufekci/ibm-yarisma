import React from 'react'
import Question from './Question'

import Button from 'components/Button'
import { useRest } from 'network/useNetwork'

import './questions.css'

function Questions({ competition, questions, currentQuestionIndex }) {
  const [questionIndex, setQuestionIndex] = React.useState(currentQuestionIndex)
  const [correctAnswers, setCorrectAnswers] = React.useState(
    JSON.parse(competition.correctAnswers)
  )
  const updateCurrentQuestionIndex = useRest('question-index')

  const handleUpdateCurrentQuestionIndex = currentQuestionIndex => async () => {
    const res = await updateCurrentQuestionIndex({ currentQuestionIndex })
    const { currentQuestionIndex: index } = await res.json()
    setQuestionIndex(index)
  }

  const handleUpdateCorrectAnswers = data => setCorrectAnswers(data)

  return (
    <div className="questions-container">
      <div className="  ">
        {questions.map((question, index) => {
          const active = index === questionIndex
          return (
            <Button
              key={`e-${index}`}
              onClick={handleUpdateCurrentQuestionIndex(index)}
            >
              <span style={{ backgroundColor: active && '#0575e6' }}>
                {index + 1} - {question.text}
              </span>
            </Button>
          )
        })}
      </div>
      <div className="question-current">
        <Question
          onCorrectAnswersUpdate={handleUpdateCorrectAnswers}
          competitionId={competition._id}
          teams={JSON.parse(competition.teams)}
          correctAnswers={correctAnswers}
          question={questions[questionIndex]}
          questionIndex={questionIndex}
        />
      </div>
    </div>
  )
}

export default Questions
