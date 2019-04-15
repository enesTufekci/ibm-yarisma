import React from 'react'

import './answer.css'

function Answer({ text, points, index, show }) {
  return (
    <div className="answer-pill">
      <div className="answer-pill-items">
        {show ? (
          <React.Fragment>
            <div className="answer-text">{text}</div>
            <div className="answer-points">{points}</div>
          </React.Fragment>
        ) : (
          <div className="answer-index">
            <div className="answer-index-inner">{index}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Answer
