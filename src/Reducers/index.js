import { combineReducers } from "redux";
import CounterReducer from "./counterReducer";
import NavigationReducer from "./navigationReducer";
import CoinReducer from './CoinReducer';
import CoinSelectionReducer from './CoinSelectionReducer';


const AppReducer = combineReducers({
  CounterReducer,
  NavigationReducer,
  coins: CoinReducer,
  selectedCoins: CoinSelectionReducer
});

export default AppReducer;
