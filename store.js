import { createStore, applyMiddleware } from 'redux';
import AppReducer from './src/reducers'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  persist: (...options) => persistNative(...options),
  whitelist: ['contacts', 'wallet', 'newWallet']
}

const persistedReducer = persistReducer(persistConfig, AppReducer)

const store = createStore(
    persistedReducer,
    applyMiddleware(thunk),
);

let persistor = persistStore(store)

export { store, persistor }
