import * as actions from '../../actions/ActionTypes';

const INITIAL_STATE = {
  hotWallet: null,
};

/**
 * Hot wallet reducer will have the current decrypted wallet
 * { Name pubKey wallet }
 */
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.QRSCANNER_PAGE_INVOKER:
      return { ...state, invoker: action.payload };

    case actions.QRSCANNER_COIN_INVOKER:
      return { ...state, coinInvoker: action.payload };
    default:
      return state;
  }
};