import React from 'react'

import Button from 'components/Button'

import './wrong-answers.css'

function WrongAnswers({ wrongAnswers, handleUpdateWrongAnswers }) {
  return (
    <div className="wrong-answers">
      {wrongAnswers.map((w, i) => (
        <div key={i} className="wrong-answer">
          <h1>{w.team}</h1>
          <div className="wrong-answer-x">
            {[1, 2, 3].map((_, index) => (
              <Button
                key={`x-${_}`}
                onClick={handleUpdateWrongAnswers(i, index + 1)}
              >
                <span className={index < w.count ? 'active' : ''}>X</span>
              </Button>
            ))}
            <div>
              <Button onClick={handleUpdateWrongAnswers(i, 0)}>Sifirla</Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default WrongAnswers
