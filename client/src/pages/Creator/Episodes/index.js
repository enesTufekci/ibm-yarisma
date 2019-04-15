import React from 'react'

import { useGet, useRest } from 'network/useNetwork'
import Button from 'components/Button'
import Container from 'components/Container'

import EpisodeCreateForm from './components/CreateForm'
import EpisodeList from './components/EpisodeList'

import './episode-list.css'

function Episodes({ history }) {
  const [data, loading, error] = useGet('episode')
  const createEpisode = useRest('episode')
  const [creating, setCreating] = React.useState(false)

  const handleToggleCreateForm = () => {
    setCreating(!creating)
  }

  const handleCreateEpisode = async params => {
    const res = await createEpisode(params)
    if (res.ok) {
      const { episode } = await res.json()
      history.push(`/creator/${episode._id}`)
    }
  }

  return (
    <Container>
      <div className="episode-list">
        <div className="episode-list-item">
          <div className="episode-list-title">
            {creating ? (
              <EpisodeCreateForm onSubmit={handleCreateEpisode} />
            ) : (
              <Button
                style={{ width: '100%' }}
                onClick={handleToggleCreateForm}
              >
                + YENI EKLE
              </Button>
            )}
          </div>
        </div>
        {!loading && !error && data && data.episodes && (
          <EpisodeList episodes={data.episodes} />
        )}
      </div>
    </Container>
  )
}

export default Episodes
