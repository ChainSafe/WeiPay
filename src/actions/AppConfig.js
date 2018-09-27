import {
  INITIALIZE_APP_TOKEN_SETUP,
} from "./ActionTypes";

/**
 * Initializes the app with the default token list
 */
export function initializeAppTokenState(initTokenData) {
  return (dispatch) => {
    dispatch({ type: INITIALIZE_APP_TOKEN_SETUP, payload: initTokenData });
  };
}

