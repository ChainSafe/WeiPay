import {
  SET_APP_PASSWORD,
  INITIALIZE_APP_TOKEN_SETUP,
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
  appPassword: null,
  wallets: [],
  tempWalletName: null,
  tokens: [],
  walletBalance: {},
  tokenBalances: {},
  walletTokens: [],
  isFetching: null,
  hasError: false,
  errorMessage: null,
  currencyOptions: ['USD', 'CAD', 'EUR', 'BTC', 'ETH'],
  apiTokenString: '',
  tokenConversions: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_APP_PASSWORD:
      return {
        ...state, appPassword: action.payload,
      };
    case INITIALIZE_APP_TOKEN_SETUP:
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
