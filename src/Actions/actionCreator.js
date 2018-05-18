import { incrementCounter, decrementCounter, addTokenSetup } from "./actionTypes";

const incrementAction = () => ({
  type: incrementCounter
});

function AddToken(paylaod) {
  return {
    type: addTokenSetup,
    paylaod
  }
}

export function addTokenToSetup(tokenName) {
  return dispatch => {
    dispatch({ type: addTokenSetup, payload: tokenName })
  }
}


// export function login() {
//   return dispatch => {
//     dispatch({ type: LOADING })
//     // api call
//     .then(res => { dispatch({ type: LOGIN, payload: user}) })
//     .catch(err => { dispatch({type: LOGIN_FAILED, payload: null}) })
//   }
// }