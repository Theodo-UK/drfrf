import { compose, createStore } from 'redux'

import reducers from './reducers'

const customComposer = (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const enhancers = customComposer()

const store = createStore(
  reducers,
  enhancers
)

export default store
