import React from 'react'
import { Redirect } from 'react-router-dom'

import EpisodeSelectList from './components/EpisodeSelectList'

import './control.css'
import { useGet } from 'network/useNetwork'

function EpisodeSelect() {
  const [data, loading, error] = useGet('competition')
  const [competition, setCompetition] = React.useState(
    (data && data.competition) || null
  )

  React.useEffect(() => {
    if (data && data.competition && !error) {
      setCompetition(data.competition)
    }
  }, [data, loading])

  if (competition) {
    return <Redirect to={`/control/${competition._id}`} />
  }
  return <EpisodeSelectList />
}

export default EpisodeSelect
