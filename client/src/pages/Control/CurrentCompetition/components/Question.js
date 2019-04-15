import React from 'react'
import { isNil } from 'ramda'
import { useRest } from 'network/useNetwork'
import Button from 'components/Button'

function mapAnswers(answers, correctAnswers) {
  return answers.map((answer, index) => ({
    ...answer,
    answeredBy: (correctAnswers[index] && correctAnswers[index].team) || null
  }))
}

function Question({
  teams,
  question,
  correctAnswers,
  competitionId,
  questionIndex,
  onCorrectAnswersUpdate
}) {
  const updateCorrectAnswers = useRest(`competition/${competitionId}`)
  const [answers, setAnswers] = React.useState([])

  React.useEffect(() => {
    setAnswers(
      mapAnswers(question.answers, correctAnswers[questionIndex] || [])
    )
    console.log(correctAnswers[questionIndex])
  }, [questionIndex])

  const handleUpdateCorrectAnswers = (index, team) => async () => {
    let _correctAnswers = correctAnswers
    if (isNil(_correctAnswers[questionIndex])) {
      _correctAnswers[questionIndex] = []
    }
    _correctAnswers[questionIndex][index] = team ? { team } : null

    setAnswers(mapAnswers(question.answers, _correctAnswers[questionIndex]))

    onCorrectAnswersUpdate(_correctAnswers)

    const res = await updateCorrectAnswers({ correctAnswers: _correctAnswers })
    console.log(await res.json())
  }

  return (
    <div>
      <div>
        <h1 style={{ textAlign: 'center' }}>{question.text}</h1>
      </div>
      <div className="question-answers">
        {answers.map((answer, index) => (
          <div className="question-answer" key={`answer-${index}`}>
            <div className="question-answer-text">
              <span>{answer.text}</span> <strong>({answer.points})</strong>
            </div>
            <div className="question-answer-actions">
              <Button
                style={{
                  border:
                    answer.answeredBy === teams[0].title && '1px solid white'
                }}
                onClick={handleUpdateCorrectAnswers(index, teams[0].title)}
              >
                {teams[0].title}
              </Button>
              <Button
                style={{
                  border:
                    answer.answeredBy === teams[1].title && '1px solid white'
                }}
                onClick={handleUpdateCorrectAnswers(index, teams[1].title)}
              >
                {teams[1].title}
              </Button>
              <Button
                style={{
                  border: answer.answeredBy === null
                }}
                onClick={handleUpdateCorrectAnswers(index)}
              >
                Iptal Et
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Question
