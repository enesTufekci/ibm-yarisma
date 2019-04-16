import React from 'react'

import { useGet, useRest } from 'network/useNetwork'
import Container from 'components/Container'
import Button from 'components/Button'
import Input from 'components/Input'

function EpisodeSelectList({ history }) {
  const [data, loading, error] = useGet('episode')
  const createCompetition = useRest('competition')
  const [creating, setCreating] = React.useState(-1)
  const [episodes, setEpisodes] = React.useState((data && data.episodes) || [])
  const [teamA, setTeamA] = React.useState('')
  const [teamB, setTeamB] = React.useState('')
  const [starting, setStarting] = React.useState(false)

  React.useEffect(() => {
    if (data && data.episodes) {
      setEpisodes(data.episodes)
    }
  }, [data, loading])

  const handleStartCompetion = episodeId => async () => {
    setStarting(true)
    const data = {
      episodeId,
      teams: [{ title: teamA, points: 0 }, { title: teamB, points: 0 }]
    }
    const res = await createCompetition(data)
    const { competition } = await res.json()
    if (competition) {
      history.push(`control/${competition._id}`)
    }
  }

  return (
    <Container>
      {!error &&
        episodes.map((episode, index) => (
          <div className="episode-select-item" key={episode._id}>
            <div className="episode-select-item-title">{episode.title}</div>
            {creating === index && (
              <div className="episode-select-contestants">
                <Input
                  value={teamA}
                  key={`c-${index}-A`}
                  onChange={e => setTeamA(e.target.value)}
                  placeholder={`Takim A`}
                />
                <Input
                  value={teamB}
                  key={`c-${index}-B`}
                  onChange={e => setTeamB(e.target.value)}
                  placeholder={`Takim B`}
                />
              </div>
            )}
            <div className="episode-select-item-action">
              {creating !== index ? (
                <Button onClick={() => setCreating(index)}>
                  Yarismayi Baslat
                </Button>
              ) : (
                <React.Fragment>
                  <Button onClick={handleStartCompetion(episode._id)}>
                    Baslat
                  </Button>
                  <Button onClick={() => setCreating(-1)}>Vazgeç</Button>
                </React.Fragment>
              )}
            </div>
          </div>
        ))}
    </Container>
  )
}

export default EpisodeSelectList
