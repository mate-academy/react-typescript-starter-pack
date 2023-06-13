import { combineReducers } from 'redux'
import app from './app'
import pieces from './pieces'

const rootReducer = combineReducers({
  app,
  pieces
})

export default rootReducer
