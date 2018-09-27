import {
  INITIALIZE_APP_TOKEN_SETUP,
  FETCHING_COIN_DATA,
  FETCHING_COIN_DATA_SUCCESS,
  FETCHING_COIN_DATA_FAIL,
  FETCHING_ETH_PRICE_DATA,
  FETCHING_ETH_PRICE_DATA_SUCCESS,
  FETCHING_ETH_PRICE_DATA_FAIL,
  SET_WALLET_TOKENS_BALANCES,
  CALCULATE_WALLET_BALANCE,
} from '../../actions/ActionTypes';

/**
 * 0 index of price array represents the 1-1 ETH price -> the other currencies are relative to ETH
 * [  { 'USD' : [  Relative Eth Price, # of Eth, # of Altcoin ..etc ] }, .... ]
 */
const initialState = {
  isFetching: null,
  hasError: false,
  errorMessage: null,
  walletBalance: {},
  tokens: [],
  tokenBalances: {},
  currencyOptions: ['USD', 'CAD', 'EUR', 'BTC', 'ETH'],
  walletTokens: [], //holds [ {type: "ETH", amount: "0.95954711315492517"}, ... ]
  apiTokenString: '',  //holds ETH,TokenName,TokenName...ETC  -> for API call 
  tokenConversions: [], //  { ETH: {USD: 209.5, CAD: 285.32, ETH: 1, BTC: 0.03264, EUR: 178.06} SUB: {USD: 0.112, CAD: 0.1535, ETH: 0.000534, BTC: 0.00001743, EUR: 0.09506} }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_APP_TOKEN_SETUP:
      return {
        ...state, tokens: action.payload,
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
