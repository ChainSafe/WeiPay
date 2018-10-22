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
} from '../../actions/ActionTypes';

const initialState = {
  isInSetupScreens: true,
  wallets: [],
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
};

export default function (state = initialState, action) {
  switch (action.type) {
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
      return { ...state, walletBalance: walletBalanceObject, tokenBalances: individualTokens };
    default:
      return state;
  }
}
