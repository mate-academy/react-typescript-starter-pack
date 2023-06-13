/*
 * action types
 */
export const CAPTURE_PIECE = 'CAPTURE_PIECE'
export const RESTART_GAME = 'RESTART_GAME'
export const SET_ACTIVE_SQUARE = 'SET_ACTIVE_SQUARE'
export const SET_POSITION = 'SET_POSITION'
export const SET_WINNER = 'SET_WINNER'
export const TOGGLE_PLAYER = 'TOGGLE_PLAYER'

/*
 * action creators
 */
export const restartGame = () => {
  return {
    type: RESTART_GAME
  }
}

export const capturePiece = obj => {
  return {
    type: CAPTURE_PIECE,
    obj
  }
}

export const setActiveSquare = id => {
  return {
    type: SET_ACTIVE_SQUARE,
    id
  }
}

export const setPosition = obj => {
  return {
    type: SET_POSITION,
    obj
  }
}

export const setWinner = color => {
  return {
    type: SET_WINNER,
    color
  }
}

export const togglePlayer = () => {
  return {
    type: TOGGLE_PLAYER
  }
}
