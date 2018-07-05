import { combineReducers } from "redux";

import NavigationReducer from "./navigation/navigationReducer";
import NewWalletSetup from './wallet/NewWalletSetup';
import currencyListReducer from './fiat/fiatListReducer';
import languageListReducer from './language/languageListReducer';
import settingsReducer from './settings/settingsReducer';
import ContactsReducer from './contacts/contactReducer';

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
