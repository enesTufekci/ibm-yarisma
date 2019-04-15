import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Control from './Control'
import Creator from './Creator'
import Main from './Main'
import Home from './Home'
import Layout from 'components/Layout'

function Pages() {
  return (
    <Layout>
      <Switch>
        <Route path="/control" component={Control} />
        <Route path="/creator" component={Creator} />
        <Route path="/main" component={Main} />
        <Route component={Home} />
      </Switch>
    </Layout>
  )
}

export default Pages
