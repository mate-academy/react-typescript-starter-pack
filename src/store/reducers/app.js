import {
  RESTART_GAME,
  SET_ACTIVE_SQUARE,
  SET_WINNER,
  TOGGLE_PLAYER
} from 'store/actions'
import { BLACK, WHITE } from 'data/constants'

const initialState = {
  currentPlayer: WHITE,
  activeSquare: undefined,
  winner: undefined
}

const app = (state = initialState, action) => {
  // console.log('*** app::action', action)

  switch (action.type) {
    case RESTART_GAME: {
      return { ...initialState }
    }

    case SET_ACTIVE_SQUARE: {
      const isActiveDefined = state.activeSquare !== undefined
      const activeSquare = isActiveDefined ? undefined : action.id
      return { ...state, activeSquare: activeSquare }
    }

    case SET_WINNER: {
      const winner = action.color
      return { ...state, winner: winner }
    }

    case TOGGLE_PLAYER: {
      const toggledPlayer = state.currentPlayer === WHITE ? BLACK : WHITE
      return { ...state, currentPlayer: toggledPlayer }
    }

    default:
      return state
  }
}

export default app
