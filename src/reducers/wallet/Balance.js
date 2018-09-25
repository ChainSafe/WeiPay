import {
  FETCHING_COIN_DATA,
  FETCHING_COIN_DATA_SUCCESS,
  FETCHING_COIN_DATA_FAIL,
  FETCHING_ETH_PRICE_DATA,
  FETCHING_ETH_PRICE_DATA_SUCCESS,
  FETCHING_ETH_PRICE_DATA_FAIL,
  SET_WALLET_TOKENS_BALANCES,
} from '../../actions/ActionTypes';

/**
 * 0 index of price array represents the 1-1 ETH price -> the other currencies are relative to ETH
 * [  { 'USD' : [  Relative Eth Price, # of Eth, # of Altcoin ..etc ] }, .... ]
 */
const initialState = {
  isFetching: null,
  data: [],
  hasError: false,
  errorMessage: null,
  currentPriceStruct: [
    { 'USD': [0] },
    { 'CAD': [0] },
    { 'EUR': [0] },
    { 'ETH': [0] },
    { 'BTC': [0] },
  ],
  currencyVariation: 5,
  walletTokens: [],
  apiTokenString: ''
};

export default function(state = initialState, action) {
    
  switch(action.type) {
    case FETCHING_COIN_DATA: 
      return Object.assign({}, state, {
        isFetching: true,
        data: null,
        hasError: false,
        errorMessage: null
      });
    case FETCHING_COIN_DATA_SUCCESS: 
      return Object.assign({}, state, {
        isFetching: false,
        data: action.payload,
        hasError: false,
        errorMessage: null
      });
    case FETCHING_COIN_DATA_FAIL: 
      return Object.assign({}, state, {
        isFetching: false,
        data: action.payload,
        hasError: true,
        errorMessage: action.err
      });

    case FETCHING_ETH_PRICE_DATA: 
      return Object.assign({}, state, {
        isFetching: true,
        data: null,
        hasError: false,
        errorMessage: null
      });
    /**
    * This will load any app initially with the current API price matrix relative to ETH.
    * Call this at any time to refresh the balance of the wallet.
    */
    case FETCHING_ETH_PRICE_DATA_SUCCESS:             
      const oldPriceMatrix = state.currentPriceStruct;           
      for (let i = 0; i < state.currencyVariation; i++) {               
        const key = Object.keys(oldPriceMatrix[i]);                             
        oldPriceMatrix[i][key] = action.payload[key];                    
      }         
      return { ...state, currentPriceStruct: oldPriceMatrix };
    case FETCHING_ETH_PRICE_DATA_FAIL: 
      return Object.assign({}, state, {
        isFetching: false,
        data: action.payload,
        hasError: true,
        errorMessage: action.err
      });
    case SET_WALLET_TOKENS_BALANCES:  
       return { ...state, walletTokens: action.payload };
    default: 
      return state;
  }

}