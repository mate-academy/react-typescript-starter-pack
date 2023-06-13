import { CAPTURE_PIECE, RESTART_GAME, SET_POSITION } from 'store/actions'
import { INIT_STATE } from 'data/constants'

const initialState = {
  currentPieces: INIT_STATE,
  capturedPieces: []
}

const pieces = (state = initialState, action) => {
  // console.log('*** pieces::action', action)

  switch (action.type) {
    case RESTART_GAME: {
      return { ...initialState }
    }

    case CAPTURE_PIECE:
      return {
        ...state,
        currentPieces: state.currentPieces.filter(
          piece => piece.id !== action.obj.piece.id
        ),
        capturedPieces: [...state.capturedPieces, action.obj.piece]
      }

    case SET_POSITION:
      return {
        ...state,
        currentPieces: [
          ...state.currentPieces.map(piece =>
            piece.id === action.obj.piece.id
              ? { ...piece, position: action.obj.position, hasMoved: true }
              : piece
          )
        ]
      }

    default:
      return state
  }
}

export default pieces
