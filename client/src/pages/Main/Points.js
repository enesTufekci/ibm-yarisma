import React from 'react'

function Points({ teams }) {
  return (
    <div className="points-container">
      {teams.map(team => (
        <div key={team} className="team-container">
          <div className="team-title">Takım {team.title}</div>
          <div className="team-points">{team.points}</div>
          <p>Puan</p>
        </div>
      ))}
    </div>
  )
}

export default Points
