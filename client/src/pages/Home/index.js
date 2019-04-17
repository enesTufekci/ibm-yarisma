import React from 'react'
import { Link } from 'react-router-dom'

import Container from 'components/Container'
import Layout from 'components/Layout'

import './home.css'

function Home() {
  return (
    <Layout>
      <Container>
        <div className="home-container-items">
          <div className="home-container-item">
            <Link to="/main">Yarisma Ekrani</Link>
          </div>
          <div className="home-container-item">
            <Link to="/control">Reji Ekrani</Link>
          </div>
          <div className="home-container-item">
            <Link to="/creator">Yarisma Yarat</Link>
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export default Home
