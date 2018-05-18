import * as actions from '../Actions/actionTypes';

const INITIAL_STATE = { newWallet: false,
                        walletName: '',
                        tokens: []
                        };

export default (state = INITIAL_STATE, action) => {
  //console.log(action);
  switch (action.type) {
    case actions.CREATING_NEW_WALLET:
      return { ...state, newWallet: action.payload };
    case actions.NEW_WALLET_NAME:
      return { ...state, walletName: action.payload };

    case actions.ADD_TOKEN_SETUP:
      var current = state.tokens;
      current.push(action.payload);
      console.log(current);
      return { ...state, tokens: current };
    default:
      return state;
  }
};
