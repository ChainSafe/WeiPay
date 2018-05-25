import { combineReducers } from "redux";
import CounterReducer from "./counterReducer";
import NavigationReducer from "./navigationReducer";
import CoinReducer from './CoinReducer';
import CoinSelectionReducer from './CoinSelectionReducer';
import NewWalletSetup from './NewWalletSetup';
import currencyListReducer from './currencyListReducer';
import languageListReducer from './languageListReducer';
import settingsReducer from './settingsReducer';


const AppReducer = combineReducers({
  CounterReducer,
  NavigationReducer,
  coins: CoinReducer,
  selectedCoins: CoinSelectionReducer,
  newWallet: NewWalletSetup,
  currency: currencyListReducer,
  language: languageListReducer,
  settings: settingsReducer

});

export default AppReducer;
