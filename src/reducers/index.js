import { combineReducers } from 'redux';
import NavigationReducer from './navigation/navigationReducer';
import NewWalletSetup from './wallet/NewWalletSetup';
import ContactsReducer from './contacts/contactReducer';
import QrScannerReducer from './wallet/QrScannerReducer';

/**
 * Contains a reference to all the reducers being used in the applications.
 * This file is used to invoke all the reducers when a action occurs
 */
const AppReducer = combineReducers({
  NavigationReducer,
  newWallet: NewWalletSetup,
  contacts: ContactsReducer,
  QrScanner: QrScannerReducer,
});

export default AppReducer;
