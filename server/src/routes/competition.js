import { Router } from 'express'
import Competition from '../modals/Competition'
import Episode from '../modals/Episode'

function competitionRoutes({ cache, socket }) {
  const router = Router()

  router.post('/toggle-points', async (req, res) => {
    const id = cache.get('competitionId')
    const show = req.body
    try {
      const competition = await Competition.findById(id)
      if (competition) {
        const teams = JSON.parse(competition.teams)
        socket.emit('toggle-points', {
          teams,
          show
        })
        return res.json({ ok: true })
      }
      return res.json({ ok: false })
    } catch (error) {
      return res.json({ ok: false, error })
    }
  })
  router.post('/update-points', async (req, res) => {
    const id = cache.get('competitionId')
    const { teams } = req.body
    try {
      const competition = await Competition.findByIdAndUpdate(id, {
        teams: JSON.stringify(teams)
      })
      if (competition) {
        return res.json({ ok: true, competition })
      }
      return res.json({ ok: false })
    } catch (error) {
      return res.json({ ok: false, error })
    }
  })

  router.post('/wrong-answers', async (req, res) => {
    const { wrongAnswers } = req.body
    const _id = cache.get('competitionId')
    try {
      const competition = await Competition.findByIdAndUpdate(_id, {
        wrongAnswers: JSON.stringify(wrongAnswers)
      })
      console.log(competition)
      if (competition) {
        socket.emit('wrong-answers-update', wrongAnswers)
        return res.send({ ok: true, competition })
      }
      return res.send({ ok: false })
    } catch (error) {
      return res.send({ ok: false, error })
    }
  })

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
        episodeId,
        wrongAnswers: JSON.stringify(
          teams.map(t => ({
            team: t.title,
            count: 0
          }))
        )
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
