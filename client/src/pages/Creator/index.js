import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Layout from 'components/Layout'
import Episodes from './Episodes'
import Episode from './Episode'

function Creator() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/creator/" component={Episodes} />
        <Route exact path="/creator/:id" component={Episode} />
      </Switch>
    </Layout>
  )
}

export default Creator
