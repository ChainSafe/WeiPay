import axios from 'axios';

import { apiBaseUrl, apiCurrencyResponseUrl, apiMultipleCurrencyBaseUrl, apiMulitpleResponseUrl } from '../constants/Api';

import {
  FETCHING_COIN_DATA,
  FETCHING_COIN_DATA_SUCCESS,
  FETCHING_COIN_DATA_FAIL,
  FETCHING_ETH_PRICE_DATA,
  FETCHING_ETH_PRICE_DATA_SUCCESS,
  FETCHING_ETH_PRICE_DATA_FAIL,
  SET_WALLET_TOKENS_BALANCES,
} from "./ActionTypes";


/**
 * Pass in Array of symbol and amount of tokens
 * @param {} symbol 
 */
export function fetchCoinData(tokensString) {
  return (dispatch) => {
    dispatch({ type: FETCHING_COIN_DATA });
    return axios.get(`${apiMultipleCurrencyBaseUrl}${tokensString}${apiMulitpleResponseUrl}`)
      .then((res) => {
        dispatch({ type: FETCHING_COIN_DATA_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: FETCHING_COIN_DATA_FAIL, payload: err.data });
      });
  };
}

/**
 * Called when app initially Loads to save current prices in store for when needed.
 * The app initially defaults all newly created or recovered wallets to ETH upon setup completition.
 * Once the a wallet is recovered, the wallet balance can calculated instantly without any additional api requests.
 * This removes the intial API call when the main app screen loads/when the flatlist needs an initial refresh.
 */
export function FetchEthPriceData() {
  return (dispatch) => {
    dispatch({ type: FETCHING_ETH_PRICE_DATA });
    return axios.get(`${apiBaseUrl}ETH${apiCurrencyResponseUrl}`)
      .then((res) => {
        dispatch({ type: FETCHING_ETH_PRICE_DATA_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: FETCHING_ETH_PRICE_DATA_FAIL, payload: err.data });
      });
  };
}

export function setWalletTokenBalances(usersTokensWithBalances) {
  return (dispatch) => {
    dispatch({ type: SET_WALLET_TOKENS_BALANCES, payload: usersTokensWithBalances });
  };
}
