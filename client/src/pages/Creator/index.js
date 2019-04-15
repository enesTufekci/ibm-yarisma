import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Episodes from './Episodes'
import Episode from './Episode'

function Creator() {
  return (
    <Switch>
      <Route exact path="/creator/" component={Episodes} />
      <Route exact path="/creator/:id" component={Episode} />
    </Switch>
  )
}

export default Creator
