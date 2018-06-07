import { AsyncStorage } from 'react-native';
import * as actions from '../Actions/actionTypes';

const INITIAL_STATE = {
  newWallet: false,
  walletName: '',
  tokens: [],
  wallet: null,
  backupPassphrase: ""
};

export default (state = INITIAL_STATE, action) => {
  //console.log(action);
  switch (action.type) {

    case actions.CREATING_NEW_WALLET:
      console.log("wallet reducer: ");
      console.log(action.payload);
      return { ...state, newWallet: true, wallet: action.payload };

    case actions.NEW_WALLET_NAME:
      return { ...state, walletName: action.payload };

    case actions.ADD_TOKEN_SETUP:
      var current = state.tokens;
      let index = current.map(token => token.id).indexOf(action.payload.id)
      if (index === -1) {
        //add the selected coin to the token list
        current.push(action.payload);
      } else {
        //Delete the selected coin from the token list
        current.splice(index, 1);
      }
      console.log(current);

      // await AsyncStorage.setItem('wallet', { ...state, tokens: current } )
      return { ...state, tokens: current };

    default:
      return state;
  }
};
