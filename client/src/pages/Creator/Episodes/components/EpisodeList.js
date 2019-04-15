import React from 'react'
import { Link } from 'react-router-dom'

import Button from 'components/Button'

function EpisodeList({ episodes }) {
  return episodes.map(episode => (
    <Link to={`/creator/${episode._id}`} key={episode._id}>
      <div className="episode-list-item">
        <div className="episode-list-title">{episode.title}</div>
        <div className="episode-list-actions">
          <Button>Düzenle</Button>
          <Button>Sil</Button>
        </div>
      </div>
    </Link>
  ))
}

export default EpisodeList
