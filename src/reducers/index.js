import { combineReducers } from 'redux';
import NavigationReducer from './navigation/navigationReducer';
import NewWalletSetup from './wallet/NewWalletSetup';
import ContactsReducer from './contacts/contactReducer';
import QrScannerReducer from './wallet/QrScannerReducer';
import * as actionTypes from '../actions/ActionTypes';
import storage from 'redux-persist/lib/storage'

/**
 * Contains a reference to all the reducers being used in the applications.
 * This file is used to invoke all the reducers when a action occurs
 */
const AppReducer = combineReducers({
  NavigationReducer,
  newWallet: NewWalletSetup,
  contacts: ContactsReducer,
  QrScanner: QrScannerReducer
});

const rootReducer = (state, action) => {
  if (action.type === actionTypes.CLEAR_STORE){
    Object.keys(state).forEach(key => {
      storage.removeItem(`persist:${key}`);
    });
    state = undefined;
  }

  return AppReducer(state, action)
}

export default rootReducer
