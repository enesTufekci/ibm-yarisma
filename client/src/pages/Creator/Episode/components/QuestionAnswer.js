import React from 'react'

import Input from 'components/Input'
import Button from 'components/Button'

import './question-answer.css'

function QuestionAnswer({ answer, onUpdate, onCreate, onDelete }) {
  const [text, setText] = React.useState((answer && answer.text) || '')
  const [points, setPoints] = React.useState((answer && answer.points) || 0)

  const handleUpdateText = event => {
    const { value } = event.target

    setText(value)
    onUpdate &&
      onUpdate({
        text: value,
        points
      })
  }

  const handleUpdatePoints = event => {
    const { value } = event.target

    setPoints(value)
    onUpdate &&
      onUpdate({
        text,
        points: value
      })
  }

  const handleCreate = () => {
    if (onCreate) {
      onCreate({
        text,
        points
      })
      setText('')
      setPoints(0)
    }
  }

  const handleDelete = () => {
    onDelete && onDelete()
  }

  return (
    <div className="question-answer-container">
      <div className="question-answer-title">
        <Input name="text" value={text} onChange={handleUpdateText} />
      </div>
      <div className="question-answer-points">
        <Input
          type="number"
          name="points"
          value={points}
          onChange={handleUpdatePoints}
        />
      </div>
      <div className="question-answer-action">
        <Button onClick={onCreate ? handleCreate : handleDelete}>
          {onCreate ? 'Ekle' : 'Sil'}
        </Button>
      </div>
    </div>
  )
}

export default QuestionAnswer
