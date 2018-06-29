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

/**
 * Action for adding tokens to the portfolio during the main setup
 * returns a dispatch => which invokes all the reducers to handle this action
 * @param {String} coin 
 */
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

/**
 * returns an action with a new crypto wallet create using
 * ethers.js as a payload
 * @param {ethers.js wallet} wallet 
 */
export function newWalletCreation(wallet) {
  return dispatch => {
    dispatch({
      type: actionTypes.CREATING_NEW_WALLET,
      payload: wallet
    })
  }
}


/**
 * retruns an action with the wallet name as a payload
 * @param {String} name 
 */
export function newWalletNameEntry(name) {
  return dispatch => {
    dispatch({ type: actionTypes.NEW_WALLET_NAME, payload: name })
  }
}

/**
 * returns an action that enables the state to restore a wallet
 */
export function restoreWallet() {
  return dispatch => {
    dispatch({ type: actionTypes.RESTORE_WALLET })
  }
}

/**
 * returns an action that contains the mnemonic for the wallet 
 * that the user wishes to restore
 * @param {String} key 
 */
export function recoveryKey(key) {
  return dispatch => {
    dispatch({ type: actionTypes.RESTORE_RECOVERY_KEY, payload: key })
  }
}

/**
 * returns an action that contains the fiat currency that the user
 * wishes to view thier the wallet balance with
 * @param {String} currency 
 */
export function selectWalletCurrency(currency) {
  return dispatch => {
    dispatch({ type: actionTypes.SELECT_WALLET_CURRENCY, payload: currency })
  }
}

/**
 * returns an action that contains the language that the user wishes to
 * use thier wallet in.
 * 
 * @param {String} language 
 */
export function selectWalletLanguage(language) {
  return dispatch => {
    dispatch({ type: actionTypes.SELECT_WALLET_LANGUAGE, payload: language })
  }
}

/* Using this action type in recover wallet page, not restore */
/**
 * Action is not used anywhere.
 * 
 * @param {String} passphrase 
 */
export function recoverPassphrase(passphrase) {
  return dispatch => {
    dispatch({ type: actionTypes.RESTORE_RECOVERY_PASSPHRASE, payload: passphrase })
  }
}

/**
 * Returns an action that contains the -Name- of the new contact
 * that the user is creating.
 * 
 * Reducer: ContactsReducers
 * 
 * @param {String} contact 
 */
export function addingContact(contact) {
  return dispatch => {
    dispatch({ type: actionTypes.ADDING_CONTACT, payload: contact })
  }
}


/**
 * returns an action that contains an object which contains the name
 * of the new contact and all the contact address that belongs to it.
 * 
 * @param {String} contactName 
 * @param {Object} contactAddress 
 */
export function completeContact(contactName, contactAddress) {
  let contact = {}
  contact.name = contactName
  contact.contactAddress = contactAddress

  return dispatch => {
    dispatch({ type: actionTypes.COMPLETE_CONTACT, payload: contact })
  }
}

/**
 * This action is not used anywhere
 */
export function clearInput() {
  return dispatch => {
    dispatch({ type: actionTypes.CLEAR_INPUT })
  }
}

/**
 * This action is not used anywhere
 * @param {String} name 
 */
export function createContactName(name) {
  return dispatch => {
    dispatch({ type: actionTypes.CONTACT_NAME, payload: name })
  }
}

/**
 * returns an action that contain an object with all the tokens
 * that currently exists on the porfolio page.
 * This object also holds the addresses that were inputed by the user when 
 * adding a new contact
 * @param {Object} addresses 
 * @param {String} coinType 
 */
export function createContactAddresses(addresses, coinType) {

  return dispatch => {
    dispatch({ type: actionTypes.CONTACT_ADDRESS, payload: addresses })
  }
}

/**
 * returns an action that contains the data reterived by using the QrScanner
 * component
 * @param {String} data 
 */
export function getQRCodeData(data) {
  return dispatch => {
    dispatch({ type: actionTypes.QRSCANNER_DATA, payload: data })
  }
}

export function qrScannerInvoker(pageName) {
  return dispatch => {
    dispatch({ type: actionTypes.QRSCANNER_PAGE_INVOKER, payload: pageName })
  }
}