import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Layout from 'components/Layout'
import EpisodeSelect from './EpisodeSelect'
import CurrentCompetition from './CurrentCompetition'

function Control() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/control/:id" component={CurrentCompetition} />
        <Route path="/control" component={EpisodeSelect} />
      </Switch>
    </Layout>
  )
}

export default Control
