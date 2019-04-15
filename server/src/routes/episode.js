import { Router } from 'express'
import Episode from '../modals/Episode'

function episodeRoutes(context) {
  const router = Router()

  router.get('/', async (_, res) => {
    try {
      const episodes = await Episode.find()
      res.json({ ok: true, episodes })
    } catch (error) {
      res.json({ ok: false })
    }
  })

  router.get('/:_id', async (req, res) => {
    try {
      const { _id } = req.params
      const episode = await Episode.findById(_id)
      res.json({ ok: true, episode })
    } catch (error) {
      res.json({ ok: false })
    }
  })

  router.post('/', async (req, res) => {
    try {
      const { title } = req.body
      if (!title) {
        return res.json({ ok: false, error: 'Title is required' })
      }
      const episode = await Episode.create({
        title,
        questions: JSON.stringify([])
      })
      res.json({ ok: true, episode })
    } catch (error) {
      res.json({ ok: false, error })
    }
  })

  router.post('/:_id', async (req, res) => {
    try {
      const { _id } = req.params
      const { questions, title } = req.body
      const episode = await Episode.findOneAndUpdate(
        { _id },
        {
          title,
          questions: JSON.stringify(questions)
        }
      )

      res.json({ ok: true, episode })
    } catch (error) {
      res.json({ ok: false, error })
    }
  })

  router.delete('/', async (req, res) => {
    try {
      const { episodeId } = req.body
      const result = await Episode.findByIdAndDelete(episodeId)
      res.json({ ok: true, result })
    } catch (error) {
      res.json({ ok: false, error })
    }
  })

  router.get('/active', async (_, res) => {
    const activeEpisodeId = context.cache.get('activeEpisodeId')
    if (activeEpisodeId) {
      const episode = await Episode.findById(activeEpisodeId)
      if (episode) {
        return res.json(episode)
      }
    }
    return res.send('null')
  })

  router.post('/active', (req, res) => {
    const { cache } = context
    const { episodeId } = req.body
    if (episodeId) {
      cache.update('activeEpisodeId', episodeId)
      res.json({ ok: true })
    } else {
      res.json({ ok: false, message: 'Episode id is required' })
    }
  })

  return router
}

export default episodeRoutes
