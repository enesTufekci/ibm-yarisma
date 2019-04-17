import React from 'react'

import Input from 'components/Input'
import Button from 'components/Button'

import { useRest } from 'network/useNetwork'
import './current-points.css'

function CurrentPoints({ teams, currentPoints }) {
  const [showPoints, setShowPoints] = React.useState(false)
  const [points, setPoints] = React.useState(currentPoints || [])

  const updateTeams = useRest('competition/update-points')
  const togglePoints = useRest('competition/toggle-points')

  React.useEffect(() => {
    if (currentPoints) {
      setPoints(currentPoints)
    }
  }, [currentPoints])

  const handleUpdatePoints = index => event => {
    const { value } = event.target
    let _points = points
    _points[index] = value
    setPoints([..._points])
  }

  const handleUpdateTeams = async () => {
    const teamsUpdated = teams.map((team, index) => ({
      ...team,
      points: points[index] || 0
    }))
    const res = await updateTeams({ teams: teamsUpdated })
    if (res.ok) {
      alert('PUAN DURUMU GÜNCELLENDI')
    }
  }

  const handleTogglePoints = async () => {
    const show = !showPoints
    const res = await togglePoints({ show })
    if (res.ok) {
      setShowPoints(show)
    }
  }
  return (
    <div style={{ border: '1px solid white', marginBottom: '2rem' }}>
      <div className="current-points-container">
        {points.length &&
          teams.map((team, index) => (
            <div key={`cp-${index}`} className="current-points-team">
              <h3>{team.title}</h3>
              <Input
                type="number"
                value={points[index]}
                onChange={handleUpdatePoints(index)}
              />
            </div>
          ))}
      </div>
      <div className="current-points-actions">
        <Button onClick={handleUpdateTeams}>Puan Durumunu Güncelle</Button>
        <Button onClick={handleTogglePoints}>
          Puan Durumunu {!showPoints ? 'Göster' : 'Gizle'}
        </Button>
      </div>
    </div>
  )
}

export default CurrentPoints
