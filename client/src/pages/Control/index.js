import React from 'react'
import { Switch, Route } from 'react-router-dom'

import EpisodeSelect from './EpisodeSelect'
import CurrentCompetition from './CurrentCompetition'

function Control() {
  return (
    <Switch>
      <Route exact path="/control/:id" component={CurrentCompetition} />
      <Route path="/control" component={EpisodeSelect} />
    </Switch>
  )
}

export default Control
