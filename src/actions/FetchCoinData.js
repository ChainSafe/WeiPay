import axios from 'axios';

import { apiBaseUrl, apiCurrencyResponseUrl } from '../constants/Api';

import {
  FETCHING_COIN_DATA,
  FETCHING_COIN_DATA_SUCCESS,
  FETCHING_COIN_DATA_FAIL,
  FETCHING_ETH_PRICE_DATA,
  FETCHING_ETH_PRICE_DATA_SUCCESS,
  FETCHING_ETH_PRICE_DATA_FAIL,
} from "./ActionTypes";



export function FetchCoinData(symbol) {
  return (dispatch) => {
    dispatch({ type: FETCHING_COIN_DATA });
    return axios.get(`${apiBaseUrl}${symbol}${apiCurrencyResponseUrl}`)
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
  console.log("We are in fetch eth price data");
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
