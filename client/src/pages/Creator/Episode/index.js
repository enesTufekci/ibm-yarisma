import React from 'react'
import { remove, update, isNil } from 'ramda'

import { useGet, useRest } from 'network/useNetwork'
import Container from 'components/Container'
import Button from 'components/Button'

import './episode.css'
import Question from './components/Question'

function Episode({ match }) {
  const [data, loading, error] = useGet(`episode/${match.params.id}`)
  const updateQuestions = useRest(`episode/${match.params.id}`)
  const [title, setTitle] = React.useState(null)
  const [questions, setQuestions] = React.useState(null)

  React.useEffect(() => {
    if (data && data.episode && !error) {
      setQuestions(JSON.parse(data.episode.questions))
      setTitle(data.episode.title)
    }
  }, [loading, data])

  const handleUpdateQuestions = index => question => {
    !isNil(index) && setQuestions(update(index, question, questions))
  }

  const handleAddQuestion = question => {
    setQuestions([...questions, question])
  }

  const handleDeleteQuestion = index => () => {
    setQuestions(remove(index, 1, questions))
  }

  const handlePostQuestions = async () => {
    const res = await updateQuestions({
      title,
      questions
    })

    if (res.ok) {
      alert('Sorular güncellendi')
    }
  }
  return (
    <Container>
      <div style={{ padding: '2rem 0' }}>
        {loading && <div>Loading...</div>}
        <div style={{ border: '1px solid white', textAlign: 'center' }}>
          <Button onClick={handlePostQuestions}>GÜNCELLE</Button>
        </div>
        {data && (
          <div className="episode-container">
            <div className="episode-title">{data.episode.title}</div>
            <div className="episode-questions">
              <h1>Sorular</h1>
              {questions &&
                questions.map((question, index) => (
                  <Question
                    onUpdate={handleUpdateQuestions(index)}
                    onDelete={handleDeleteQuestion(index)}
                    key={`q-${index}`}
                    question={question}
                  />
                ))}
              <Question onCreate={handleAddQuestion} question={null} />
            </div>
          </div>
        )}
        <div style={{ border: '1px solid white', textAlign: 'center' }}>
          <Button onClick={handlePostQuestions}>GÜNCELLE</Button>
        </div>
      </div>
    </Container>
  )
}

export default Episode
