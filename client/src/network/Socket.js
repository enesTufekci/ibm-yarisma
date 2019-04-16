import React from 'react'
import io from 'socket.io-client'

const SocketContext = React.createContext()

export const SocketProvider = ({ children }) => {
  console.log(process.env.REACT_APP_WS)
  const socket = io(process.env.REACT_APP_WS)
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketContext
