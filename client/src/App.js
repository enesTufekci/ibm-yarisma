import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Pages from './pages'
import { SocketProvider } from './network/Socket'

function App() {
  return (
    <BrowserRouter>
      <SocketProvider>
        <Pages />
      </SocketProvider>
    </BrowserRouter>
  )
}

export default App
