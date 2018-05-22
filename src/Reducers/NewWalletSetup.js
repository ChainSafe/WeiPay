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
      if (current.indexOf(action.payload) == -1){
        //add the selected coin to the token list
        current.push(action.payload);
      }else {
        //Delete the selected coin from the token list
        index = current.indexOf(action.payload);
        current.splice(index,1);
        console.log("Item removed");
      }

      return { ...state, tokens: current };
    default:
      return state;
  }
};
