import { BOARD, BLACK, WHITE } from 'data/constants'

const _convertPositionToIndex = position => {
  return BOARD.findIndex(square => square.id === position)
}

const _convertIndexToPosition = index => BOARD[index].id

const _createPathArray = (pathStart, pathEnd, incrementBy) => {
  let path = []
  for (let i = pathStart; i < pathEnd; i += incrementBy) {
    const id = _convertIndexToPosition(i)
    path.push(id)
  }
  // console.log('*** path', path)
  return path
}

const _getMoves = (player, activePiece, endPosition, currentPiece) => {
  const pieceName = activePiece?.name
  const isInitialMove = !activePiece?.hasMoved
  const src = _convertPositionToIndex(activePiece?.position)
  const dest = _convertPositionToIndex(endPosition)
  // console.log('*** getMoves', pieceName, activePiece, src, dest, isInitialMove)

  switch (pieceName) {
    case 'king': {
      return (
        src - 9 === dest ||
        src - 8 === dest ||
        src - 7 === dest ||
        src + 1 === dest ||
        src + 9 === dest ||
        src + 8 === dest ||
        src + 7 === dest ||
        src - 1 === dest
      )
    }

    case 'queen': {
      const mod = src % 8
      const diff = 8 - mod
      return (
        Math.abs(src - dest) % 9 === 0 ||
        Math.abs(src - dest) % 7 === 0 ||
        Math.abs(src - dest) % 8 === 0 ||
        (dest >= src - mod && dest < src + diff)
      )
    }

    case 'bishop': {
      return Math.abs(src - dest) % 9 === 0 || Math.abs(src - dest) % 7 === 0
    }

    case 'knight': {
      return (
        src - 17 === dest ||
        src - 10 === dest ||
        src + 6 === dest ||
        src + 15 === dest ||
        src - 15 === dest ||
        src - 6 === dest ||
        src + 10 === dest ||
        src + 17 === dest
      )
    }

    case 'rook': {
      const mod = src % 8
      const diff = 8 - mod
      return (
        Math.abs(src - dest) % 8 === 0 ||
        (dest >= src - mod && dest < src + diff)
      )
    }

    case 'pawn': {
      if (player === WHITE) {
        if (
          (dest === src - 8 && !currentPiece) ||
          (dest === src - 16 && isInitialMove)
        ) {
          return true
        } else if (currentPiece && (dest === src - 9 || dest === src - 7)) {
          return true
        }
      } else if (player === BLACK) {
        if (
          (dest === src + 8 && !currentPiece) ||
          (dest === src + 16 && isInitialMove)
        ) {
          return true
        } else if (currentPiece && (dest === src + 9 || dest === src + 7)) {
          return true
        }
      }
      return false
    }

    default:
      return
  }
}

const _getPath = (activePiece, endPosition) => {
  const pieceName = activePiece?.name
  const src = _convertPositionToIndex(activePiece?.position)
  const dest = _convertPositionToIndex(endPosition)
  // console.log('*** _getPath', pieceName, activePiece, src, dest)
  let pathStart, pathEnd, incrementBy

  switch (pieceName) {
    case 'king': {
      return []
    }

    case 'queen': {
      if (src > dest) {
        pathStart = dest
        pathEnd = src
      } else {
        pathStart = src
        pathEnd = dest
      }

      if (Math.abs(src - dest) % 8 === 0) {
        incrementBy = 8
        pathStart += 8
      } else if (Math.abs(src - dest) % 9 === 0) {
        incrementBy = 9
        pathStart += 9
      } else if (Math.abs(src - dest) % 7 === 0) {
        incrementBy = 7
        pathStart += 7
      } else {
        incrementBy = 1
        pathStart += 1
      }

      return _createPathArray(pathStart, pathEnd, incrementBy)
    }

    case 'bishop': {
      if (src > dest) {
        pathStart = dest
        pathEnd = src
      } else {
        pathStart = src
        pathEnd = dest
      }

      if (Math.abs(src - dest) % 9 === 0) {
        incrementBy = 9
        pathStart += 9
      } else {
        incrementBy = 7
        pathStart += 7
      }

      return _createPathArray(pathStart, pathEnd, incrementBy)
    }

    case 'knight': {
      return []
    }

    case 'rook': {
      if (src > dest) {
        pathStart = dest
        pathEnd = src
      } else {
        pathStart = src
        pathEnd = dest
      }

      if (Math.abs(src - dest) % 8 === 0) {
        incrementBy = 8
        pathStart += 8
      } else {
        incrementBy = 1
        pathStart += 1
      }

      return _createPathArray(pathStart, pathEnd, incrementBy)
    }

    case 'pawn': {
      if (dest === src - 16) {
        return [_convertIndexToPosition(src - 8)]
      } else if (dest === src + 16) {
        return [_convertIndexToPosition(src + 8)]
      }
      return []
    }

    default:
      return
  }
}

const _isMovePossible = (
  currentPlayer,
  activePiece,
  newPosition,
  currentPiece
) => {
  return new Promise((resolve, reject) => {
    if (_getMoves(currentPlayer, activePiece, newPosition, currentPiece)) {
      resolve(true)
    } else {
      reject('move not possible')
    }
  })
}

const _isMoveLegal = (activePiece, newPosition, currentPieces) => {
  const path = _getPath(activePiece, newPosition)
  let isLegal = true

  path.forEach(id => {
    const isOccupied = currentPieces.find(({ position }) => position === id)
    // console.log('*** occupied', id, isOccupied, isLegal)
    if (isOccupied) isLegal = false
  })

  return new Promise((resolve, reject) => {
    if (isLegal) {
      resolve(true)
    } else {
      reject('move not legal')
    }
  })
}

export const canSelect = (currentPiece, currentPlayer) => {
  return currentPiece?.color === currentPlayer
}

export const canMove = (
  activePiece,
  newPosition,
  currentPiece,
  currentPlayer,
  currentPieces
) => {
  if (!activePiece) return false

  return Promise.all([
    _isMovePossible(currentPlayer, activePiece, newPosition, currentPiece),
    _isMoveLegal(activePiece, newPosition, currentPieces)
  ])
    .then(values => {
      console.log(
        `${currentPlayer} ${activePiece.name}: ${activePiece.position} to ${newPosition}`
      )
      return true
    })
    .catch(error => {
      console.error(
        `${currentPlayer} ${activePiece.name}: ${activePiece.position} to ${newPosition} - ${error}`
      )
      return false
    })
}
