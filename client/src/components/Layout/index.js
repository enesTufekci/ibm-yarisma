import React from 'react'

import './layout.css'

function Layout({ children, main }) {
  return <div className={`layout ${main ? 'main' : ''}`}>{children}</div>
}

export default Layout
