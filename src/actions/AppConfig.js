import {
  INITIALIZE_APP_TOKEN_SETUP,
  INITIALIZE_NEW_APP_WALLET,
  TEMP_WALLET_NAME,
  DEBUG_MODE,
} from "./ActionTypes";


export function enterDebug() {
  let testData = { 'walletName': 'My Test Wallet Name' };
  return (dispatch) => {
    dispatch({ type: DEBUG_MODE, payload: testData });
  };
}

/**
 * Initializes the app with the default token list
 */
export function initializeAppTokenState(initTokenData) {
  return (dispatch) => {
    dispatch({ type: INITIALIZE_APP_TOKEN_SETUP, payload: initTokenData });
  };
}

/**
 * Set temporary state wallet name until wallet is created/saved to async
 */
export function setTempWalletName(walletName) {
  return (dispatch) => {
    dispatch({ type: TEMP_WALLET_NAME, payload: walletName });
  };
}

/**
 * Initializes a wallet within the app
 */
export function initializeAppWallet(walletInfo, flag) {

  // let walletState = walletInfo;
  if(flag !== 'init') {
    //need to get state
  }

  return (dispatch) => {
    dispatch({ type: INITIALIZE_NEW_APP_WALLET, payload: walletInfo });
  };
}

