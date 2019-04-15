import React from 'react'

import CurrentQuestion from './CurrentQuestion'

function Competition({ competitionId }) {
  if (competitionId) {
    return <CurrentQuestion competitionId={competitionId} />
  }
  return <div>questions</div>
}

export default Competition
