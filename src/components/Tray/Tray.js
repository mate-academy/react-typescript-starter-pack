import React from 'react'
import './Tray.scss'
import Piece from 'components/Piece'

const Tray = ({ pieces, color }) => {
  return (
    <section className={`captured ${color}`}>
      {pieces.map(value => (
        <Piece
          key={value.id}
          color={value.color}
          name={value.name}
          position={value.position}
        />
      ))}
    </section>
  )
}

export default Tray
