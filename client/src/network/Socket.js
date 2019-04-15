import React from 'react'
import io from 'socket.io-client'

const SocketContext = React.createContext()

export const SocketProvider = ({ children }) => {
  const socket = io(':5555')
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketContext
