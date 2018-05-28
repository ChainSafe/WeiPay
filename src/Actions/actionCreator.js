import { AsyncStorage } from 'react-native';
import { incrementCounter, decrementCounter, addTokenSetup } from "./actionTypes";
import * as actionTypes from './actionTypes';


const incrementAction = () => ({
  type: incrementCounter
});

function AddToken(payload) {
  return {
    type: addTokenSetup,
    payload
  }
}

// export async function getCurrentWallet() {
//   let wallet = await AsyncStorage.getItem('wallet')
//
//   return ({ type: actionTypes.CURRENT_WALLET, payload: wallet })
// }

export function addTokenToSetup(coin) {
  return dispatch => {
    coin.selected = !coin.selected
    dispatch({ type: actionTypes.ADD_TOKEN_SETUP, payload: coin })
  }
}


// export function login() {
//   return dispatch => {
//     dispatch({ type: LOADING })
//     // api call
//     .then(res => { dispatch({ type: LOGIN, payload: user}) })
//     .catch(err => { dispatch({type: LOGIN_FAILED, payload: null}) })
//   }
// }


export function newWalletCreation(wallet) {
  return dispatch => {
    dispatch({
      type: actionTypes.CREATING_NEW_WALLET,
      payload: wallet
    })
  }
}

export function newWalletNameEntry(name) {
  return dispatch => {
    dispatch({ type: actionTypes.NEW_WALLET_NAME, payload: name })
  }
}

export function restoreWallet() {
  return dispatch => {
    dispatch({ type: actionTypes.RESTORE_WALLET })
  }
}

export function recoveryKey(key) {
  return dispatch => {
    dispatch({type: actionTypes.RESTORE_RECOVERY_KEY, payload: key})
  }
}

export function selectWalletCurrency(currency) {
  return dispatch => {
    dispatch({type: actionTypes.SELECT_WALLET_CURRENCY, payload: currency})
  }
}

export function selectWalletLanguage(language) {
  return dispatch => {
    dispatch({type: actionTypes.SELECT_WALLET_LANGUAGE, payload: language})
  }
}

export function recoverPassphrase(passphrase) {
  return dispatch => {
    dispatch({ type: actionTypes.RESTORE_RECOVERY_PASSPHRASE, payload: passphrase })
  }
}

export const switchLanguage = language => dispatch => {
  dispatch({ type: actionTypes.SWITCH_LANGUAGE, payload: language })
}
