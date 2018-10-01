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
    case actions.CONFIG_HOT_WALLET:
      const { wallet, publicKey, name } = action.payload;
      return {
        ...state, hotWallet: { wallet, pubKey: publicKey, name },
      };
    default:
      return state;
  }
};