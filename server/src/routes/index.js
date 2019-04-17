import { Router } from 'express'

import episodeRoutes from './episode'
import competitionRoutes from './competition'

function routes(context) {
  const router = Router()

  router.use('/episode', episodeRoutes(context))
  router.use('/competition', competitionRoutes(context))
  router.get('/cache', async (_, res) => {
    res.json(context.cache.all())
  })

  router.post('/question-index', (req, res) => {
    const { currentQuestionIndex } = req.body
    const x = context.cache.set('currentQuestionIndex', currentQuestionIndex)
    context.socket.emit('question-index-updated', currentQuestionIndex)
    res.json({ ok: true, currentQuestionIndex: x })
  })

  return router
}

export default routes
