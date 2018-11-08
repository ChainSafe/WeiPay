import tokenData from '../../constants/data/json/tokens.json';

import {
  EXIT_SETUP_SCREEN,
  INITIALIZE_APP_TOKEN_SETUP,
  ADD_NEW_SINGLE_TOKEN,
  TEMP_WALLET_NAME,
  INITIALIZE_NEW_APP_WALLET,
  FETCHING_COIN_DATA,
  FETCHING_COIN_DATA_SUCCESS,
  FETCHING_COIN_DATA_FAIL,
  FETCHING_ETH_PRICE_DATA,
  FETCHING_ETH_PRICE_DATA_SUCCESS,
  FETCHING_ETH_PRICE_DATA_FAIL,
  SET_WALLET_TOKENS_BALANCES,
  CALCULATE_WALLET_BALANCE,
  SAVE_TOKEN_DATA_FOR_TRANSACTION,
  SET_UNENCRYPTED_WALLET,
  SET_APP_PASSWORD_ROOT,
  SAVE_TOKEN_QUANTITIES,
  ADD_TOKEN_SETUP,
  SET_NETWORK,
  SET_GLOBAL_PUBLIC_ADDRESS,
} from '../../actions/ActionTypes';

const initialState = {
  network: 'ropsten',
  encryptedWallet: null,
  isInSetupScreens: true,
  wallets: [],
  walletUnencyrpted: null,
  tempWalletName: null,
  tokens: [],
  walletBalance: null,
  tokenBalances: {},
  walletTokens: [],
  isFetching: null,
  hasError: false,
  errorMessage: null,
  currencyOptions: ['USD', 'CAD', 'EUR', 'BTC', 'ETH'],
  apiTokenString: '',
  tokenConversions: [],
  allTokens: tokenData[0],
  activeTokenData: null,
  tokenQuantities: null,
  gloablPublicAddress: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_NETWORK:
      return {
        ...state, network: action.payload,
      };
    case SET_APP_PASSWORD_ROOT:
      return {
        ...state, encryptedWallet: action.payload,
      };
    case EXIT_SETUP_SCREEN:
      return {
        ...state, isInSetupScreens: action.payload,
      };
    case INITIALIZE_APP_TOKEN_SETUP:
      return {
        ...state,
        tokens: action.payload,
      };
    case ADD_NEW_SINGLE_TOKEN:
      return {
        ...state, tokens: action.payload,
      };
    case TEMP_WALLET_NAME:
      return {
        ...state, tempWalletName: action.payload,
      };
    case INITIALIZE_NEW_APP_WALLET:
      return {
        ...state, wallets: action.payload,
      };
    case FETCHING_COIN_DATA:
      return {
        ...state, isFetching: true, hasError: false, errorMessage: null,
      };
    case FETCHING_COIN_DATA_SUCCESS:
      return {
        ...state, isFetching: false, hasError: false, errorMessage: null, tokenConversions: action.payload,
      };
    case FETCHING_COIN_DATA_FAIL:
      return {
        ...state, isFetching: false, hasError: true, errorMessage: action.err,
      };
    case FETCHING_ETH_PRICE_DATA:
      return {
        ...state, isFetching: true, data: null, hasError: false, errorMessage: null,
      };
    case FETCHING_ETH_PRICE_DATA_SUCCESS:
      return {
        ...state, intialRelativeEthConversions: action.payload,
      };
    case FETCHING_ETH_PRICE_DATA_FAIL:
      return {
        ...state, isFetching: false, hasError: true, errorMessage: action.err,
      };
    case SET_WALLET_TOKENS_BALANCES:
      return { ...state, walletTokens: action.payload };
    case CALCULATE_WALLET_BALANCE:
      const { walletBalanceObject, individualTokens } = action.payload;
      return {
        ...state, walletBalance: walletBalanceObject, tokenBalances: individualTokens,
      };
    case SAVE_TOKEN_DATA_FOR_TRANSACTION:
      return {
        ...state, activeTokenData: action.payload,
      };
    case SET_UNENCRYPTED_WALLET:
      const { wallet, publicKey, name } = action.payload;
      return {
        ...state, walletUnencyrpted: { wallet, pubKey: publicKey, name },
      };
    case SAVE_TOKEN_QUANTITIES:
      return {
        ...state, tokenQuantities: action.payload,
      };
    case ADD_TOKEN_SETUP:
      return { ...state, tokens: action.payload };
    case SET_GLOBAL_PUBLIC_ADDRESS:
      return {
        ...state, gloablPublicAddress: action.payload,
      };
    default:
      return state;
  }
}
