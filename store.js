import { createStore, applyMiddleware } from 'redux';
import AppReducer from './src/reducers'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import promise from 'redux-promise'
import logger from 'redux-logger'

const persistConfig = {
  key: 'root',
  storage,
  persist: (...options) => persistNative(...options),
  whitelist: ['contacts', 'wallets', 'wallet', 'newWallet', 'walletBalance', 'currentPriceArray']
}

const persistedReducer = persistReducer(persistConfig, AppReducer);

const middleware = applyMiddleware(thunk, promise, logger);

const store = createStore(
    persistedReducer,
    middleware,
);

let persistor = persistStore(store)

export { store, persistor }
