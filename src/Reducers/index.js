import { combineReducers } from "redux";
import NavigationReducer from "./navigationReducer";
import NewWalletSetup from './NewWalletSetup';
import currencyListReducer from './currencyListReducer';
import languageListReducer from './languageListReducer';
import settingsReducer from './settingsReducer';
import ContactsReducer from './ContactsReducer';


/**
 * Contains a reference to all the reducers being used in the applications.
 * This file is used to invoke all the reducers when a action occurs
 */

const AppReducer = combineReducers({
  NavigationReducer,
  newWallet: NewWalletSetup,
  currency: currencyListReducer,
  language: languageListReducer,
  settings: settingsReducer,
  contacts: ContactsReducer
});

export default AppReducer;
