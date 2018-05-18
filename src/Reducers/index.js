import { combineReducers } from "redux";
import CounterReducer from "./counterReducer";
import NavigationReducer from "./navigationReducer";
import CoinReducer from './CoinReducer';
import CoinSelectionReducer from './CoinSelectionReducer';
import NewWalletSetup from './NewWalletSetup';

const AppReducer = combineReducers({
  CounterReducer,
  NavigationReducer,
  coins: CoinReducer,
  selectedCoins: CoinSelectionReducer,
  newWallet: NewWalletSetup

});

export default AppReducer;
