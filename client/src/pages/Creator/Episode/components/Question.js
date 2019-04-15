import React from 'react'
import { update, isNil, remove } from 'ramda'

import Input from 'components/Input'
import Button from 'components/Button'

import './question.css'
import QuestionAnswer from './QuestionAnswer'

function Question({ question, onUpdate, onCreate, onDelete }) {
  const [text, setText] = React.useState((question && question.text) || '')

  const handleUpdateText = event => {
    const { value } = event.target
    setText(value)
    onUpdate &&
      onUpdate({
        text: value,
        answers: question.answers
      })
  }

  const handleCreate = () => {
    const _text = text
    onCreate({
      text: _text,
      answers: []
    })
    setText('')
  }

  const handleUpdateAnswers = index => answer => {
    console.log(index, answer, question.answers)
    if (!isNil(index)) {
      const answers = update(index, answer, question.answers)
      onUpdate &&
        onUpdate({
          text,
          answers
        })
    }
  }

  const handleCreateAnswer = answer => {
    let _answers = question.answers
    _answers[question.answers.length] = answer

    onUpdate({
      text,
      answers: _answers
    })
  }

  const handleAnswerDelete = index => () => {
    onUpdate({
      text,
      answers: remove(index, 1, question.answers)
    })
  }

  const handleDelete = () => {
    onDelete && onDelete()
  }

  return (
    <div className="question-container">
      <div className="question-text">
        <Input value={text} onChange={handleUpdateText} />
      </div>
      {question && (
        <div>
          <h3>Cevaplar</h3>
          <div className="question-answers">
            {question.answers.map((answer, index) => (
              <QuestionAnswer
                key={`a-${index}`}
                onUpdate={handleUpdateAnswers(index)}
                onDelete={handleAnswerDelete(index)}
                answer={answer}
              />
            ))}
            <QuestionAnswer onCreate={handleCreateAnswer} />
          </div>
        </div>
      )}

      <div className="question-create">
        <Button type="button" onClick={onCreate ? handleCreate : handleDelete}>
          {onCreate ? 'Ekle' : 'Sil'}
        </Button>
      </div>
    </div>
  )
}

export default Question
