import { combineReducers } from "redux";
import NavigationReducer from "./navigationReducer";
import NewWalletSetup from './NewWalletSetup';
import currencyListReducer from './currencyListReducer';
import languageListReducer from './languageListReducer';
import settingsReducer from './settingsReducer';


const AppReducer = combineReducers({
  NavigationReducer,
  newWallet: NewWalletSetup,
  currency: currencyListReducer,
  language: languageListReducer,
  settings: settingsReducer
});

export default AppReducer;
