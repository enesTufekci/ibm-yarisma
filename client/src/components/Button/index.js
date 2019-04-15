import React from 'react'

import './button.css'

function Button({ children, ...rest }) {
  return <button {...rest}>{children}</button>
}

export default Button
