import React from 'react'
import { isNil } from 'ramda'

import Answer from 'components/Answer/Answer'
import './answers.css'

function Answers({ answers, correctAnswers }) {
  const answersToDisplay = answers.map((answer, index) => ({
    ...answer,
    show: correctAnswers && !isNil(correctAnswers[index])
  }))
  console.log(answers)
  return (
    <div className="answers-container">
      {answersToDisplay.map((answer, index) => (
        <div className="answer-container" key={`a-${index}`}>
          <Answer
            text={answer.text}
            show={answer.show}
            index={index + 1}
            points={Number(answer.points)}
          />
        </div>
      ))}
    </div>
  )
}

export default Answers
