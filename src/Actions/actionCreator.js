import { incrementCounter, decrementCounter, addTokenSetup } from "./actionTypes";
import * as actionTypes from './actionTypes';


const incrementAction = () => ({
  type: incrementCounter
});

function AddToken(paylaod) {
  return {
    type: addTokenSetup,
    paylaod
  }
}

export function addTokenToSetup(tokenId) {

  return dispatch => {
    dispatch({ type: actionTypes.ADD_TOKEN_SETUP, payload: tokenId })
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


export function newWalletCreation() {
  return dispatch => {
    dispatch({ type: actionTypes.CREATING_NEW_WALLET,
              payload: true })
  }
}

export function newWalletNameEntry(name) {
  return dispatch => {
    dispatch({ type: actionTypes.NEW_WALLET_NAME, payload: name})
  }
}

export function restoreWallet() {
  return dispatch => {
    dispatch({ type: actionTypes.RESTORE_WALLET })
  }
}

export function recoveryKey(key) {
  return dispatch => {
    dispatch({type: actionTypes.RESTORE_RECOVERY_KEY, paylaod: key})
  }
}
