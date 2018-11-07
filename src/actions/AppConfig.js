import {
  EXIT_SETUP_SCREEN,
  INITIALIZE_APP_TOKEN_SETUP,
  INITIALIZE_NEW_APP_WALLET,
  TEMP_WALLET_NAME,
  DEBUG_MODE,
  SET_APP_PASSWORD,
  CONFIG_HOT_WALLET,
  ADD_NEW_SINGLE_TOKEN,
  SAVE_TOKEN_DATA_FOR_TRANSACTION,
  SET_UNENCRYPTED_WALLET,
  SET_APP_PASSWORD_ROOT,
  SAVE_TOKEN_QUANTITIES,
  SET_NETWORK,
  SET_GLOBAL_PUBLIC_ADDRESS,
} from './ActionTypes';

export function enterDebug() {
  const testData = { 'walletName': 'My Test Wallet Name' };
  return (dispatch) => {
    dispatch({ type: DEBUG_MODE, payload: testData });
  };
}

export function encryptSerializedWallet(hashedPassword) {
  return (dispatch) => {
    dispatch({ type: SET_APP_PASSWORD_ROOT, payload: hashedPassword });
  };
}

export function setNetwork(network) {
  return (dispatch) => {
    dispatch({ type: SET_NETWORK, payload: network });
  };
}

/**
 * This action is used to track if the user is in the setup screens.
 */
export function exitSetup(flag) {
  return (dispatch) => {
    dispatch({ type: EXIT_SETUP_SCREEN, payload: flag });
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
 * Adds a single token to the app state
 */
export function addNewToken(tokenObject, usersTokens) {
  let tokenCopy = [...usersTokens];
  tokenCopy.push(tokenObject);
  console.log(tokenCopy);
  return (dispatch) => {
    dispatch({ type: ADD_NEW_SINGLE_TOKEN, payload: tokenCopy });
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
 * Initializes a wallet within the app.
 * If previosWalletState.length = 0 means its the users first wallet in the app.
 */
export function initializeAppWallet(currentWallet, walletName, previousWalletState) {
  let appWallets = [];  
  if (previousWalletState.length > 0) { 
    for (let i = 0; i < previousWalletState.length; i++) {
      let previousWallet = {};
      previousWallet.name = previousWalletState[i].name;
      previousWallet.hdWallet = previousWalletState[i].hdWallet;
      previousWallet.publicKey = previousWalletState[i].hdWallet.address;
      appWallets.push(previousWallet);
    }
  }
  let walletObject = {};
  walletObject.name = walletName;
  walletObject.hdWallet = currentWallet;
  walletObject.publicKey = currentWallet.address;
  appWallets.push(walletObject);
  return (dispatch) => {
    dispatch({ type: INITIALIZE_NEW_APP_WALLET, payload: appWallets });
  };
}

/**
 * Set temporary state wallet name until wallet is created/saved to async
 */
export function setWalletPassword(password) {
  return (dispatch) => {
    dispatch({ type: SET_APP_PASSWORD, payload: password });
  };
}

export function setHotWallet(walletObj) {
  const { name, wallet } = walletObj;
  const pKey = wallet.address;
  return (dispatch) => {
    dispatch({ type: CONFIG_HOT_WALLET, payload: { 'wallet': wallet, 'publicKey': pKey,'name': name} });
  };
}

export function saveTokenDataForTransaction(tokenBalance, symbol, address) {
  return (dispatch) => {
    dispatch({
      type: SAVE_TOKEN_DATA_FOR_TRANSACTION,
      payload: {
        tokenBalance, symbol, address,
      },
    });
  };
}

export function setUnencryptedWallet(walletObj) {
  const { name, wallet } = walletObj;
  const pKey = wallet.address;
  return (dispatch) => {
    dispatch({ type: SET_UNENCRYPTED_WALLET, payload: { wallet, 'publicKey': pKey, name} });
  };
}

export function saveAllTokenQuantities(list) {
  return (dispatch) => {
    dispatch({ type: SAVE_TOKEN_QUANTITIES, payload: list });
  };
}

export function setGlobalAddress(address) {
  return (dispatch) => {
    dispatch({ type: SET_GLOBAL_PUBLIC_ADDRESS, payload: address });
  };
}


