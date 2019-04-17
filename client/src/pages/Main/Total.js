import React from 'react'

function Total({ total }) {
  return (
    <div className="total-container">
      <div className="total">
        <h1>TOPLAM</h1>
        <h2>{total}</h2>
      </div>
    </div>
  )
}

export default Total
