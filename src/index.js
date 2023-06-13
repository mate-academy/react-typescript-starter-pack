import React from 'react'
import { render } from 'react-dom'
import { legacy_createStore as createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './store/reducers'
import './index.scss'
import App from './components/App/App'

const store = createStore(reducer)

render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
