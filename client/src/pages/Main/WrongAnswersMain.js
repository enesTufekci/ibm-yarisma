import React from 'react'
import SocketContext from '../../network/Socket'

function WrongAnswersMain({ wrongAnswers }) {
  const { socket } = React.useContext(SocketContext)
  const [currentWrongAnswers, setCurrentWrongAnswers] = React.useState(
    wrongAnswers
  )
  const [showWrongAnswer, setShowWrongAnswer] = React.useState(0)

  const handleShowWrongAnswer = count => {
    setShowWrongAnswer(count)
    setTimeout(() => {
      setShowWrongAnswer(0)
    }, 5000)
  }

  socket.on('wrong-answers-update', updatedWrongAnswers => {
    console.log(currentWrongAnswers, updatedWrongAnswers)
    setCurrentWrongAnswers(updatedWrongAnswers)
    updatedWrongAnswers.forEach((wa, index) => {
      if (wa.count !== currentWrongAnswers[index].count) {
        handleShowWrongAnswer(wa.count)
      }
    })
  })

  return (
    <div className="wrong-answers-main-container">
      {showWrongAnswer > 0 &&
        [1, 2, 3].map((_, i) => (
          <div className={i < showWrongAnswer ? 'active' : ''}>X</div>
        ))}
    </div>
  )
}

export default WrongAnswersMain
