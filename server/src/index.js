import Express from 'express'
import io from 'socket.io'
import { Server } from 'http'
import bodyParser from 'body-parser'
import cors from 'cors'
import createConnection from './db'
import routes from './routes'
import createCache from './cache'

const app = Express()
const server = Server(app)
const socket = io(server)
console.log(socket.path())

server.listen(5555, async soc => {
  const connection = await createConnection()
  const cache = createCache()
  app.use(cors())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  app.get('/health-check', (req, res) => {
    res.json({ status: 'ok' })
  })

  socket.on('connection', _socket => {
    console.log(_socket.id, 'connected')
    _socket.on('test', data => {
      console.log('test', data)
    })
  })

  app.use(
    '/',
    routes({
      connection,
      cache,
      socket
    })
  )

  console.log('server is running')
})
