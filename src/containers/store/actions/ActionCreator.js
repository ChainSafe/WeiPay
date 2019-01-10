import * as actionTypes from './ActionTypes';

/**
 * Action for adding tokens to the portfolio during the main setup
 * returns a dispatch => which invokes all the reducers to handle this action
 * @param {String} coin
 */
export function addTokenToSetup(coin, tokenList) {
  return (dispatch) => {
    coin.selected = !coin.selected;
    var i = 0;
    while (tokenList[i] != coin) {
      i++;
    }
    console.log("This is a custom token: " + coin.initialWalletToken);
    if (coin.selected === false) {
      tokenList.splice(i,1);
    }else {
      tokenList[i] = coin;

    }
    const newTokens = [...tokenList];
    dispatch({ type: actionTypes.ADD_TOKEN_SETUP, payload: newTokens });
  };
}



/**
 * returns an action with a new crypto wallet create using
 * ethers.js as a payload
 * @param {ethers.js wallet} wallet
 */
export function newWalletCreation(wallet) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CREATING_NEW_WALLET,
      payload: wallet,
    });
  };
}

/**
 * retruns an action with the wallet name as a payload
 * @param {String} name
 */
export function newWalletNameEntry(name) {
  return (dispatch) => {
    dispatch({ type: actionTypes.NEW_WALLET_NAME, payload: name });
  };
}

/**
 * returns an action that enables the state to restore a wallet
 */
// export function restoreWallet() {
//   return (dispatch) => {
//     dispatch({ type: actionTypes.RESTORE_WALLET });
//   };
// }


/**
 * returns an action that contains the fiat currency that the user
 * wishes to view thier the wallet balance with
 * @param {String} currency
 */
export function selectWalletCurrency(currency) {
  return (dispatch) => {
    dispatch({ type: actionTypes.SELECT_WALLET_CURRENCY, payload: currency });
  };
}

/**
 * returns an action that contains the language that the user wishes to
 * use thier wallet in.
 *
 * @param {String} language
 */
export function selectWalletLanguage(language) {
  return (dispatch) => {
    dispatch({ type: actionTypes.SELECT_WALLET_LANGUAGE, payload: language });
  };
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
  return (dispatch) => {
    dispatch({ type: actionTypes.ADDING_CONTACT, payload: contact });
  };
}

export function saveDataForCoinSend(contact) {
  return (dispatch) => {
    dispatch({ type: actionTypes.CONTACT_ADDRESS_TO_COINSEND, payload: contact });
  };
}

/**
 * returns an action that contains an object which contains the name
 * of the new contact and all the coin address that belongs to it.
 *
 * @param {String} contactName
 * @param {Object} contactAddress
 */
export function completeContact(contactName, contactAddress, images) {
  const contact = {};
  contact.name = contactName;
  contact.contactAddress = contactAddress;
  contact.images = images;

  return (dispatch) => {
    dispatch({ type: actionTypes.COMPLETE_CONTACT, payload: contact });
  };
}

/**
 * Contains the inputs made in the addCOntact screen
 * @param {Object} completeInput
 */
export function saveAddContactInputs(contactName, contactAddress, images) {
  const contact = {};
  contact.name = contactName;
  contact.contactAddress = contactAddress;
  contact.images = images;

  return (dispatch) => {
    dispatch({ type: actionTypes.SAVING_ADDCONTACT_INPUTS, payload: contact });
  };
}

export function updateSavedContactInputs(newInfo) {
  return (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_SAVED_CONTACT_INPUTS, payload: newInfo });
  };
}

export function editContact(contactName, contactAddress) {
  const contact = {};
  contact.name = contactName;
  contact.contactAddress = contactAddress;

  return (dispatch) => {
    dispatch({ type: actionTypes.EDIT_CONTACT, payload: contactName });
  };
}

export function deleteContact(contactName, contactAddress) {

  return (dispatch) => {
    dispatch({ type: actionTypes.DELETE_CONTACT, payload: contactName });
  };
}

export function contactsActiveTab(tabName) {
  return (dispatch) => {
    dispatch({ type: actionTypes.ACTIVE_CONTACT_TAB, payload: tabName });
  };
}

/**
 * returns an action that contains the data reterived by using the QrScanner
 * component
 * @param {String} data
 */
export function getQRCodeData(data) {
  return (dispatch) => {
    dispatch({ type: actionTypes.QRSCANNER_DATA, payload: data });
  };
}

/**
 * Contains the name of the page from which the QrScanner was invoked from
 * @param {String} pageName
 */
export function qrScannerInvoker(pageName) {
  return (dispatch) => {
    dispatch({ type: actionTypes.QRSCANNER_PAGE_INVOKER, payload: pageName });
  };
}

/**
 * Contains the name of the coin from which the QrScanner was invoked from
 * @param {String} coinName
 */
export function qrScannerCoinInvoker(coinName) {
  return (dispatch) => {
    dispatch({ type: actionTypes.QRSCANNER_COIN_INVOKER, payload: coinName });
  };
}

export function addTokenInfo(tokenInfo) {
  return (dispatch) => {
    dispatch({ type: actionTypes.ADD_TOKEN_INFO, payload: tokenInfo });
  };
}

/**
 * Returns an action that contains the tokenID from the token data with its
 * updated balance (received through the provider)
 * @param {String} tokenID
 * @param {String} balance
 */
export function updateTokenBalance(tokenID, quantity, ethBalance, btcBalance, usdBalance, cadBalance, eurBalance) {
  return (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_TOKEN_BALANCE, payload: { 
      tokenID, 
      quantity,
      ethBalance,
      btcBalance,
      usdBalance,
      cadBalance,
      eurBalance
    } 
  });
 };
}

export function resetWalletBalance() {
  return (dispatch) => {
    dispatch({type: actionTypes.RESET_WALLET_BALANCE, payload: 0 });
  }
}

/**
 * Returns an action with the updated transaction fee
 * @param {String} fee
 */
export function updateTxnFee(fee) {
  return (dispatch) => {
    dispatch({ type: actionTypes.TXN_FEE, payload: fee });
  };
}

export function updateNewTokenAddress(address) {
  return (dispatch) => {
    dispatch({ type: actionTypes.ADD_NEW_TOKEN_ADDRESS, payload: address });
  };
}

export function updateNewTokenName(name) {
  return (dispatch) => {
    dispatch({ type: actionTypes.ADD_NEW_TOKEN_NAME, payload: name });
  };
}

export function completeNewToken() {
  return (dispatch) => {
    dispatch({ type: actionTypes.COMPLETE_NEW_TOKEN, payload: '' });
  };
}

export function clearStore() {
  return { type: actionTypes.CLEAR_STORE };
}

export function addTokenFromList(tokenname, tokenSym, tokenAdd) {
  const loads = { name: tokenname, symbol: tokenSym, add: tokenAdd };
  return (dispatch) => {
    dispatch({ type: actionTypes.ADD_TOKEN_FROM_LIST, payload: loads });
  };
}
