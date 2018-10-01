import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import promise from 'redux-promise';
import logger from 'redux-logger';
import AppReducer from './src/reducers';

const persistConfig = {
  key: 'root',
  storage,
  persist: (...options) => persistNative(...options),
  whitelist: ['Wallet', 'contacts', 'Debug', 'newWallet', 'HotWallet'],
}

const persistedReducer = persistReducer(persistConfig, AppReducer);
const middleware = applyMiddleware(thunk, promise, logger);

const store = createStore(
    persistedReducer,
    middleware,
);

let persistor = persistStore(store)

export { store, persistor }
