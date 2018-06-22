import { createStore, compose, applyMiddleware } from 'redux';
import AppReducer from './src/Reducers'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['NavigationReducer']
}

const persistedReducer = persistReducer(persistConfig, AppReducer)

const store = createStore(
    persistedReducer,
    applyMiddleware(thunk)
);

let persistor = persistStore(store)

export { store, persistor }
