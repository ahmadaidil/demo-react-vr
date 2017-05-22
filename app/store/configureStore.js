/*
Based on config at https://github.com/decosoftware/RedditClient/blob/go/app/store/configureStore.js
*/
import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import { AsyncStorage } from 'react-native';
// Thunk middleware allows actions to be chained and waited on by returning
// a function from that action
// https://github.com/gaearon/redux-thunk
import thunk from 'redux-thunk'

// Logs all actions going through redux into console
// https://github.com/evgenyrodionov/redux-logger
import { createLogger } from 'redux-logger'
import { reducer } from '../redux'

// http://redux.js.org/docs/advanced/Middleware.html
const middleware = [ thunk ]

// Use the NODE_ENV to include logging and debugging tools
// in development environment. They will be compiled out of
// the production build.
if (process.env.NODE_ENV === 'development') {
  middleware.push(createLogger())
}

// Can use a preloaded initialState if available, in this case we don't
export default (initialState) => {
  // http://redux.js.org/docs/api/createStore.html
  const store = createStore(
    reducer,
    initialState,
    compose(applyMiddleware(...middleware), autoRehydrate())
  )
  persistStore(store, {storage: AsyncStorage}, () => {})
  return store
}
