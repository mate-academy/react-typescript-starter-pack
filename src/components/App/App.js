import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { restartGame } from 'store/actions'
import classNames from 'classnames'
import { BLACK, WHITE } from 'data/constants'
import './App.scss'
import Board from '../Board/Board'
import Tray from 'components/Tray'

function App() {
  const dispatch = useDispatch()
  const isGameOver = useSelector(state => state.app.winner)
  const currentStatus = isGameOver ? 'winner' : 'player'
  const currentPlayer = useSelector(state => state.app.currentPlayer)
  const currentPieces = useSelector(state => state.pieces.currentPieces)
  const capturedPieces = useSelector(state => state.pieces.capturedPieces)
  const capturedBlackPieces = capturedPieces.filter(
    piece => piece.color === BLACK
  )
  const capturedWhitePieces = capturedPieces.filter(
    piece => piece.color === WHITE
  )
  const cx = classNames({
    [currentStatus]: currentStatus,
    [currentPlayer]: true
  })

  const _clickHandler = () => {
    dispatch(restartGame())
  }

  return (
    <main className="app">
      <header>
        <span className="status">{currentStatus}:</span>
        <span className={cx}>{currentPlayer}</span>
        {isGameOver && <button onClick={_clickHandler}>restart</button>}
      </header>

      <Tray pieces={capturedBlackPieces} color={BLACK} />

      <Board pieces={currentPieces} />

      <Tray pieces={capturedWhitePieces} color={WHITE} />
    </main>
  )
}

export default App
