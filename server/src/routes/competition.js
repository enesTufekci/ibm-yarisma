import { Router } from 'express'
import Competition from '../modals/Competition'
import Episode from '../modals/Episode'

function competitionRoutes({ cache, socket }) {
  const router = Router()

  router.get('/', async (_, res) => {
    const competitionId = cache.get('competitionId')
    if (competitionId) {
      try {
        const competition = await Competition.findById(competitionId)
        if (competition) {
          return res.json({ ok: true, competition })
        }
        return res.json({ ok: false })
      } catch (error) {
        return res.json({ ok: false, error: JSON.stringify(error) })
      }
    } else {
      res.json({ ok: true, competition: null })
    }
  })

  router.get('/:_id', async (req, res) => {
    const { _id } = req.params
    try {
      const competition = await Competition.findById(_id)
      if (competition) {
        const episode = await Episode.findById(competition.episodeId)
        return res.json({
          ok: true,
          competition,
          episode,
          currentQuestionIndex: cache.get('currentQuestionIndex')
        })
      }
      return res.json({
        ok: false,
        error: { message: 'Competition or Epsidode not found' }
      })
    } catch (error) {
      return res.json({ ok: false, error: JSON.stringify(error) })
    }
  })

  router.post('/', async (req, res) => {
    const { teams, episodeId } = req.body
    try {
      const competition = await Competition.create({
        teams: JSON.stringify(teams),
        episodeId
      })
      if (competition) {
        cache.set('competitionId', competition._id)
        cache.set('activeEpisodeId', episodeId)
        cache.set('currentQuestionIndex', 0)
        socket.emit('competition-start', {
          episodeId,
          competitionId: competition._id,
          currentQuestionIndex: 0
        })
      }
      return res.json({ ok: true, competition })
    } catch (error) {
      return res.json({ ok: false, error })
    }
  })

  router.post('/:_id', async (req, res) => {
    const { _id } = req.params
    const { correctAnswers } = req.body
    try {
      const _correctAnswers = JSON.stringify(correctAnswers)
      const competition = await Competition.findByIdAndUpdate(_id, {
        correctAnswers: _correctAnswers
      })
      if (competition) {
        socket.emit('answers-update', correctAnswers)
      }
      return res.json({ ok: true, correctAnswers })
    } catch (error) {
      return res.json({ ok: false })
    }
  })

  router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
      const result = await Competition.findByIdAndUpdate(id, {
        isActive: false
      })

      if (result) {
        cache.set('competitionId', null)
        cache.set('activeEpisodeId', null)
        cache.set('currentQuestionIndex', 0)
        socket.emit('competition-cancelled')
        return res.json({ ok: true })
      } else {
        res.sendStatus(404)
        return res.json({ ok: false })
      }
    } catch (error) {
      return res.json({ ok: false, error: JSON.stringify(error) })
    }
  })

  router.get('/socket/:id', (req, res) => {
    const { id } = req.params
    socket.emit('update-test', id)
    res.send(id)
  })

  return router
}

export default competitionRoutes
